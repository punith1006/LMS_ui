"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

// Types
interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: string;
}

interface QuickAction {
    label: string;
    query: string;
}

interface LeadFormData {
    name: string;
    email: string;
    phone: string;
    education_level: string;
    interests: string[];
    goals: string;
}

const EDUCATION_LEVELS = [
    "High School",
    "Undergraduate",
    "Graduate",
    "Professional",
    "Other",
];

const BACKEND_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL || "http://localhost:8002";
const WS_URL = BACKEND_URL.replace("http", "ws");

export default function ConciergeBot() {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showInitialForm, setShowInitialForm] = useState(false); // Shows form directly on first open
    const [showFormPrompt, setShowFormPrompt] = useState(false); // Shows the "Share My Details" card (intent-triggered)
    const [showFormExpanded, setShowFormExpanded] = useState(false); // Shows the actual form fields
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formDismissedAt, setFormDismissedAt] = useState<number>(0); // Message count when form was dismissed
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [sessionId] = useState(() => crypto.randomUUID());
    const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
    const [streamingMessage, setStreamingMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState<string>("");
    const [isDarkMode, setIsDarkMode] = useState(false); // Light theme by default

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const streamingContentRef = useRef<string>("");

    // Form state
    const [formData, setFormData] = useState<LeadFormData>({
        name: "",
        email: "",
        phone: "",
        education_level: "",
        interests: [],
        goals: "",
    });

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingMessage]);

    // Initialize conversation when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            initializeConversation();
        }
        // Scroll to bottom when chat opens
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [isOpen]);

    // Fetch quick actions
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/concierge/quick-actions`)
            .then((res) => res.json())
            .then((data) => setQuickActions(data.actions || []))
            .catch(console.error);
    }, []);

    const initializeConversation = async () => {
        try {
            const res = await fetch(
                `${BACKEND_URL}/api/concierge/conversation/start?session_id=${sessionId}`,
                { method: "POST" }
            );
            const data = await res.json();
            setConversationId(data.conversation_id);
            setMessages([
                { role: "assistant", content: data.greeting, timestamp: new Date().toISOString() },
            ]);
            // Show form directly on first open (not two-step)
            if (data.show_form) {
                setShowInitialForm(true);
            }
        } catch (error) {
            console.error("Failed to initialize conversation:", error);
            setMessages([
                {
                    role: "assistant",
                    content:
                        "Hi there! 👋 I'm Stu, your AI learning guide. How can I help you today?",
                },
            ]);
            setShowInitialForm(true); // Show form even on error
        }
    };

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        try {
            const res = await fetch(`${BACKEND_URL}/api/concierge/lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, session_id: sessionId }),
            });
            const data = await res.json();

            if (data.success) {
                setLeadId(data.lead_id);
                setFormSubmitted(true);
                setShowInitialForm(false);
                setShowFormPrompt(false);
                setShowFormExpanded(false);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.message },
                ]);
            }
        } catch (error) {
            console.error("Failed to submit lead:", error);
        }
    };

    const skipForm = () => {
        // Record when form was dismissed (current message count)
        setFormDismissedAt(messages.length);
        setShowInitialForm(false);
        setShowFormPrompt(false);
        setShowFormExpanded(false);
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: "No problem! Feel free to ask me anything about our courses. What would you like to learn? 🎯",
            },
        ]);
    };

    const handleShareDetails = () => {
        setShowInitialForm(false);
        setShowFormPrompt(false);
        setShowFormExpanded(true);
    };

    const sendMessage = async (message: string) => {
        if (!message.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: message,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);
        setStreamingMessage("");
        streamingContentRef.current = "";
        setLoadingStatus("Thinking...");

        try {
            // Use WebSocket for streaming
            const ws = new WebSocket(`${WS_URL}/ws/concierge/chat`);
            wsRef.current = ws;

            ws.onopen = () => {
                setLoadingStatus("Searching courses...");
                ws.send(
                    JSON.stringify({
                        message,
                        session_id: sessionId,
                        conversation_id: conversationId,
                        lead_id: leadId,
                    })
                );
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                switch (data.type) {
                    case "conversation_id":
                        setConversationId(data.conversation_id);
                        break;
                    case "token":
                        if (loadingStatus !== "Generating...") {
                            setLoadingStatus("Generating...");
                        }
                        streamingContentRef.current += data.content;
                        setStreamingMessage(streamingContentRef.current);
                        break;
                    case "done":
                        // Use ref value to avoid stale closure
                        const finalContent = streamingContentRef.current;
                        if (finalContent) {
                            setMessages((prev) => [
                                ...prev,
                                { role: "assistant", content: finalContent },
                            ]);
                        }
                        setStreamingMessage("");
                        streamingContentRef.current = "";
                        setIsLoading(false);
                        setLoadingStatus("");
                        break;
                    case "show_form":
                        // Only show if: not submitted, not already showing, and enough messages since last dismiss
                        // Need at least 4 more messages (2 exchanges = 2 user + 2 assistant) since dismissal
                        const messagesSinceDismiss = messages.length - formDismissedAt;
                        if (!formSubmitted && !showFormPrompt && !showFormExpanded && !showInitialForm) {
                            if (formDismissedAt === 0 || messagesSinceDismiss >= 4) {
                                setShowFormPrompt(true);
                            }
                        }
                        break;
                    case "suggestions":
                        // Could update quick actions here
                        break;
                    case "error":
                        console.error("WebSocket error:", data.message);
                        setIsLoading(false);
                        setLoadingStatus("");
                        break;
                }
            };

            ws.onclose = () => {
                setIsLoading(false);
                // If there's still streaming content, add it as a message
                if (streamingContentRef.current) {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", content: streamingContentRef.current },
                    ]);
                    setStreamingMessage("");
                    streamingContentRef.current = "";
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                setIsLoading(false);
                // Fallback to REST API
                fallbackToRest(message);
            };
        } catch (error) {
            console.error("Failed to send message:", error);
            fallbackToRest(message);
        }
    };

    const fallbackToRest = async (message: string) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/concierge/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    session_id: sessionId,
                    conversation_id: conversationId,
                    lead_id: leadId,
                }),
            });
            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.response },
            ]);
            setConversationId(data.conversation_id);
            if (data.show_form && !leadId) {
                setShowFormPrompt(true);
            }
        } catch (error) {
            console.error("REST fallback failed:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I'm having trouble connecting. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: QuickAction) => {
        sendMessage(action.query);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                aria-label="Open chat"
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="relative">
                        <span className="text-3xl">🎓</span>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                    </div>
                )}
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className={`fixed bottom-24 right-6 z-50 w-[480px] h-[700px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg tracking-wide">Stu</h3>
                            <p className="text-black/80 text-sm font-semibold">Your AI Learning Guide ✨</p>
                        </div>
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors mr-2"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className={`flex-1 overflow-y-auto p-5 space-y-4 relative ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                        {/* Grid Pattern Background */}
                        <div className={`absolute inset-0 pointer-events-none z-0 ${isDarkMode
                            ? 'bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-30'
                            : 'bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] bg-[size:40px_40px] opacity-20'
                            }`} />
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-sm ${msg.role === "user"
                                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-br-sm shadow-lg"
                                        : isDarkMode
                                            ? "bg-slate-700/80 text-slate-100 rounded-bl-sm border border-slate-600/50"
                                            : "bg-white/80 text-gray-800 shadow-md rounded-bl-sm border border-gray-200/50"
                                        }`}
                                >
                                    <div className={`text-[15px] leading-relaxed font-medium prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-2 prose-li:my-0.5 ${isDarkMode ? 'prose-invert prose-strong:text-amber-400 prose-headings:text-amber-400' : 'prose-strong:text-amber-600 prose-headings:text-amber-600'}`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Streaming message */}
                        {streamingMessage && (
                            <div className="flex justify-start">
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 rounded-bl-sm backdrop-blur-sm ${isDarkMode ? 'bg-slate-700/80 text-slate-100 border border-slate-600/50' : 'bg-white/80 text-gray-800 shadow-md border border-gray-200/50'}`}>
                                    <div className={`text-[15px] leading-relaxed font-medium prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-2 prose-li:my-0.5 ${isDarkMode ? 'prose-invert prose-strong:text-amber-400' : 'prose-strong:text-amber-600'}`}>
                                        <ReactMarkdown>{streamingMessage}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading indicator with status */}
                        {isLoading && !streamingMessage && (
                            <div className="flex justify-start">
                                <div className={`rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm ${isDarkMode ? 'bg-slate-700/80 border border-slate-600/50' : 'bg-white/80 shadow-md border border-gray-200/50'}`}>
                                    <div className="flex gap-1">
                                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce"></span>
                                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                                    </div>
                                    <span className={`text-sm font-medium italic ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{loadingStatus || "Thinking..."}</span>
                                </div>
                            </div>
                        )}

                        {/* Initial Lead Form - Shown directly on first open */}
                        {showInitialForm && !formSubmitted && (
                            <div className={`rounded-xl p-5 border backdrop-blur-sm ${isDarkMode ? 'bg-slate-700/80 border-slate-600/50' : 'bg-white/90 border-gray-200/50 shadow-lg'}`}>
                                {/* Context message */}
                                <div className={`flex items-start gap-3 mb-4 pb-4 border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-100'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                                        <span className="text-xl">🎯</span>
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold text-[15px] mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                                            Let's Personalize Your Experience
                                        </h4>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                                            Share your details so I can provide tailored course recommendations based on your goals, send you relevant updates, and have our team reach out with exclusive offers.
                                        </p>
                                    </div>
                                </div>

                                {/* Form fields */}
                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        required
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        required
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number (Optional)"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <select
                                        name="education_level"
                                        value={formData.education_level}
                                        onChange={handleFormChange}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                                    >
                                        <option value="">Education Level (Optional)</option>
                                        {EDUCATION_LEVELS.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <textarea
                                        name="goals"
                                        placeholder="What do you want to learn? (Optional)"
                                        value={formData.goals}
                                        onChange={handleFormChange}
                                        rows={2}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <div className="flex gap-2 pt-1">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
                                        >
                                            Get Started
                                        </button>
                                        <button
                                            type="button"
                                            onClick={skipForm}
                                            className={`px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            Skip for now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Lead Form Prompt Card - Two-step approach (intent-triggered) */}
                        {showFormPrompt && !formSubmitted && !showInitialForm && (
                            <div className={`rounded-xl p-4 border backdrop-blur-sm ${isDarkMode ? 'bg-slate-700/60 border-slate-600/50' : 'bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-amber-200/50'}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                                        <span className="text-lg">✨</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold text-[15px] mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                                            Get Personalized Assistance
                                        </h4>
                                        <p className={`text-sm leading-relaxed mb-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                                            I can help you better with your learning journey if you share your contact details. This way, I can provide tailored course recommendations and keep you updated.
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleShareDetails}
                                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Share My Details
                                            </button>
                                            <button
                                                onClick={skipForm}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                Maybe Later
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lead Form Expanded - Step 2 */}
                        {showFormExpanded && !formSubmitted && (
                            <div className={`rounded-xl p-4 border animate-in slide-in-from-top-2 duration-300 backdrop-blur-sm ${isDarkMode ? 'bg-slate-700/80 border-slate-600/50' : 'bg-white/90 border-gray-200/50 shadow-md'}`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-amber-500">👤</span>
                                    <h4 className={`font-semibold text-[15px] ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Share Your Details</h4>
                                </div>
                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        required
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        required
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number (Optional)"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <select
                                        name="education_level"
                                        value={formData.education_level}
                                        onChange={handleFormChange}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                                    >
                                        <option value="">Education Level (Optional)</option>
                                        {EDUCATION_LEVELS.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <textarea
                                        name="goals"
                                        placeholder="What do you want to learn? (Optional)"
                                        value={formData.goals}
                                        onChange={handleFormChange}
                                        rows={2}
                                        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                                        >
                                            Continue
                                        </button>
                                        <button
                                            type="button"
                                            onClick={skipForm}
                                            className={`px-4 py-2.5 text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {!showInitialForm && !showFormPrompt && !showFormExpanded && quickActions.length > 0 && messages.length <= 2 && (
                        <div className={`px-4 py-3 border-t ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                            <p className={`text-xs mb-2 font-medium ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Quick actions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickActions.slice(0, 4).map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickAction(action)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${isDarkMode ? 'bg-slate-700 text-amber-400 border-slate-600 hover:bg-slate-600' : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50'}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                disabled={isLoading}
                                className={`flex-1 px-4 py-3 rounded-full text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 ${isDarkMode ? 'bg-slate-700 text-slate-100 placeholder-slate-400' : 'bg-gray-100 text-gray-800 placeholder-gray-400'}`}
                            />
                            <button
                                onClick={() => sendMessage(inputValue)}
                                disabled={!inputValue.trim() || isLoading}
                                className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
