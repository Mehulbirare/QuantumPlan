"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Pause, Volume2, VolumeX, Sparkles, Crown, ArrowRight, Star, Award, Layout, Box, Eye, ChevronDown, Film, Wand2, Leaf, Lightbulb, Zap, Shield } from 'lucide-react';

const HomePage = () => {
    const router = useRouter();
    const onStart = () => router.push('/studio');
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showShowcase, setShowShowcase] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHoveringCTA, setIsHoveringCTA] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const heroVideoRef = useRef(null);
    const showcaseVideoRef = useRef(null);
    const sectionsRef = useRef([]);

    // Smooth scroll on page load
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.dataset.section]: true
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '-100px' }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Cursor trail effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (heroVideoRef.current) {
            heroVideoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        }
        if (showcaseVideoRef.current) {
            showcaseVideoRef.current.play().catch(e => console.log('Showcase autoplay prevented:', e));
        }
    }, []);

    const togglePlay = () => {
        if (heroVideoRef.current) {
            if (isPlaying) {
                heroVideoRef.current.pause();
            } else {
                heroVideoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (heroVideoRef.current) {
            heroVideoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="min-h-screen relative text-white overflow-x-hidden scroll-smooth">
            {/* Custom Cursor Trail */}
            <div
                className="fixed w-8 h-8 rounded-full border-2 border-amber-400/40 pointer-events-none z-50 transition-all duration-200 ease-out"
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: 'translate(-50%, -50%) scale(' + (isHoveringCTA ? '1.5' : '1') + ')',
                    opacity: cursorPosition.x === 0 ? 0 : 0.8
                }}
            />

            {/* === HERO SECTION WITH VIDEO BACKGROUND === */}
            <div
                className="relative min-h-screen flex flex-col snap-start"
                data-section="hero"
                ref={el => sectionsRef.current[0] = el}
                style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                {/* Full-screen Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={heroVideoRef}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/Luxury_Furniture_Montage_Video_Generated.mp4" type="video/mp4" />
                    </video>

                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-purple-900/20" />

                    {/* Vignette Effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-40" />
                </div>

                {/* Floating Orbs Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>

                {/* Navigation */}
                <nav className="relative z-20 flex items-center justify-between p-8 backdrop-blur-md bg-black/20">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/50 group hover:scale-105 transition-transform duration-300">
                            <Crown size={32} className="text-white drop-shadow-lg" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20" />
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 blur opacity-50 group-hover:opacity-75 transition-opacity" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-black tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-300 via-primary-400 to-quantum-300 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                                    QUANTUM
                                </span>
                                <span className="text-white drop-shadow-lg font-light tracking-widest pl-2">PLAN</span>
                            </h1>
                            <p className="text-xs text-quantum-200/70 font-display font-bold tracking-[0.4em] uppercase">Luxury Furniture Design</p>
                        </div>
                    </div>

                    <button
                        onClick={onStart}
                        className="group px-10 py-4 rounded-2xl glass hover:bg-white/10 border border-white/10 hover:border-quantum-400/60 font-display font-bold text-base transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-neon hover:scale-105"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white">
                            Launch Designer
                        </span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-400" />
                    </button>
                </nav>

                {/* Hero Content */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 pb-32">
                    <div className="text-center max-w-6xl">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-purple-500/20 border border-amber-400/40 backdrop-blur-2xl mb-12 shadow-2xl shadow-amber-500/20 hover:scale-105 transition-transform duration-500">
                            <Star size={24} className="text-amber-400 fill-amber-400 animate-pulse" />
                            <span className="text-amber-100 font-black text-base uppercase tracking-[0.4em]">
                                Cinematic Furniture Experience
                            </span>
                            <Star size={24} className="text-amber-400 fill-amber-400 animate-pulse" />
                        </div>

                        {/* Hero Title */}
                        <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-display font-black tracking-tighter mb-10 leading-[0.85]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-quantum-100 to-white drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] animate-fade-in-up">
                                Luxury
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 drop-shadow-[0_0_100px_rgba(251,191,36,0.6)] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                Redefined
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-3xl text-white/90 font-light mb-20 max-w-4xl mx-auto leading-relaxed tracking-wide">
                            Where <span className="italic font-serif text-amber-300">elegance</span> meets innovation.
                            Craft breathtaking spaces with our premium design platform.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <button
                                onClick={onStart}
                                onMouseEnter={() => setIsHoveringCTA(true)}
                                onMouseLeave={() => setIsHoveringCTA(false)}
                                className="group relative px-16 py-7 rounded-[2rem] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-black text-2xl uppercase tracking-[0.2em] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(251,191,36,0.6)] flex items-center gap-5 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {isHoveringCTA && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 animate-pulse" />
                                )}
                                <Crown size={32} className="group-hover:rotate-12 transition-transform relative z-10 text-black drop-shadow-lg" />
                                <span className="relative z-10 text-black drop-shadow-sm">Start Designing</span>
                                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform relative z-10 text-black drop-shadow-lg" />
                            </button>

                            <button
                                onClick={() => {
                                    setShowShowcase(true);
                                    setTimeout(() => {
                                        document.getElementById('showcase-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="px-16 py-7 rounded-[2rem] bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-amber-400/60 backdrop-blur-2xl font-bold text-2xl transition-all duration-300 hover:scale-105 shadow-2xl group"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 flex items-center gap-3">
                                    <Film size={28} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                                    Watch Showcase
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
                        <ChevronDown size={48} className="text-amber-400/60" />
                    </div>
                </div>
            </div>

            {/* === FULL-SCREEN VIDEO SHOWCASE SECTION === */}
            <div
                id="showcase-section"
                className={`relative min-h-screen flex items-center justify-center overflow-hidden snap-start transition-all duration-1000 ${isVisible.showcase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                data-section="showcase"
                ref={el => sectionsRef.current[1] = el}
            >
                {/* Full-Screen Video Background */}
                <video
                    ref={showcaseVideoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/Furniture_Website_Landing_Video_Creation.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                {/* Floating Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-400/40 backdrop-blur-3xl mb-12 animate-fade-in shadow-[0_0_60px_rgba(251,191,36,0.3)]">
                        <Film size={28} className="text-amber-300 animate-pulse" />
                        <span className="text-amber-100 font-black text-base uppercase tracking-[0.4em] drop-shadow-lg">
                            Immersive Showcase
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-9xl font-display font-black mb-8 leading-tight drop-shadow-2xl">
                        <span className="block text-white animate-fade-in text-glow-quantum">
                            Furniture That
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-quantum-200 via-quantum-400 to-quantum-200 drop-shadow-[0_0_80px_rgba(14,165,233,0.8)]">
                            Tells A Story
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-3xl text-white/90 font-light mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-xl italic">
                        Every piece is a masterpiece. Every space, a canvas. Experience the art of luxury living.
                    </p>

                    {/* Floating Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-10 hover:scale-105 transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-3 drop-shadow-lg">
                                200+
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-[0.3em] text-sm">
                                Luxury Collections
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-10 hover:scale-105 transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-3 drop-shadow-lg">
                                100%
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-[0.3em] text-sm">
                                Handcrafted Quality
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-10 hover:scale-105 transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-3 drop-shadow-lg">
                                24/7
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-[0.3em] text-sm">
                                Design Inspiration
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-16">
                        <button
                            onClick={onStart}
                            className="group relative px-20 py-8 rounded-[2rem] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-black text-2xl uppercase tracking-[0.2em] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_80px_rgba(251,191,36,0.8)] inline-flex items-center gap-6 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Sparkles size={32} className="group-hover:rotate-180 transition-transform duration-700 relative z-10 text-black" />
                            <span className="relative z-10 text-black drop-shadow-sm">Explore Collections</span>
                            <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform relative z-10 text-black" />
                        </button>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-10 rounded-full border-2 border-amber-400/60 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 bg-amber-400 rounded-full animate-pulse" />
                        </div>
                        <span className="text-amber-300/60 text-xs font-bold uppercase tracking-widest">Scroll</span>
                    </div>
                </div>
            </div>

            {/* === FEATURES SECTION === */}
            <div
                className={`relative py-32 snap-start transition-all duration-1000 overflow-hidden ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}
                data-section="features"
                ref={el => sectionsRef.current[2] = el}
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/pexels-chanwalrus-941861.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-60" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500/10 border border-amber-400/30 backdrop-blur-xl mb-8">
                            <Sparkles size={24} className="text-amber-400" />
                            <span className="text-amber-200 font-bold text-sm uppercase tracking-[0.3em]">
                                Core Features
                            </span>
                        </div>
                        <h2 className="text-7xl font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-lg">
                                Design Without Limits
                            </span>
                        </h2>
                        <p className="text-2xl text-white/70 font-light max-w-3xl mx-auto">
                            Professional tools that bring your vision to life
                        </p>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 transition-all duration-1000 delay-200 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        {/* Feature 1 - Precision Design */}
                        <div className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(251,191,36,0.4)] ${isVisible.features ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/pexels-artbovich-6782352.jpg"
                                    alt="Precision Design"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-12 h-full flex flex-col justify-between min-h-[450px]">
                                <div>
                                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-400/40 to-amber-600/40 backdrop-blur-xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-amber-400/30">
                                        <Layout size={56} className="text-amber-300 drop-shadow-2xl" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-6 text-white drop-shadow-2xl">
                                        Precision Design
                                    </h3>
                                    <p className="text-white/80 leading-relaxed text-lg backdrop-blur-sm">
                                        Professional-grade tools for millimeter-perfect layouts and stunning architectural detail.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-3 text-amber-400 font-bold group-hover:gap-5 transition-all">
                                    <span>Explore Feature</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            {/* Border Glow */}
                            <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/60 rounded-[2.5rem] transition-all duration-500" />
                        </div>

                        {/* Feature 2 - 3D Rendering */}
                        <div className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/pexels-artbovich-6969830.jpg"
                                    alt="3D Rendering"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-12 h-full flex flex-col justify-between min-h-[450px]">
                                <div>
                                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-400/40 to-purple-600/40 backdrop-blur-xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-purple-400/30">
                                        <Box size={56} className="text-purple-300 drop-shadow-2xl" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-6 text-white drop-shadow-2xl">
                                        3D Rendering
                                    </h3>
                                    <p className="text-white/80 leading-relaxed text-lg backdrop-blur-sm">
                                        Photorealistic visualization with real-time lighting and materials that feel real.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-3 text-purple-400 font-bold group-hover:gap-5 transition-all">
                                    <span>Explore Feature</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            {/* Border Glow */}
                            <div className="absolute inset-0 border-2 border-purple-400/0 group-hover:border-purple-400/60 rounded-[2.5rem] transition-all duration-500" />
                        </div>

                        {/* Feature 3 - Virtual Reality */}
                        <div className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] ${isVisible.features ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/pexels-artbovich-8134762.jpg"
                                    alt="Virtual Reality"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-12 h-full flex flex-col justify-between min-h-[450px]">
                                <div>
                                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-400/40 to-blue-600/40 backdrop-blur-xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-400/30">
                                        <Eye size={56} className="text-blue-300 drop-shadow-2xl" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-6 text-white drop-shadow-2xl">
                                        Virtual Reality
                                    </h3>
                                    <p className="text-white/80 leading-relaxed text-lg backdrop-blur-sm">
                                        Step inside your design. Experience spaces in immersive VR before they exist.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-3 text-blue-400 font-bold group-hover:gap-5 transition-all">
                                    <span>Explore Feature</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            {/* Border Glow */}
                            <div className="absolute inset-0 border-2 border-blue-400/0 group-hover:border-blue-400/60 rounded-[2.5rem] transition-all duration-500" />
                        </div>
                    </div>

                    {/* Stats Section */}
                    {/* Stats Section - Premium Floating Card */}
                    <div className="relative mt-40">
                        <div className="relative bg-black rounded-[4rem] overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.5)] border border-white/10 group">
                            {/* Card Background Image (Subtle Interior) */}
                            <div className="absolute inset-0 opacity-40 transition-transform duration-1000 group-hover:scale-105">
                                <img
                                    src="/pexels-bruceclarkinoc-5653998.jpg"
                                    alt="Interior Background"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>

                            {/* Dark Glass Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-md" />

                            {/* Decorative Glows */}
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                {/* Stat 1 */}
                                <div className="p-16 text-center group/stat transition-all duration-300 hover:bg-white/5">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="p-4 rounded-2xl bg-amber-500/10 mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                                            <Award className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" size={32} />
                                        </div>
                                        <div>
                                            <div className="text-8xl font-black text-white mb-2 tracking-tight drop-shadow-xl">
                                                150<span className="text-amber-400">+</span>
                                            </div>
                                            <div className="h-1 w-12 bg-amber-500 mx-auto rounded-full mb-4 opacity-50 group-hover/stat:w-20 transition-all duration-500" />
                                            <div className="text-amber-100/60 font-bold uppercase tracking-[0.2em] text-sm group-hover/stat:text-amber-200 transition-colors">
                                                Premium Furniture Pieces
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stat 2 */}
                                <div className="p-16 text-center group/stat transition-all duration-300 hover:bg-white/5">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="p-4 rounded-2xl bg-purple-500/10 mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                                            <Star className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" size={32} />
                                        </div>
                                        <div>
                                            <div className="text-8xl font-black text-white mb-2 tracking-tight drop-shadow-xl">
                                                50<span className="text-purple-400">k+</span>
                                            </div>
                                            <div className="h-1 w-12 bg-purple-500 mx-auto rounded-full mb-4 opacity-50 group-hover/stat:w-20 transition-all duration-500" />
                                            <div className="text-purple-100/60 font-bold uppercase tracking-[0.2em] text-sm group-hover/stat:text-purple-200 transition-colors">
                                                Elite Designers
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stat 3 */}
                                <div className="p-16 text-center group/stat transition-all duration-300 hover:bg-white/5">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="p-4 rounded-2xl bg-blue-500/10 mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                                            <Crown className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" size={32} />
                                        </div>
                                        <div>
                                            <div className="text-8xl font-black text-white mb-2 tracking-tight drop-shadow-xl">
                                                100<span className="text-blue-400">%</span>
                                            </div>
                                            <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full mb-4 opacity-50 group-hover/stat:w-20 transition-all duration-500" />
                                            <div className="text-blue-100/60 font-bold uppercase tracking-[0.2em] text-sm group-hover/stat:text-blue-200 transition-colors">
                                                Luxury Quality
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* === LUXURY FURNITURE GALLERY === */}
            <div
                className={`relative bg-gradient-to-b from-black via-slate-950 to-black py-32 snap-start transition-all duration-1000 ${isVisible.gallery ? 'opacity-100' : 'opacity-0'}`}
                data-section="gallery"
                ref={el => sectionsRef.current[3] = el}
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_70%)]" />

                <div className="relative z-10 max-w-7xl mx-auto px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500/10 border border-amber-400/30 backdrop-blur-xl mb-8">
                            <Star size={24} className="text-amber-400 fill-amber-400" />
                            <span className="text-amber-200 font-bold text-sm uppercase tracking-[0.3em]">
                                Our Collection
                            </span>
                        </div>
                        <h2 className="text-7xl font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white">
                                Luxury
                            </span>
                            {' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300">
                                Furniture Gallery
                            </span>
                        </h2>
                        <p className="text-2xl text-white/70 font-light max-w-3xl mx-auto">
                            Handpicked masterpieces that redefine elegance and comfort
                        </p>
                    </div>

                    {/* Masonry Grid Gallery */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible.gallery ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        {/* Image 1 - Tall */}
                        <div className="group relative overflow-hidden rounded-[2rem] row-span-2 h-[600px]">
                            <img
                                src="/pexels-artbovich-6492402.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">Elegant Living</h3>
                                <p className="text-amber-200/80 text-sm">Premium Collection</p>
                            </div>
                        </div>

                        {/* Image 2 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-dan-hadley-360599-8824579.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 3 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-gochrisgoxyz-1648838.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 4 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-kamo11235-667838.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 5 - Tall */}
                        <div className="group relative overflow-hidden rounded-[2rem] row-span-2 h-[600px]">
                            <img
                                src="/pexels-artbovich-13068363.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">Modern Comfort</h3>
                                <p className="text-amber-200/80 text-sm">Designer Series</p>
                            </div>
                        </div>

                        {/* Image 6 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-curtis-adams-1694007-10628392.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 7 - Wide */}
                        <div className="group relative overflow-hidden rounded-[2rem] md:col-span-2 h-[290px]">
                            <img
                                src="/pexels-kei-scampa-1201427-11125322.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 8 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-marcus-80608062-12349869.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Image 9 */}
                        <div className="group relative overflow-hidden rounded-[2rem] h-[290px]">
                            <img
                                src="/pexels-mo-eid-1268975-6008071.jpg"
                                alt="Luxury Furniture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-16">
                        <button
                            onClick={onStart}
                            className="group px-16 py-6 rounded-[2rem] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-black text-xl uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(251,191,36,0.6)] inline-flex items-center gap-4"
                        >
                            <Eye size={24} className="group-hover:scale-110 transition-transform text-black" />
                            <span className="text-black">View Full Collection</span>
                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform text-black" />
                        </button>
                    </div>
                </div>
            </div>

            {/* === INNOVATION & SUSTAINABILITY SECTION === */}
            <div className="relative py-40 overflow-hidden">
                {/* Tech Background Effect */}
                <div className="absolute inset-0 bg-black">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-8">
                    {/* Section Header */}
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-900/20 border border-green-500/20 backdrop-blur-xl mb-10 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                            <Leaf size={18} className="text-green-400" />
                            <span className="text-green-400 font-bold text-xs uppercase tracking-[0.25em]">
                                Innovation Meets Responsibility
                            </span>
                        </div>
                        <h2 className="text-7xl font-black mb-8 tracking-tight">
                            <span className="block text-white mb-2 drop-shadow-2xl">
                                Designing the Future,
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                                Sustainably
                            </span>
                        </h2>
                        <p className="text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Cutting-edge technology powered by eco-conscious principles for a better tomorrow.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Card 1 - AI Design */}
                        <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 flex items-center justify-center mb-8 border border-amber-500/10 group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-300">
                                    <Lightbulb size={36} className="text-amber-500/80 group-hover:text-amber-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">AI Design</h3>
                                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                                    Intelligent suggestions powered by machine learning algorithms that understand your style.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 - Real-Time */}
                        <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center mb-8 border border-purple-500/10 group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-300">
                                    <Zap size={36} className="text-purple-500/80 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Real-Time</h3>
                                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                                    Instant rendering with cloud-powered processing for zero-latency visualization.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 - Sustainable */}
                        <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center mb-8 border border-green-500/10 group-hover:scale-110 group-hover:border-green-500/30 transition-all duration-300">
                                    <Leaf size={36} className="text-green-500/80 group-hover:text-green-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Sustainable</h3>
                                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                                    Eco-friendly materials and energy-efficient design choices built into the core.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 - Certified */}
                        <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center mb-8 border border-blue-500/10 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                                    <Shield size={36} className="text-blue-500/80 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Certified</h3>
                                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                                    Industry leading quality standards guaranteed for every single project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* === FINAL CTA SECTION === */}
            <div className="relative bg-black py-40 overflow-hidden border-t border-white/5">
                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
                    {/* Main Headline */}
                    <h2 className="text-[7rem] leading-[0.9] font-black tracking-tight mb-8">
                        <span className="block text-white drop-shadow-2xl">
                            Ready to Create
                        </span>
                        <span className="block text-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                            Something
                        </span>
                        <span className="block text-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                            Extraordinary?
                        </span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-2xl text-gray-400 font-light italic mb-16 tracking-wide">
                        Join the elite designers who trust <span className="text-amber-400 font-semibold not-italic">QuantumPlan</span> for their most prestigious
                        <br />
                        luxury projects
                    </p>

                    {/* Massive Button */}
                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center gap-6 px-16 py-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 transition-all duration-300 transform hover:scale-105 shadow-[0_0_60px_rgba(251,191,36,0.3)] hover:shadow-[0_0_80px_rgba(251,191,36,0.6)]"
                    >
                        <Wand2 size={32} className="text-black stroke-[2.5]" />
                        <span className="text-2xl font-black text-black tracking-[0.15em] uppercase">
                            Enter QuantumPlan
                        </span>
                        <ArrowRight size={32} className="text-black stroke-[2.5] group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>

            {/* === FOOTER === */}
            <div className="bg-black py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
                    <p className="text-[#3a3a3a] text-xs font-bold tracking-[0.3em] uppercase">
                        © 2026 QuantumPlan • Luxury Furniture Design Platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
