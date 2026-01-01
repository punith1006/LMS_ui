
'use client';

import { useEffect, useState } from 'react';

export default function Spotlight() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white flex items-center justify-center p-4 overflow-hidden h-[600px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_2px,transparent_3px),linear-gradient(to_bottom,#ccc_1px,transparent_3px)] bg-[size:50px_40px] opacity-10 pointer-events-none z-0" />

      <div className="relative w-full max-w-7xl mx-auto h-full flex flex-col justify-center">
        {/* Left Vertical Image (Robot High Five) - Restored to Left */}
        <div
          className={`absolute left-0 lg:left-0 top-1/2 transform -translate-y-1/2 w-40 h-56 md:w-52 md:h-80 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out z-10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src="/spotlight/spotlightimg4.png"
            alt="Person with robot"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Top Right Image (Man at Screen) - Restored to Top Right */}
        <div
          className={`absolute right-4 md:right-[5%] top-0 md:top-[12%] w-40 h-28 md:w-56 md:h-36 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out delay-200 z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          <img
            src="/spotlight/spotlightimg2.png"
            alt="Person at computer"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Bottom Left Image (Group) - Restored to Bottom Left */}
        <div
          className={`absolute left-10 md:left-[20%] bottom-0 md:bottom-[12%] w-40 h-28 md:w-56 md:h-36 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out delay-500 z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <img
            src="/spotlight/spotlightimg1.png"
            alt="Team collaboration"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Bottom Right Image (Robot & Boy) - Restored to Bottom Right */}
        <div
          className={`absolute right-0 md:right-[5%] bottom-10 md:bottom-[18%] w-48 h-32 md:w-72 md:h-48 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out delay-700 z-10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <img
            src="/spotlight/spotlightimg3.png"
            alt="Robot assistant"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl lg:max-w-3xl mx-auto mt-[-50px]">
          {/* Animated Curved Line Decoration */}
          <div
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] lg:w-full max-w-4xl pointer-events-none transition-all duration-1000 ${isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-75'
              }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <svg
              suppressHydrationWarning
              viewBox="0 0 800 350"
              className="w-full h-auto animate-draw"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              {/* Curved line path */}
              <path
                d="M 120 180 Q 200 90, 400 140 T 680 180"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="animate-dash"
              />
              {/* Ellipse/Circle around "Learning designed" */}
              <ellipse
                cx="200"
                cy="200"
                rx="150"
                ry="50"
                transform="rotate(-15 260 120)"
                stroke="#f59e0b"
                strokeWidth="2.5"
                fill="none"
                className="animate-ellipse hidden md:block"
              // style={{ animationDelay: "3s" }}   // START AFTER DASH FINISHES
              />


            </svg>
          </div>

          {/* Text Content with Animations */}
          <div className="relative">
            <h1
              className={`text-3xl md:text-5xl lg:text-5xl font-medium text-[#7B7B7B] mb-3 md:mb-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <span className="inline-block hover:text-blue-600 transition-colors duration-300">Learning</span>{' '}
              <span className="inline-block hover:text-purple-600 transition-colors duration-300">designed</span>{' '}
              <span className="inline-block hover:text-pink-600 transition-colors duration-300">for</span>{' '}
              <span className="inline-block hover:text-orange-600 transition-colors duration-300">you</span>
            </h1>

            <h2
              className={`text-3xl md:text-5xl lg:text-5xl font-medium text-[#7B7B7B] mb-6 md:mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: '1400ms' }}
            >
              <span className="inline-block hover:text-green-600 transition-colors duration-300">Success</span>{' '}
              <span className="inline-block hover:text-blue-600 transition-colors duration-300">designed</span>{' '}
              <span className="inline-block hover:text-indigo-600 transition-colors duration-300">by</span>{' '}
              <span className="inline-block hover:text-purple-600 transition-colors duration-300">you</span>
            </h2>

            <p
              className={`text-sm md:text-md text-gray-600 max-w-xl mx-auto leading-relaxed px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: '1600ms' }}
            >
              Craft high-quality content in seconds using AI. Just type your topic
              <br className="hidden sm:block" />
              let Samwri do the magic.
            </p>


          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
}