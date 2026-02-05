import React from 'react';

const VRWalkthrough = () => {
    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-slate-950 via-primary-950 to-slate-950 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent opacity-50" />

            <div className="flex-1 flex items-center justify-center p-10 relative z-10">
                <div className="text-center space-y-8 max-w-2xl">
                    {/* VR Icon */}
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-[3rem] bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-500/50 mb-8">
                        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
                            VR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-600">Experience</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium mb-8">
                            Immerse yourself in your design with virtual reality
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-12">
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <div className="text-3xl font-black text-primary-400 mb-2">360°</div>
                            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">View</div>
                        </div>
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <div className="text-3xl font-black text-primary-400 mb-2">4K</div>
                            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Quality</div>
                        </div>
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <div className="text-3xl font-black text-primary-400 mb-2">60fps</div>
                            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Smooth</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mt-12">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-primary-500/30 hover:scale-105 active:scale-95">
                            Enter VR Mode
                        </button>
                        <button className="bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl transition-all border border-white/10">
                            Configure Headset
                        </button>
                    </div>

                    {/* Requirements */}
                    <div className="mt-12 p-6 bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-3xl">
                        <p className="text-slate-500 text-sm font-medium">
                            <span className="text-primary-400 font-bold">Requirements:</span> WebXR-compatible VR headset (Meta Quest, HTC Vive, Valve Index)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VRWalkthrough;
