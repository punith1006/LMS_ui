import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minus } from 'lucide-react';
import axios from 'axios';
import useUserData from '@/app/hooks/userData';
import Bot1 from '@/app/assets/stu logo circle.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatBotProps {
    courseData: any;
}

const ChatBot: React.FC<ChatBotProps> = ({ courseData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pendingMessageRef = useRef<string | null>(null);
    const { userData } = useUserData();

    const toggleChat = () => {
        if (!isOpen && !conversationId) {
            initChat();
        }
        setIsOpen(!isOpen);
    };

    const minimizeChat = () => setIsOpen(false);

    const endChat = () => {
        if (socket) {
            socket.close();
            setSocket(null);
        }
        setConversationId(null);
        pendingMessageRef.current = null;
        setMessages([]);
        setSuggestions([]);
        setIsOpen(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize Chat (Get UUID and Connect WS)
    const initChat = async () => {
        try {
            setIsLoading(true);
            const userId = userData?.userId || "user123";
            const botId = "GKT_LMS";

            // 1. Create Conversation
            const response = await axios.post(
                `https://project.globalknowledgetech.com:8054/conversations/createnull?user_uuid=${userId}&bot_id=${botId}`
            );

            if (response.data && response.data.conversation_uuid) {
                const uuid = response.data.conversation_uuid;
                setConversationId(uuid);
                connectWebSocket(uuid);
            }
        } catch (error) {
            console.error("Failed to init chat:", error);
            setMessages(prev => [...prev, { text: "Failed to connect to assistant.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Connect WebSocket
    const getCollectionName = () => {
        if (courseData?.courseId === 130) return "ibm_cloud_for_business";
        if (courseData?.courseId === 12) return "ai_driven_data_insights";
        return "ai_driven_data_insights";
    };

    // Connect WebSocket
    const connectWebSocket = (uuid: string) => {
        // Assuming Standard WS URL pattern based on HTTP base
        const wsUrl = `wss://project.globalknowledgetech.com:8054/generate/response/stream`; // Adjust if needed
        // Valid alternative guess: wss://project.globalknowledgetech.com:8000/ws/${uuid}
        // Since user didn't provide exact WS URL, I'll use the one derived from HTTP path conversations/{uuid}/ws

        const newSocket = new WebSocket(wsUrl);

        newSocket.onopen = () => {
            console.log("WS Connected");
            if (pendingMessageRef.current) {
                const text = pendingMessageRef.current;
                pendingMessageRef.current = null;

                const collectionName = getCollectionName();
                const payload = {
                    input: text,
                    user_id: userData?.userId || "user123",
                    language: "en",
                    bot_details: {
                        collection: collectionName,
                        system_prompt: "",
                        top_k: 5
                    },
                    convo_id: uuid,
                    temperature: 0.7,
                    max_tokens: 1024
                };
                newSocket.send(JSON.stringify(payload));
            } else {
                setMessages(prev => [...prev, { text: "Hi.. How can I Assist you", sender: 'bot' }]);
            }
        };

        newSocket.onmessage = (event) => {
            try {
                let content = "";
                try {
                    const data = JSON.parse(event.data);
                    content = data.output || (typeof data === 'string' ? data : JSON.stringify(data));
                } catch (e) {
                    content = event.data;
                }

                // Filter <EOT>
                if (content.includes("<EOT>")) {
                    content = content.replace("<EOT>", "");
                }

                // Check for Suggestions JSON
                const suggestionIndex = content.indexOf('{"suggestions":');
                if (suggestionIndex !== -1) {
                    const jsonPart = content.substring(suggestionIndex);
                    try {
                        const parsed = JSON.parse(jsonPart);
                        if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
                            setSuggestions(parsed.suggestions);
                        }
                    } catch (e) {
                        // ignore partial json
                    }
                    content = content.substring(0, suggestionIndex);
                }

                if (!content) return;

                setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg && lastMsg.sender === 'bot') {
                        // Append to last bot message
                        return [...prev.slice(0, -1), { ...lastMsg, text: lastMsg.text + content }];
                    } else {
                        // New bot message (first chunk)
                        return [...prev, { text: content, sender: 'bot' }];
                    }
                });

            } catch (e) {
                console.error("Msg Error", e);
            }
        };

        newSocket.onerror = (error) => {
            console.error("WS Error:", error);
            setMessages(prev => [...prev, { text: "Connection error.", sender: 'bot' }]);
        };

        newSocket.onclose = () => {
            console.log("WS Closed");
        };

        setSocket(newSocket);
    };

    const handleSendMessage = (textToSend?: string) => {
        const text = textToSend || inputText;
        if (!text.trim() || !socket || !conversationId) return;

        setMessages(prev => [...prev, { text: text, sender: 'user' }]);
        setInputText("");
        setSuggestions([]);

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            // If closed, try to reconnect (simple attempt) or just notify
            pendingMessageRef.current = text;
            if (conversationId) connectWebSocket(conversationId);
            return;
        }

        // Prepare Payload
        // "collection": "ai_driven_data_insights" -> derived from slug
        const collectionName = getCollectionName();

        const payload = {
            input: text,
            user_id: userData?.userId || "user123",
            language: "en",
            bot_details: {
                collection: collectionName,
                system_prompt: "",
                top_k: 5
            },
            convo_id: conversationId,
            temperature: 0.7,
            max_tokens: 1024
        };

        socket.send(JSON.stringify(payload));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 h-[600px] max-h-[80vh] bg-[#11183d] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
                    {/* Header */}
                    <div className="bg-[#1a2352] p-4 flex justify-between items-center border-b border-gray-700">
                        <div className="flex items-center gap-2 text-white">
                            <Bot className="h-6 w-6 text-[#EB900C]" />

                            <h3 className="font-semibold flex items-center gap-2">
                                <span>Introducing</span>
                                <img
                                    src="/stu-white.png"
                                    alt="online"
                                    className="h-4 w-auto"
                                />
                            </h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={minimizeChat} className="text-gray-400 hover:text-white transition-colors" title="Minimize">
                                <Minus className="h-5 w-5" />
                            </button>
                            <button onClick={endChat} className="text-gray-400 hover:text-white transition-colors" title="End Chat">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden bg-[#0A181F] flex flex-col gap-3">
                        {messages.length === 0 && !isLoading && (
                            <div className="text-gray-400 text-center text-sm mt-10">Start a conversation...</div>
                        )}
                        {isLoading && (
                            <div className="flex justify-center items-center h-full">
                                <div className="w-6 h-6 border-2 border-[#EB900C] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user'
                                    ? 'bg-[#EB900C] text-white self-end rounded-br-none'
                                    : 'bg-[#1a2352] text-gray-200 self-start rounded-bl-none'
                                    }`}
                            >
                                {msg.sender === 'bot' ? (
                                    <div className="prose prose-sm prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions Area */}
                    {suggestions.length > 0 && (
                        <div className="px-4 py-2 bg-[#1a2352] border-t border-gray-700 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSendMessage(suggestion)}
                                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#0A181F] border border-[#EB900C] text-[#EB900C] text-xs hover:bg-[#EB900C] hover:text-white transition-colors flex-shrink-0"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-[#1a2352] border-t border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={!socket ? "Initializing..." : "Type a message..."}
                            className="flex-1 bg-[#0A181F] text-white text-sm rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-[#EB900C] disabled:opacity-50"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            className="bg-[#EB900C] p-2 rounded-lg text-white hover:bg-[#d6830a] transition-colors disabled:opacity-50"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                onClick={toggleChat}
                className="group flex items-center justify-center w-14 h-14 bg-[#EB900C] rounded-full shadow-lg hover:bg-[#d6830a] transition-all duration-300 hover:scale-110"
            >
                {isOpen ? (
                    <X className="h-8 w-8 text-white" />
                ) : (

                    <img
                        src="/stu-white.png"
                        alt="online"
                        className="h-8 w-8 text-white"
                    />
                )}
            </button>
        </div>
    );
};

export default ChatBot;
