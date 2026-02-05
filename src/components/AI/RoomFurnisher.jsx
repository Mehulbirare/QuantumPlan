import React, { useState } from 'react';
import aiService from '../../services/aiService';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const RoomFurnisher = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('modern');
    const [loading, setLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [advice, setAdvice] = useState('');

    const styles = [
        { id: 'modern', label: 'Modern' },
        { id: 'scandinavian', label: 'Scanidi' },
        { id: 'industrial', label: 'Industrial' },
        { id: 'minimalist', label: 'Minimalist' },
        { id: 'bohemian', label: 'Boho' },
    ];

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            const imageUrl = await aiService.generateRoomDesign(prompt, selectedStyle);
            setResultImage(imageUrl);
            const adviceText = await aiService.getChatAdvice(prompt, selectedStyle);
            setAdvice(adviceText);
        } catch (error) {
            console.error('AI Generation Error:', error);
            alert('Generation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-96 space-y-8">
                    <div className="animate-fade-in">
                        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                            <Sparkles className="text-primary-500" /> AI DESIGNER
                        </h1>
                        <p className="text-slate-500">Describe your dream room and let HomeVision AI bring it to life.</p>
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Select Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={cn(
                                        "flex items-center gap-2 p-3 rounded-xl border transition-all duration-300",
                                        selectedStyle === style.id ? "bg-primary-500/10 border-primary-500 text-primary-500 scale-105" : "bg-slate-900 border-slate-800 text-slate-400"
                                    )}
                                >
                                    <span className="font-bold text-xs uppercase tracking-tighter">{style.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Room Description</label>
                        <textarea
                            placeholder="e.g. Spacious living room with grey velvet sofa..."
                            className="w-full h-40 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white focus:ring-2 focus:ring-primary-500 transition-all resize-none shadow-xl outline-none"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <button onClick={handleGenerate} disabled={loading || !prompt} className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-500/25 transition-all active:scale-95 disabled:opacity-50">
                        {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        {loading ? 'GENERATING...' : 'GENERATE DESIGN'}
                    </button>

                    {advice && (
                        <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-3xl animate-fade-in">
                            <p className="text-primary-400 text-[10px] font-black uppercase tracking-widest mb-2">Designer Advice</p>
                            <p className="text-slate-200 text-sm italic">"{advice}"</p>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-h-[400px]">
                    {resultImage ? (
                        <div className="h-full bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden relative shadow-2xl group">
                            <img src={resultImage} alt="Generated Design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                <p className="text-white font-bold tracking-tight">Generated Architectural Vision</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-[3rem] items-center justify-center flex flex-col p-12 text-center opacity-50 group">
                            <div className="w-24 h-24 rounded-full bg-slate-800 mb-6 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ready to Imagine</h3>
                            <p className="text-slate-500 max-w-xs leading-relaxed">Describe your space and choose a style to trigger the AI rendering engine.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomFurnisher;
