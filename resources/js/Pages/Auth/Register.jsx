import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { COUNTRIES } from '@/constants/countries';
import { 
    User, Mail, Lock, Phone, Calendar, MapPin, Building, Globe, 
    Compass, Sparkles, CheckCircle2, ShieldCheck, FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address_street: '',
        address_city: '',
        address_country: 'United Kingdom',
        address_postcode: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Enterprise Account | FERNBLAKE LIMITED" />

            <div className="relative min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-2xl relative z-10"
                >
                    {/* Header Logo & Title */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-3">
                            <ZeltrionixLogo className="h-10" />
                        </Link>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Your Account</h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Deploy autonomous AI support agents with enterprise multi-currency infrastructure
                        </p>
                    </div>

                    {/* Auth Card Form */}
                    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl shadow-purple-500/10">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Section 1: Personal Information */}
                            <div>
                                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-800 text-xs font-extrabold uppercase tracking-wider text-blue-400">
                                    <User className="w-4 h-4" /> Personal Information
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                autoComplete="given-name"
                                                required
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="John"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                        {errors.name && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Surname / Last Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="surname"
                                                type="text"
                                                name="surname"
                                                value={data.surname}
                                                autoComplete="family-name"
                                                required
                                                onChange={(e) => setData('surname', e.target.value)}
                                                placeholder="Doe"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                        {errors.surname && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.surname}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={data.phone}
                                                autoComplete="tel"
                                                required
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+44 7911 123456"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Date of Birth
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="date_of_birth"
                                                type="date"
                                                name="date_of_birth"
                                                value={data.date_of_birth}
                                                required
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [color-scheme:dark]"
                                            />
                                        </div>
                                        {errors.date_of_birth && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.date_of_birth}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Residential / Business Address (4 parts) */}
                            <div>
                                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-800 text-xs font-extrabold uppercase tracking-wider text-purple-400">
                                    <MapPin className="w-4 h-4" /> Address Details
                                </div>
                                <div className="space-y-4">
                                    {/* 1. Street, house number, apartment */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            1. Street, House Number, Apartment / Suite
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Compass className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="address_street"
                                                type="text"
                                                name="address_street"
                                                value={data.address_street}
                                                autoComplete="street-address"
                                                required
                                                onChange={(e) => setData('address_street', e.target.value)}
                                                placeholder="10 High Street, Flat 4B"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                            />
                                        </div>
                                        {errors.address_street && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.address_street}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* 2. City */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                2. City
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <Building className="w-4 h-4" />
                                                </div>
                                                <input
                                                    id="address_city"
                                                    type="text"
                                                    name="address_city"
                                                    value={data.address_city}
                                                    autoComplete="address-level2"
                                                    required
                                                    onChange={(e) => setData('address_city', e.target.value)}
                                                    placeholder="London"
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                                />
                                            </div>
                                            {errors.address_city && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.address_city}</p>}
                                        </div>

                                        {/* 3. Country (Select list of world countries excluding prohibited ones) */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                3. Country
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <Globe className="w-4 h-4" />
                                                </div>
                                                <select
                                                    id="address_country"
                                                    name="address_country"
                                                    value={data.address_country}
                                                    required
                                                    onChange={(e) => setData('address_country', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                                >
                                                    {COUNTRIES.map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.address_country && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.address_country}</p>}
                                        </div>

                                        {/* 4. Post code */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                4. Post Code
                                            </label>
                                            <input
                                                id="address_postcode"
                                                type="text"
                                                name="address_postcode"
                                                value={data.address_postcode}
                                                autoComplete="postal-code"
                                                required
                                                onChange={(e) => setData('address_postcode', e.target.value)}
                                                placeholder="SW1A 1AA"
                                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                            />
                                            {errors.address_postcode && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.address_postcode}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Account Security */}
                            <div>
                                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-800 text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                                    <Lock className="w-4 h-4" /> Account Credentials
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                required
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="john.doe@company.com"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.email}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    autoComplete="new-password"
                                                    required
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="••••••••"
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                                />
                                            </div>
                                            {errors.password && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                                <input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    autoComplete="new-password"
                                                    required
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    placeholder="••••••••"
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                                />
                                            </div>
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-xs text-rose-400 font-medium">{errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Terms and Privacy Checkbox */}
                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        checked={data.terms}
                                        onChange={(e) => setData('terms', e.target.checked)}
                                        required
                                        className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer"
                                    />
                                    <span className="text-xs text-slate-300 leading-relaxed">
                                        I agree to the{' '}
                                        <a 
                                            href={route('legal.terms')} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors"
                                        >
                                            Terms & Conditions
                                        </a>{' '}
                                        and{' '}
                                        <a 
                                            href={route('legal.privacy')} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors"
                                        >
                                            Privacy Policy
                                        </a>
                                    </span>
                                </label>
                                {errors.terms && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.terms}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/35 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                Complete Registration & Create Account <Sparkles className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
                            <p className="text-xs text-slate-400">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-blue-400 hover:text-blue-300 font-bold">
                                    Sign In ➔
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
