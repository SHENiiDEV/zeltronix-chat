import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CURRENCIES = [
    { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro (€)' },
    { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar ($)' },
    { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound (£)' },
];

export default function CurrencyDropdown({ floating = false }) {
    const [selectedCode, setSelectedCode] = useState(() => {
        return localStorage.getItem('zeltronix_currency') || 'EUR';
    });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleStorageChange = () => {
            setSelectedCode(localStorage.getItem('zeltronix_currency') || 'EUR');
        };
        window.addEventListener('zeltronix_currency_changed', handleStorageChange);
        return () => window.removeEventListener('zeltronix_currency_changed', handleStorageChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code) => {
        setSelectedCode(code);
        localStorage.setItem('zeltronix_currency', code);
        window.dispatchEvent(new Event('zeltronix_currency_changed'));
        setIsOpen(false);
    };

    const current = CURRENCIES.find((c) => c.code === selectedCode) || CURRENCIES[0];

    return (
        <div ref={dropdownRef} className={`relative inline-block text-left ${floating ? 'fixed bottom-6 right-6 z-40' : ''}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md transition-all flex items-center gap-2 group focus:outline-none focus:border-blue-500"
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="font-extrabold text-white">{current.code}</span>
                <span className="text-slate-500 text-[10px]">({current.symbol})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : 'group-hover:text-white'}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl backdrop-blur-2xl z-50 p-1.5 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-800/80 mb-1">
                        Select Billing Currency
                    </div>
                    {CURRENCIES.map((item) => (
                        <button
                            key={item.code}
                            type="button"
                            onClick={() => handleSelect(item.code)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                                selectedCode === item.code
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base leading-none">{item.flag}</span>
                                <span>{item.code}</span>
                                <span className="text-[11px] text-slate-500">({item.symbol})</span>
                            </div>
                            {selectedCode === item.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
