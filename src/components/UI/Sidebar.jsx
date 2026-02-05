import React from 'react';
import {
    Square,
    Box,
    Search,
    Sparkles,
    Glasses,
    Menu,
    ChevronLeft,
    Home
} from 'lucide-react';
import useUIStore from '../../stores/uiStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Sidebar = ({ onGoHome }) => {
    const { activeMode, setActiveMode, sidebarOpen, toggleSidebar } = useUIStore();

    const menuItems = [
        { id: 'floorplan', icon: <Square size={20} />, label: 'Floor Plan' },
        { id: '3d', icon: <Box size={20} />, label: '3D View' },
        { id: 'catalog', icon: <Search size={20} />, label: 'Furniture' },
        { id: 'ai', icon: <Sparkles size={20} />, label: 'AI Design' },
        { id: 'vr', icon: <Glasses size={20} />, label: 'VR Tour' },
    ];

    return (
        <aside
            className={cn(
                "bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col h-screen sticky top-0 z-50",
                sidebarOpen ? "w-64" : "w-20"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {sidebarOpen && (
                    <h1 className="text-xl font-black text-white tracking-widest uppercase italic">
                        Quantum<span className="text-primary-500">Plan</span>
                    </h1>
                )}
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                >
                    {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-3">
                {/* Home Button */}
                {onGoHome && (
                    <button
                        onClick={onGoHome}
                        className={cn(
                            "w-full flex items-center p-4 rounded-2xl transition-all duration-300 group",
                            "text-slate-500 hover:text-primary-400 hover:bg-slate-800 border border-slate-800 hover:border-primary-500/20"
                        )}
                        title="Back to Home"
                    >
                        <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Home size={20} />
                        </div>
                        {sidebarOpen && (
                            <span className="ml-4 font-black text-[10px] uppercase tracking-[0.2em]">Home Page</span>
                        )}
                    </button>
                )}

                {/* Divider */}
                {onGoHome && <div className="border-t border-slate-800 my-3" />}

                {/* Regular Menu Items */}
                {menuItems.map((item) => {
                    const isActive = activeMode === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveMode(item.id)}
                            className={cn(
                                "w-full flex items-center p-4 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                    : "text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
                            )}
                            <div className={cn(
                                "flex items-center justify-center transition-transform duration-300",
                                isActive ? "scale-110 text-primary-500" : "group-hover:scale-110"
                            )}>
                                {item.icon}
                            </div>
                            {sidebarOpen && (
                                <span className="ml-4 font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center justify-center p-3 text-slate-600 italic text-[10px] uppercase font-bold tracking-widest">
                    {sidebarOpen ? 'v1.0.0 Stable' : 'v1'}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
