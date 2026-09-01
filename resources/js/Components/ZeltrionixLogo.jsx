import React from 'react';

export default function ZeltrionixLogo({ className = "h-12", showText = true }) {
    return (
        <div className={`flex items-center select-none flex-shrink-0 ${className}`}>
            <img 
                src="/images/logo.png" 
                alt="Zeltrionix AI" 
                className="h-full w-auto object-contain flex-shrink-0 max-h-[64px] sm:max-h-[72px]" 
            />
        </div>
    );
}
