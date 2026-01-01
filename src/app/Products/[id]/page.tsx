"use client";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  Target,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  MessageSquare,
  Heart,
  Sparkles,
  Smile,
  MessageCircle,
  LineChart,
  Layers,
  Brain,
  BookOpen,
  Utensils,
  Dumbbell,
  Activity,
  Globe,
  Camera,
  ShoppingCart,
  Video,
  CreditCard,
  Building2,
  Menu,
  QrCode,
  ArrowRight,
  Star,
  Eye,
  Shield,
  Briefcase,
  Database,
  XCircle,
  DockIcon,
  Download,
  ArrowLeft,
} from "lucide-react";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import { useRouter } from 'next/navigation';




export default function ProductPage() {
  const router=useRouter();
  const searchParams = useParams();
  let id = searchParams?.id;
  // console.log(id);

    const pdfFiles: Record<string, string> = {
    "AIA": "/pdfs/aia.pdf",
    "EBill": "/pdfs/e-Billing.pdf",
    "Stu": "/pdfs/STU.pdf",
    "Phc": "/pdfs/phc.pdf",
    "VivaahAI": "/pdfs/vivaah-ai.pdf",

  };

  const handleDownload = (pdfUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const  renderContent=(id: string | string[] | undefined) =>{
  switch (id) {
    case "AIA":
      return (
         <div className="min-h-screen bg-black text-white">
          <section className="relative h-auto flex items-center justify-center overflow-hidden">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-black to-cyan-600/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div> */}

            <div className="relative max-w-6xl mx-auto px-6 py-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-gray-300">
                  AI-Powered Sales Automation
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  AIA
                </span>
              </h1>

              <p className="text-3xl md:text-4xl font-light mb-6 text-gray-200">
                Let AI do the heavy lifting—
                <br />
                <span className="text-violet-400">you close the deals</span>
              </p>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-5">
                For small and medium businesses, the biggest hurdle isn't
                passion or product. It's finding the right customers—and
                actually reaching them.
              </p>
 <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                  onClick={()=>router.push('/ContactUs')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                   onClick={() =>
                handleDownload(pdfFiles["AIA"], "AIA.pdf")
              } className="px-6 py-3 bg-gray-800/50 border cursor-pointer border-gray-700 rounded-full font-semibold hover:bg-gray-800 hover:border-gray-600 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" /> 
                    Download
                  </button>
                </div>
            </div>
          </section>

          <section className="py-10 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Stop Paying for Leads That
                  <br />
                  <span className="text-red-400">Don't Lead Anywhere</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Growth stalls when you outsource the hard part: finding the
                  right customers and actually connecting with them.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: DollarSign,
                    title: "Money Burned",
                    desc: "Agencies are slow and expensive with long retainers that drain your budget.",
                    gradient: "from-red-500/20 to-red-600/20",
                    textColor: "text-red-400",
                  },
                  {
                    icon: Clock,
                    title: "Time Wasted",
                    desc: "CRMs fill up with names that never respond. Outreach sounds copy-paste and gets ignored.",
                    gradient: "from-orange-500/20 to-orange-600/20",
                    textColor: "text-orange-400",
                  },
                  {
                    icon: XCircle,
                    title: "Deals Missed",
                    desc: "Replies pile up with no owner, opportunities evaporate before you can act.",
                    gradient: "from-amber-500/20 to-amber-600/20",
                    textColor: "text-amber-400",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className={`w-7 h-7 ${item.textColor}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-8 bg-red-950/20 backdrop-blur-xl rounded-3xl border border-red-500/30 text-center">
                <p className="text-xl text-red-400 font-semibold">
                  Result: Growth stalls when you can't find and connect with the
                  right customers
                </p>
              </div>
            </div>
          </section>

          {/* The Switch Section */}
          <section className="py-5 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The Switch: Fast, Cheap,
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Human-feeling Outreach
                  </span>
                </h2>
                <p className="text-2xl text-gray-300">No Agencies Required</p>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                  What if a tiny, tireless sales teammate could research your
                  market, find qualified contacts, write real messages, run
                  outreach, and manage replies — all on your terms?
                </p>
              </div>

              <div className="text-center mb-5">
                <h3 className="text-3xl font-bold mb-4">
                  Meet{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    AIA
                  </span>{" "}
                  — your always-on AI growth sidekick
                </h3>
              </div>
            </div>
          </section>

          {/* What AIA Actually Does */}
          <section className="py-10 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                What AIA Actually Does
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Agentic Market Research",
                    desc: "Scouts your market and captures qualified leads (Apollo-sourced data).",
                    gradient: "from-violet-500 to-purple-600",
                  },
                  {
                    icon: Zap,
                    title: "Autonomous Outreach",
                    desc: "Personalized messages tailored to each lead's persona and your campaign tone.",
                    gradient: "from-fuchsia-500 to-pink-600",
                  },
                  {
                    icon: MessageSquare,
                    title: "Reply Handling & Ticketing",
                    desc: "AI manages Q&A, follow-ups, and support workflows, or escalates to humans.",
                    gradient: "from-cyan-500 to-blue-600",
                  },
                  {
                    icon: Users,
                    title: "Flexible Control",
                    desc: "Fully autonomous, human-in-the-loop, or hybrid — you choose how it works.",
                    gradient: "from-emerald-500 to-teal-600",
                  },
                  {
                    icon: TrendingUp,
                    title: "Clear Dashboard",
                    desc: "Simple metrics: engagement, replies, conversions, pipeline health.",
                    gradient: "from-orange-500 to-red-600",
                  },
                  {
                    icon: CheckCircle,
                    title: "All-in-One Solution",
                    desc: "Complete automation without agency overhead or complex integrations.",
                    gradient: "from-blue-500 to-indigo-600",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-8 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all`}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="py-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-black to-cyan-950/20"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                Why This Matters
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    title: "Save Time & Money",
                    desc: "Ditch expensive retainers and long agency lead times.",
                  },
                  {
                    title: "Turn Leads into Conversations",
                    desc: "Outreach that reads like a person wrote it, not a template.",
                  },
                  {
                    title: "Keep Deals Warm",
                    desc: "Fast replies and follow-ups mean fewer lost opportunities.",
                  },
                  {
                    title: "Scale Predictably",
                    desc: "Small teams get enterprise-grade reach without hiring a sales army.",
                  },
                  {
                    title: "Control & Transparency",
                    desc: "See what's working and change the script mid-campaign.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Flows */}
          <section className="py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-fuchsia-950/20 to-cyan-950/20"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                How It Flows
              </h2>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    num: "01",
                    title: "Find",
                    desc: "Agentic research finds leads",
                    color: "violet",
                  },
                  {
                    num: "02",
                    title: "Reach",
                    desc: "Personalized outreach starts the conversation",
                    color: "fuchsia",
                  },
                  {
                    num: "03",
                    title: "Converse",
                    desc: "AI handles replies or hands off",
                    color: "cyan",
                  },
                  {
                    num: "04",
                    title: "Convert",
                    desc: "You close the deal",
                    color: "emerald",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`p-8 h-full bg-gradient-to-br from-${step.color}-600/20 to-${step.color}-600/10 backdrop-blur-xl rounded-3xl border border-${step.color}-500/30 hover:border-${step.color}-400/60 transition-all duration-300`}
                    >
                      <div
                        className={`text-6xl font-bold text-${step.color}-400/20 mb-4`}
                      >
                        {step.num}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                    {idx < 3 && (
                      <div
                        className={`hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-${step.color}-500 to-transparent`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact & Benefits */}
          <section className="py-10 relative">
            <div className="relative max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                Impact & Benefits
              </h2>
              <p className="text-xl text-gray-400 text-center mb-10">
                What you'll actually gain
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Faster campaign launches",
                    desc: "Live in hours, not weeks.",
                    icon: Zap,
                  },
                  {
                    title: "Lower acquisition cost",
                    desc: "Replace agency retainers with predictable SaaS pricing.",
                    icon: DollarSign,
                  },
                  {
                    title: "Higher response rates",
                    desc: "Personalized outreach yields more meaningful replies.",
                    icon: TrendingUp,
                  },
                  {
                    title: "More closed meetings",
                    desc: "Focus human effort on warm, qualified conversations.",
                    icon: Users,
                  },
                  {
                    title: "Better pipeline health",
                    desc: "Cleaned, prioritized leads that move toward conversion.",
                    icon: LineChart,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Edge vs Agencies */}
          <section className="py-10 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

            <div className="relative max-w-6xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                The Edge vs Agencies and Old Tools
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-gradient-to-br from-red-950/40 to-red-900/20 rounded-3xl border border-red-900/50">
                  <Briefcase className="w-12 h-12 text-red-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-red-400">
                    Agencies
                  </h3>
                  <p className="text-lg text-gray-300 mb-4">
                    = cost + delay + generic playbooks
                  </p>
                  <p className="text-sm text-gray-500">
                    Slow, expensive, one-size-fits-all approach
                  </p>
                </div>

                <div className="p-8 bg-gradient-to-br from-orange-950/40 to-orange-900/20 rounded-3xl border border-orange-900/50">
                  <Database className="w-12 h-12 text-orange-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">
                    Traditional CRMs
                  </h3>
                  <p className="text-lg text-gray-300 mb-4">
                    = storage for cold leads
                  </p>
                  <p className="text-sm text-gray-500">
                    Data graveyard with no action
                  </p>
                </div>

                <div className="p-8 bg-gradient-to-br from-emerald-900/40 via-cyan-900/30 to-violet-900/40 rounded-3xl border border-emerald-500/50 shadow-xl shadow-emerald-500/20">
                  <Sparkles className="w-12 h-12 text-emerald-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">
                    AIA
                  </h3>
                  <p className="text-lg text-gray-300 mb-4">
                    = Real-time research + human-feeling outreach + conversation
                  </p>
                  <p className="text-sm text-emerald-300 font-semibold">
                    Fast, affordable, personalized at scale
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who Wins */}
          <section className="py-10 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]"></div>

            <div className="relative max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                Who Wins?
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "SMBs",
                    desc: "A professional sales engine without hiring big teams.",
                    icon: Target,
                  },
                  {
                    title: "Sales Leaders",
                    desc: "Fewer cold calls, more qualified meetings.",
                    icon: TrendingUp,
                  },
                  {
                    title: "Founders / Ops",
                    desc: "Predictable pipeline and controlled CAC.",
                    icon: LineChart,
                  },
                  {
                    title: "Investors",
                    desc: "A sticky SaaS play solving a universal SMB pain.",
                    icon: Shield,
                  },
                ].map((winner, idx) => (
                  <div
                    key={idx}
                    className="p-8 bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-3xl border border-violet-500/30 hover:border-violet-400/60 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-2xl flex items-center justify-center mb-6">
                      <winner.icon className="w-6 h-6 text-violet-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-violet-300">
                      {winner.title}
                    </h3>
                    <p className="text-gray-400">{winner.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-10 relative">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_70%)]"></div> */}

            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Beyond Leads.
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Towards Growth.
                </span>
              </h2>

              <p className="text-2xl text-violet-300 mb-8 font-semibold">
                Replace agency drama with Smart Automation!
              </p>

              <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
                Your next customer shouldn't be this hard to find.
              </p>

              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                With AIA, every lead gets the attention it deserves—and every
                business gets the chance to grow.
              </p>

              <button
                                onClick={()=>router.push('/ContactUs')}
              className="group px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 inline-flex items-center gap-3">
                Get Started with AIA
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <p className="mt-8 text-sm text-gray-500">
                No credit card required • Start growing today
              </p>
            </div>
          </section>
        </div>
      );

    case "Mr.%20Bill":
      return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
          {/* Animated Background */}
          {/* <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              }}
            ></div>
          </div> */}

          {/* Hero Section */}
          <div className="relative">
            <div className="max-w-7xl mx-auto px-6 pt-4 pb-16">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Restaurant Solution</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Mr. Bill
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  A smart, seamless, and customer-friendly digital billing &
                  menu solution for modern restaurants
                </p>

                <p className="text-base text-gray-500 max-w-2xl mx-auto">
                  In today's fast-paced dining world, customer convenience is
                  key. Mr. Bill brings together powerful features like digital
                  menus, self-service kiosks, and instant payments—all in one
                  simple, plug-and-play solution.
                </p>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                                    onClick={()=>router.push('/ContactUs')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                   onClick={() =>
                handleDownload(pdfFiles["EBill"], "Mr_Bill.pdf")
              } className="px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-full font-semibold hover:bg-gray-800 hover:border-gray-600 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" /> 
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Menu,
                    title: "Digital Menus",
                    desc: "Instantly accessible on tables via QR codes",
                    color: "from-blue-500/20 to-cyan-500/20",
                    border: "border-blue-500/30",
                  },
                  {
                    icon: Users,
                    title: "Self-Service Kiosks",
                    desc: "Reduce wait times, empower customers",
                    color: "from-purple-500/20 to-pink-500/20",
                    border: "border-purple-500/30",
                  },
                  {
                    icon: CreditCard,
                    title: "Integrated Payments",
                    desc: "Fast, secure, and hassle-free checkout",
                    color: "from-emerald-500/20 to-teal-500/20",
                    border: "border-emerald-500/30",
                  },
                  {
                    icon: Building2,
                    title: "Multi-Branch",
                    desc: "Stay in control, everywhere",
                    color: "from-orange-500/20 to-red-500/20",
                    border: "border-orange-500/30",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className={`relative group bg-gradient-to-br ${feature.color} backdrop-blur-xl p-6 rounded-2xl border ${feature.border} hover:scale-105 transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Icon className="w-8 h-8 text-white mb-3 relative z-10" />
                      <h3 className="text-lg font-bold mb-2 relative z-10">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400 relative z-10">
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Why Mr. Bill */}
          <section className="relative py-10 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mr. Bill?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Mr. Bill isn't just another POS system—it's a complete
                restaurant experience solution. Designed for simplicity,
                scalability, and speed, it helps you serve more customers,
                improve efficiency, and boost revenue.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="relative py-4">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Powerful Features
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Plug & Play Menu",
                    points: [
                      "Set up in minutes, no complex training required",
                      "Easily update dishes, prices, and offers",
                    ],
                    gradient: "from-yellow-500 to-orange-500",
                  },
                  {
                    icon: Users,
                    title: "Kiosk Enabled",
                    points: [
                      "Reduce queue times with customer self-ordering kiosks",
                      "Increase upselling opportunities through smart recommendations",
                    ],
                    gradient: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: QrCode,
                    title: "Table Menu via QR Code",
                    points: [
                      "Contactless ordering directly from the customer's phone",
                      "Safe, hygienic, and convenient",
                    ],
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: CreditCard,
                    title: "Payment Gateway Integration",
                    points: [
                      "Multiple payment modes supported",
                      "Seamless checkout for faster table turnover",
                    ],
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Building2,
                    title: "Multi-Branch Mode",
                    points: [
                      "Centralized menu and data management",
                      "Track sales and updates across all outlets in real time",
                    ],
                    gradient: "from-orange-500 to-red-500",
                  },
                  {
                    icon: Menu,
                    title: "Smart Menu Synchronization",
                    points: [
                      "Update your main menu once, and see changes reflected instantly across kiosks and digital menus",
                    ],
                    gradient: "from-cyan-500 to-blue-500",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div
                        className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 relative z-10`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 relative z-10">
                        {feature.title}
                      </h3>
                      <ul className="space-y-2 relative z-10">
                        {feature.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="relative py-10 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Benefits for Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Business
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Clock,
                    title: "Faster table turnover & reduced wait times",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: CheckCircle,
                    title: "Hassle-free management for staff and kitchen",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: TrendingUp,
                    title: "Increased sales through better customer engagement",
                    gradient: "from-emerald-500 to-teal-500",
                  },
                  {
                    icon: Building2,
                    title:
                      "Scalable solution for single outlets and chains alike",
                    gradient: "from-orange-500 to-red-500",
                  },
                ].map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all group"
                    >
                      <div
                        className={`p-3 bg-gradient-to-br ${benefit.gradient} rounded-xl group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-base text-gray-300">{benefit.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative py-4">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl p-12 rounded-3xl border border-gray-700/50">
                <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Restaurant?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  With Mr. Bill, your restaurant isn't just serving food—it's
                  serving convenience, innovation, and delight.
                </p>
                <button
                                  onClick={()=>router.push('/ContactUs')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 mx-auto">
                  Get Started Today <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      );

    case "PHC":
      return (
         <div className="min-h-screen bg-black text-white">
          {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div> */}

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-start py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span className="text-sm text-rose-300">
                      AI-Powered Healthcare
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Personalized
                    </span>
                    <br />
                    <span className="text-white">Healthcare</span>
                    <br />
                    <span className="text-slate-400">Companion</span>
                  </h1>

                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    AI-powered health, nutrition & fitness solutions tailored
                    for all ages. Transform your wellbeing with data-driven
                    insights.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                                      onClick={()=>router.push('/ContactUs')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium overflow-hidden">
                      <span className="relative z-10">Start Your Journey</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button
                       onClick={() =>
                handleDownload(pdfFiles["Phc"], "phc.pdf")
              } 
                    className="px-8 py-4 border border-slate-700 rounded-full font-medium hover:bg-slate-900 transition-all">
                      Download
                    </button>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                  <div className="relative grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700">
                      <Heart className="w-8 h-8 text-rose-500 mb-3" />
                      <h3 className="font-semibold mb-2">Health Data</h3>
                      <p className="text-sm text-slate-400">EHR Integration</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 mt-8">
                      <Utensils className="w-8 h-8 text-emerald-500 mb-3" />
                      <h3 className="font-semibold mb-2">Smart Meals</h3>
                      <p className="text-sm text-slate-400">AI Planning</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700">
                      <Dumbbell className="w-8 h-8 text-blue-500 mb-3" />
                      <h3 className="font-semibold mb-2">Fitness Plans</h3>
                      <p className="text-sm text-slate-400">
                        Adaptive Workouts
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 mt-8">
                      <Brain className="w-8 h-8 text-purple-500 mb-3" />
                      <h3 className="font-semibold mb-2">AI Insights</h3>
                      <p className="text-sm text-slate-400">
                        Real-time Updates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meal Planning Section */}
          <section className="relative py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">
                    Nutrition Planning
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  AI-Driven Meal Planning
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Dynamic meal plans based on your unique health data, medical
                  history, and lifestyle
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Individual & Group Plans
                    </h3>
                    <p className="text-slate-400">
                      Generate personalized meals for individuals or coordinated
                      plans for families, schools, workplaces, or care
                      facilities.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-rose-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Activity className="w-7 h-7 text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      EHR-Based Personalization
                    </h3>
                    <p className="text-slate-400">
                      Analyzes medical history, allergies, chronic conditions,
                      medications, and lab results for safe recommendations.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Smart Adjustments
                    </h3>
                    <p className="text-slate-400">
                      Automatically updates meal plans based on real-time
                      changes in health data, lab results, or individual
                      progress.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Dietary Options</h3>
                    <p className="text-slate-400">
                      Supports vegetarian, non-vegetarian, vegan, or mixed diets
                      catering to health needs and cultural preferences.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Globe className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Cultural Adaptation
                    </h3>
                    <p className="text-slate-400">
                      Considers local cuisine, food preferences, and seasonal
                      availability for enjoyable and practical meals.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Flexible Duration
                    </h3>
                    <p className="text-slate-400">
                      Create plans for any timeframe – daily, weekly, or monthly
                      schedules tailored to your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Know Your Food Section */}
          <section className="relative py-14 bg-gradient-to-b from-black to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                  <Camera className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">
                    Image Recognition
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Know Your Food
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Instant nutrition analysis powered by advanced AI image
                  recognition
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-slate-700">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <Camera className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Food Recognition
                    </h3>
                    <p className="text-slate-300 mb-6">
                      Upload a picture of a meal or ingredient, and AI
                      identifies it accurately with instant calorie count,
                      macronutrients, fiber, vitamins, and minerals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">
                        Instant Analysis
                      </span>
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">
                        Nutrient Breakdown
                      </span>
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">
                        Calorie Tracking
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-slate-700">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <ShoppingCart className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Smart Grocery Lists
                    </h3>
                    <p className="text-slate-300 mb-6">
                      AI generates grocery lists based on planned meals or
                      scanned items, including quantities, diet-specific
                      adjustments, and portion recommendations aligned with your
                      health goals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-300">
                        Auto-Generated
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-300">
                        Diet-Specific
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-300">
                        Portion Control
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fitness Section */}
          <section className="relative py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                  <Dumbbell className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">
                    Fitness & Exercise
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  AI-Powered Fitness Planning
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Personalized exercise routines integrated with your health
                  data for safe and effective workouts
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-rose-500/50 transition-all">
                  <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-7 h-7 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    EHR-Integrated Workouts
                  </h3>
                  <p className="text-slate-400">
                    Tailored routines for children, adults, and seniors based on
                    health conditions and rehabilitation needs.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Video className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Video Guidance</h3>
                  <p className="text-slate-400">
                    Each exercise includes demonstrations via YouTube or
                    integrated videos for correct and safe execution.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-all">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Globe className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Language Options</h3>
                  <p className="text-slate-400">
                    Fitness guidance and videos available in Tamil and English
                    for better accessibility.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-all">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Adaptive Intensity</h3>
                  <p className="text-slate-400">
                    AI dynamically adjusts duration, repetitions, and difficulty
                    based on age, performance, and progress.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
                  <p className="text-slate-400">
                    Monitors performance over time and provides personalized
                    feedback for continuous improvement.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-all">
                  <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Dumbbell className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Comprehensive Coverage
                  </h3>
                  <p className="text-slate-400">
                    Includes stretching, balance training, yoga, walking, and
                    light strength exercises for all ages.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative py-6 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-2xl font-bold mb-4">
                  Benefits for Everyone
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Tailored solutions for individuals, families, caregivers, and
                  healthcare providers
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 h-full">
  {[
    {
      color: "blue",
      Icon: Users,
      title: "Individuals & Families",
      items: [
        "Personalized meals, fitness plans, and grocery lists based on EHR and lifestyle data",
        "Age-appropriate, culturally relevant, safe, and nutritious meals",
        "Exercise routines with video support in preferred language",
      ],
    },
    {
      color: "purple",
      Icon: Heart,
      title: "Caregivers & Educators",
      items: [
        "Simplified meal planning, preparation, fitness guidance, and grocery management",
        "Manage groups efficiently with AI-driven recommendations",
        "Tailored solutions for different age groups and health conditions",
      ],
    },
    {
      color: "emerald",
      Icon: Activity,
      title: "Healthcare Providers",
      items: [
        "Data-driven insights on nutrition, exercise, and emotional well-being",
        "Track adherence, predict health risks, and optimize outcomes",
        "Comprehensive monitoring for patients of any age",
      ],
    },
  ].map(({ color, Icon, title, items }, idx) => (
    <div key={idx} className="relative group flex flex-col h-full">
      {/* <div className={`absolute inset-0 bg-gradient-to-br from-${color}-600/10 to-${color}-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all`}></div> */}

      <div className="relative flex flex-col flex-1 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700">
        <div
          className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center mb-6`}
        >
          <Icon className={`w-7 h-7 text-${color}-400`} />
        </div>
        <h3 className={`text-2xl font-bold mb-6 text-${color}-400`}>
          {title}
        </h3>
        <div className="space-y-4 flex-1">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div
                className={`w-1.5 h-1.5 bg-${color}-400 rounded-full mt-2 flex-shrink-0`}
              ></div>
              <p className="text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>

            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-16">
            {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-purple-600/10 to-transparent"></div> */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">
                  Transform Your Health Today
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Health Journey?
                </span>
              </h2>

              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
                Generate personalized meals, track nutrition, create AI-driven
                grocery lists, and follow adaptive fitness plans with video
                guidance in your preferred language.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button 
                                  onClick={()=>router.push('/ContactUs')}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Now
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button className="px-10 py-5 border-2 border-slate-700 rounded-full font-semibold text-lg hover:bg-slate-900 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </section>
        </div>
      );

    case "Vivaah%20AI":

      return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* <div className="fixed inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" /> */}

          <div className="relative z-10">
            <section className="px-6 py-4 max-w-7xl mx-auto">
              <div className="text-center space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-500/30 backdrop-blur-xl">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium text-pink-200">
                    AI-Powered Matchmaking
                  </span>
                </div>

                <h1 className="text-7xl md:text-8xl font-black tracking-tighter">
                  <span className="block bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                    Vivaah AI
                  </span>
                </h1>

                <p className="text-3xl md:text-4xl font-light text-gray-300 max-w-4xl mx-auto leading-tight">
                  Finding Love Shouldn't Feel Like{" "}
                  <span className="text-pink-400 font-semibold">
                    Job Hunting
                  </span>
                </p>

                <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Most matrimony apps today feel like filling endless forms and
                  scrolling through generic profiles. But relationships aren't
                  about checkboxes — they're about stories, emotions, and
                  connections.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                                    onClick={()=>router.push('/ContactUs')}
                  className="group relative px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                   onClick={() =>
                handleDownload(pdfFiles["VivaahAI"], "VivaahAI.pdf")
              }
                  className="px-10 py-5 bg-white/5 flex items-center justify-center gap-2 backdrop-blur-xl border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                   <Download className="w-6 h-6"/> Download
                  </button>
                </div>
              </div>
            </section>

            <section className="px-6 py-4 max-w-7xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
                      <Users className="w-8 h-8 text-pink-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">
                      The Problem with Today's Matrimony Platforms
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group/card p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-red-400" />
                      </div>
                      <p className="text-lg text-gray-300">
                        Rigid filters reduce people to numbers.
                      </p>
                    </div>
                    <div className="group/card p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-orange-400" />
                      </div>
                      <p className="text-lg text-gray-300">
                        Boring forms can't capture personality or values.
                      </p>
                    </div>
                    <div className="group/card p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-4">
                        <MessageCircle className="w-6 h-6 text-purple-400" />
                      </div>
                      <p className="text-lg text-gray-300">
                        Awkward first chats often go nowhere.
                      </p>
                    </div>
                    <div className="group/card p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center mb-4">
                        <Star className="w-6 h-6 text-pink-400" />
                      </div>
                      <p className="text-lg text-gray-300">
                        Matches feel shallow, leaving users frustrated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Solution Section */}
            <section className="px-6 py-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
                    <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Our Answer
                  </h2>
                </div>
                <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                  An AI-Powered Matrimony Experience
                </p>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
                  We reimagined how people meet — not with more filters, but
                  with conversations, emotions, and real connection.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl border border-purple-500/30">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      Beyond Matches. Towards Meaning.
                    </h2>
                  </div>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    We're not building just another matrimony app. We're
                    building a platform where people don't just meet — they
                    truly connect.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-4 max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
                  <Smile className="w-8 h-8 text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold">What Makes Us Different</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 h-full">
                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-3xl p-10 hover:border-pink-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-7 h-7 text-pink-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-pink-300 mb-3">
                          Profiles Built Through Conversations
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          We go beyond basics like age and job. Our AI learns
                          from interests, values, and conversation style for
                          deeper, meaningful matches.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Heart className="w-7 h-7 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-purple-300 mb-3">
                          Matches That Truly Understand You
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          Our system focuses on compatibility — emotional,
                          behavioral, and lifestyle-driven — not just filters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-3xl p-10 hover:border-fuchsia-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-7 h-7 text-fuchsia-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-fuchsia-300 mb-3">
                          Conversation Made Easy
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          Our AI suggests icebreakers, compatibility cues, and
                          gentle nudges so conversations flow naturally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-orange-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-3xl p-10 hover:border-rose-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-rose-500/30 to-orange-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-7 h-7 text-rose-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-rose-300 mb-3">
                          Search Like You Speak
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          No dropdowns, no restrictions. Just type: "Looking for
                          someone who values family, loves travel, and enjoys
                          music" — our system finds real fits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-6 py-4 max-w-7xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                      <MessageCircle className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Why It Works</h2>
                  </div>

                  <p className="text-xl text-gray-300 mb-10">
                    Be part of the change that turns matches into meaningful
                    connections.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-2xl hover:border-pink-500/50 transition-all duration-300">
                      <div className="text-2xl font-bold text-pink-400 mb-4">
                        For Users
                      </div>
                      <p className="text-gray-300">
                        Less guesswork, more genuine connections.
                      </p>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                      <div className="text-2xl font-bold text-purple-400 mb-4">
                        For Partners
                      </div>
                      <p className="text-gray-300">
                        A product that stands out in a crowded market.
                      </p>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-fuchsia-500/10 to-transparent border border-fuchsia-500/30 rounded-2xl hover:border-fuchsia-500/50 transition-all duration-300">
                      <div className="text-2xl font-bold text-fuchsia-400 mb-4">
                        For Investors
                      </div>
                      <p className="text-gray-300">
                        A differentiated, scalable platform in a massive
                        industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-4 max-w-5xl mx-auto">
              <div className="relative group">
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" /> */}
                <div className="relative  border border-white/20 rounded-3xl p-16 text-center backdrop-blur-xl">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Ready to Transform Matchmaking?
                  </h2>
                  <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Join us in creating meaningful connections that go beyond
                    the surface.
                  </p>
                  <button
                  onClick={()=>router.push('/ContactUs')}
                  className="group/btn relative px-12 py-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
                    <span className="relative z-10 flex items-center gap-3">
                      Start Your Journey
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      );

    case "Stu":
      return (
        <main className="min-h-screen bg-black text-gray-100 font-sans overflow-hidden">
           
          <section className="relative px-4 sm:px-8 py-4 sm:py-20">
             {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent pointer-events-none"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)] pointer-events-none"></div> */}

            <div className="relative max-w-6xl mx-auto text-center z-10">
              <div className="inline-block mb-4 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <span className="text-sm text-indigo-300">
                  Powered by Advanced AI
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 tracking-tight leading-tight">
                STU
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-3 font-light">
                Your Second Brain for Learning
              </p>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                The personalized AI tutor that adapts, persists, and scales —
                from classroom to lab to lifelong learning
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4 z-10">
                  <button
                                    onClick={()=>router.push('/ContactUs')}

                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                   onClick={() =>
                handleDownload(pdfFiles["Stu"], "Stu.pdf")
              } className="px-6 py-3 bg-gray-800/50 border cursor-pointer border-gray-700 rounded-full font-semibold hover:bg-gray-800 hover:border-gray-600 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" /> 
                    Download
                  </button>
                </div>
          </section>

          <section className="px-4 sm:px-8 py-10 sm:py-6 bg-gradient-to-b from-gray-900/50 to-black">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <BookOpen className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    The Problem
                  </h2>
                  <p className="text-xl text-gray-400">
                    Learning Tools That Don't Learn You
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Students, researchers, and institutions juggle PDFs, notes,
                    and bookmarks — yet learning stays fragmented
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Tutors and platforms fail to adapt to how individuals
                    actually learn
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Researchers waste time reorganizing instead of discovering
                    insights
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🏫</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Institutes struggle to personalize support at scale
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-8 py-10 sm:py-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent"></div>

            <div className="max-w-6xl mx-auto relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-indigo-400" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    The Switch
                  </h2>
                </div>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  What if every student, researcher, and professor had a second
                  brain — a personalized tutor that organizes your documents,
                  learns your habits, and answers questions in real time?
                </p>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-8 py-11 sm:py-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <Layers className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl sm:text-2xl font-bold text-white">
                  What Stu Actually Does
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-950/30 border border-indigo-700/30 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                  <Sparkles className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Document-First Tutor Agents
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Upload notes, papers, slides, and datasets — Stu builds a
                    conversational agent around your material
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-700/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group">
                  <Target className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Personalized Learning Paths
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Adapts to how each user learns and suggests next steps
                    intelligently
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-pink-950/30 border border-pink-700/30 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 group">
                  <Zap className="w-8 h-8 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Real-Time Internet Access
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Combines your resources with live web knowledge for deeper
                    context
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-700/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <Brain className="w-8 h-8 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        Conversational Study
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Ask your agent questions, practice problems, and receive
                        personalized explanations tailored to your learning
                        level
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-700/30 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group">
                  <div className="w-8 h-8 text-green-400 mb-4 text-2xl group-hover:scale-110 transition-transform">
                    🧠
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Persistent Second Brain
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Remembers context over time, so your learning compounds
                    session by session
                  </p>
                </div>

                <div className="sm:col-span-3 bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-700/30 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 group">
                  <div className="w-8 h-8 text-amber-400 mb-4 text-2xl group-hover:scale-110 transition-transform">
                    ⚡
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Open & Customizable
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Built on open-source tech so institutions retain control and
                    can extend features to match their unique needs
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-8 py-5 sm:py-5 bg-gradient-to-b from-gray-900/30 to-black">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <LineChart className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl sm:text-2xl font-bold text-white">
                  Impact & Benefits
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-950/40 to-transparent border-l-4 border-green-500 p-5 rounded-r-xl">
                  <p className="text-gray-200">
                    Faster mastery through adaptive learning and personalized
                    pacing
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-950/40 to-transparent border-l-4 border-blue-500 p-5 rounded-r-xl">
                  <p className="text-gray-200">
                    Higher research productivity by turning literature into
                    queryable knowledge
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-950/40 to-transparent border-l-4 border-purple-500 p-5 rounded-r-xl">
                  <p className="text-gray-200">
                    Lower support costs via automated tutor assistance
                  </p>
                </div>
                <div className="bg-gradient-to-r from-pink-950/40 to-transparent border-l-4 border-pink-500 p-5 rounded-r-xl">
                  <p className="text-gray-200">
                    Improved student success and measurable outcomes
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-950/40 to-transparent border-l-4 border-indigo-500 p-5 rounded-r-xl">
                  <p className="text-gray-200">
                    High platform stickiness — agents trained on personal
                    content create deep retention
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-8 py-10 sm:py-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <Users className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl sm:text-2xl font-bold text-white">
                  Who Wins?
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative bg-gradient-to-br from-cyan-950/20 to-transparent border border-cyan-700/30 rounded-2xl p-6 overflow-hidden group hover:border-cyan-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">🎓</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Students
                    </h3>
                    <p className="text-gray-400">
                      Learn faster, study smarter, and get support that fits
                      your pace
                    </p>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-700/30 rounded-2xl p-6 overflow-hidden group hover:border-blue-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">🔬</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Researchers
                    </h3>
                    <p className="text-gray-400">
                      Compress literature review time and discover insights
                      faster
                    </p>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-purple-950/20 to-transparent border border-purple-700/30 rounded-2xl p-6 overflow-hidden group hover:border-purple-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">🏫</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Institutes & EdTech
                    </h3>
                    <p className="text-gray-400">
                      Deliver scalable, personalized tutoring without scaling
                      headcount
                    </p>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-pink-950/20 to-transparent border border-pink-700/30 rounded-2xl p-6 overflow-hidden group hover:border-pink-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">💼</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      VCs & Investors
                    </h3>
                    <p className="text-gray-400">
                      Back a defensible product with long-term retention and
                      academic expansion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-8 py-10 sm:py-1-">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 blur-xl"></div>
                <div className="relative bg-black rounded-3xl p-8 sm:p-12 text-center">
                  <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full mb-4">
                    <span className="text-sm text-white font-medium">
                      Limited Spots Available
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    Book a Campus Pilot
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    See measurable engagement in 30 days — and redefine how your
                    students learn
                  </p>
                  <button
                                    onClick={()=>router.push('/ContactUs')}

                  className="bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 transform">
                    Get Started →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      );

    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-xl">Product Not Found</p>
        </div>
      );
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <Header />
        <button 
            onClick={() => router.back()}
            className="fixed flex gap-2 items-center top-24 left-2 z-50 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            <span>Back</span>
          </button>
      <div className="relative">{renderContent(id)}</div>
      <Footer />
    </div>
  );
}
