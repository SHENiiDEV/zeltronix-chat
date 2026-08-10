import React from 'react';

export default function ZeltrionixLogo({ className = "h-8", showText = true }) {
    return (
        <div className={`flex items-center gap-3 select-none ${className}`}>
            {/* Double Z Emblem matching logo image */}
            <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square overflow-visible" fill="none">
                <defs>
                    <linearGradient id="zt-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d2ff" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                {/* Top Z bar & slant */}
                <path
                    d="M 20 20 L 70 20 L 35 55 L 80 55 L 70 65 L 25 65 L 60 30 L 20 30 Z"
                    fill="url(#zt-logo-grad)"
                />
                {/* Bottom offset Z bar */}
                <path
                    d="M 30 45 L 75 45 L 40 80 L 85 80 L 75 90 L 20 90 L 55 55 L 30 55 Z"
                    fill="url(#zt-logo-grad)"
                    opacity="0.95"
                />
            </svg>

            {showText && (
                <div className="flex flex-col justify-center">
                    <span className="text-xl font-black tracking-wider text-white leading-none font-sans">
                        ZELTRIONIX
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase leading-tight mt-0.5">
                        AI Support Agents
                    </span>
                </div>
            )}
        </div>
    );
}
