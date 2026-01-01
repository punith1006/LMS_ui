"use client"
import React, { useState } from 'react';
import { ShoppingBag, Utensils, Heart, Brain, Users, TrendingUp, Sparkles, ChevronRight, Download } from 'lucide-react';
import Header from '../Component/Header/Header'
import { useRouter } from 'next/navigation';
import Footer from '../Component/Footer/Footer';

const Products = () => {
  const router=useRouter();
  const [hoveredId, setHoveredId] = useState(null);

  const productsData = [
     {
      "id": 1,
      "icon": TrendingUp,
      "gradient": "from-cyan-500 via-blue-500 to-indigo-500",
      "title": "AIA",
      "tagline": "AI Sales Automation",
      "description": "Let AI do the heavy lifting—you close the deals. Autonomous market research, personalized outreach, and intelligent reply handling.",
      "features": ["Lead Generation", "Auto Outreach", "Reply Management"],
      "tag": "Sales AI",
      "color": "cyan",
            "pdfUrl": "/pdfs/aia.pdf"

    },
      {
      "id": 2,
      "icon": Brain,
      "gradient": "from-blue-500 via-indigo-500 to-purple-500",
      "title": "Stu",
      "tagline": "Your Second Brain for Learning",
      "description": "AI-powered personal tutor that turns your documents into smart, conversational agents. Personalized learning paths with real-time knowledge.",
      "features": ["Document Tutors", "Smart Learning Paths", "Real-time Research"],
      "tag": "EdTech AI",
      "color": "blue",
            "pdfUrl": "/pdfs/STU.pdf"

    },
    {
      "id": 3,
      "icon": Utensils,
      "gradient": "from-orange-500 via-red-500 to-pink-500",
      "title": "Mr. Bill",
      "tagline": "Digital Billing & Menu Solution",
      "description": "Smart, seamless, and customer-friendly digital billing solution. QR menus, self-service kiosks, and instant payments—all in one.",
      "features": ["Digital QR Menus", "Payment Gateway", "Multi-Branch Management"],
      "tag": "Restaurant Tech",
      "color": "orange",
            "pdfUrl": "/pdfs/e-Billing.pdf"
    },
    {
      "id": 4,
      "icon": Heart,
      "gradient": "from-green-500 via-emerald-500 to-teal-500",
      "title": "PHC",
      "tagline": "Personalized Healthcare Companion",
      "description": "AI-powered personalized health, nutrition & fitness for all ages. EHR-based meal planning, image nutrition analysis, and adaptive workouts.",
      "features": ["AI Meal Planning", "Fitness Routines", "Nutrition Analysis"],
      "tag": "Healthcare AI",
      "color": "green",
            "pdfUrl": "/pdfs/phc.pdf"
    },
  
    {
      "id": 5,
      "icon": Users,
      "gradient": "from-pink-500 via-rose-500 to-red-500",
      "title": "Vivaah AI",
      "tagline": "Meaningful Matrimony Matches",
      "description": "AI-powered matrimony platform where connections matter. Conversation-based profiles, deep compatibility matching, and natural icebreakers.",
      "features": ["AI Matchmaking", "Conversation Profiles", "Smart Search"],
      "tag": "Social AI",
      "color": "pink",
            "pdfUrl": "/pdfs/vivaah-ai.pdf"

    },
   
  ];

  const handleProductClick = (id) => {
    console.log(`Navigating to product ${id}`);
    router.push(`/Products/${id}`);
  };
  //   const downloadpdf = (pdfUrl, title) => {
  //   // Open PDF in new tab
  //   window.open(pdfUrl, '_blank');
  // };

  const handleDownload = (pdfUrl, title, e) => {
    e.stopPropagation(); // Prevent card click
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTagColor = (color) => {
    const colors = {
      "orange": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "green": "bg-green-500/20 text-green-400 border-green-500/30",
      "blue": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "pink": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "cyan": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
    };
    return colors[color] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="text-center mb-16">
        
          <h1 className="text-5xl font-semibold mb-6 text-white leading-tight">
            Transform Your Business
            <br />
            <span className="text-4xl md:text-5xl">with <span className='text-purple-500 '>AI Innovation</span></span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Discover our suite of intelligent solutions designed to revolutionize industries—from healthcare to education, restaurants to sales.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {productsData.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.title)}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-600"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  minHeight: '420px'
                }}
              >
                {/* Animated Background Gradient */}
                {/* <div 
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                /> */}

                {/* Glow Effect */}
                {/* <div 
                  className={`absolute -inset-1 bg-gradient-to-r ${product.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                /> */}

                <div className="relative p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${product.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTagColor(product.color)}`}>
                      {product.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center space-x-2 text-gray-400 text-sm"
                          style={{
                            animation: hoveredId === product.id ? `slideIn 0.3s ease-out ${idx * 0.1}s both` : 'none'
                          }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className='flex gap-2'>

                  <button
                                        onClick={() => handleProductClick(product.pdfUrl, product.title)}
                  className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${product.gradient} text-white font-semibold flex items-center justify-center space-x-2 transform group-hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <span>Explore {product.title}</span>
                    <ChevronRight className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300`} />
                  </button>
 <button 
 onClick={e=>handleDownload(product.pdfUrl, product.title,e)}
            className="   z-50 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all group"
          >
            <Download className="w-5 h-5 text-gray-400 group-hover:text-white  transition-all" />
          </button>                  </div>
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {hoveredId === product.id && (
                    <>
                      <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping" />
                      <div className="absolute top-20 right-10 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>


      </div>
<Footer/>
      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Products;