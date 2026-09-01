import React from 'react';

export default function ZeltrionixLogo({ className = "h-10", showText = true }) {
    return (
        <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
            <img 
                src="/images/logo.png" 
                alt="Zeltrionix AI" 
                className="h-full w-auto object-contain flex-shrink-0 min-h-[32px] max-h-[48px]" 
            />
        </div>
    );
}
