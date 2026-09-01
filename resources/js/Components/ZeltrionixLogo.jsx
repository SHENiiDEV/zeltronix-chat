import React from 'react';

export default function ZeltrionixLogo({ className = "h-9", showText = true }) {
    return (
        <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
            {/* 3D Cyber Hexagon + Z + Neural Nodes Emblem */}
            <svg viewBox="0 0 120 120" className="h-full w-auto aspect-square flex-shrink-0 overflow-visible" fill="none">
                <defs>
                    <linearGradient id="zt-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d2ff" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="zt-z-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="zt-node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                    <filter id="zt-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Outer 3D Hexagon Ring */}
                <polygon
                    points="50,10 85,30 85,70 50,90 15,70 15,30"
                    stroke="url(#zt-hex-grad)"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    fill="#0f172a"
                    filter="url(#zt-glow)"
                />

                {/* Sharp Inner Z Monogram */}
                <path
                    d="M 32 32 L 68 32 L 36 68 L 68 68"
                    stroke="url(#zt-z-grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Neural Branch Nodes on the right side */}
                <line x1="85" y1="35" x2="105" y2="25" stroke="url(#zt-node-grad)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="107" cy="24" r="5" fill="#00f2fe" filter="url(#zt-glow)" />

                <line x1="85" y1="50" x2="112" y2="50" stroke="url(#zt-node-grad)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="114" cy="50" r="5" fill="#38bdf8" filter="url(#zt-glow)" />

                <line x1="85" y1="65" x2="105" y2="75" stroke="url(#zt-node-grad)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="107" cy="76" r="5" fill="#8b5cf6" filter="url(#zt-glow)" />
            </svg>

            {showText && (
                <div className="flex flex-col justify-center flex-shrink-0 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 leading-none">
                        <span className="text-xl font-black tracking-wider text-white font-sans">
                            Zeltrionix
                        </span>
                        <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-sans">
                            AI
                        </span>
                    </div>
                    <span className="text-[8px] font-extrabold tracking-[0.22em] text-blue-400 uppercase leading-tight mt-1">
                        Autonomous AI Sourcing
                    </span>
                </div>
            )}
        </div>
    );
}
