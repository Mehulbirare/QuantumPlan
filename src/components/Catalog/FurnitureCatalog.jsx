import React, { useState } from 'react';
import { furnitureDatabase, categories } from '../../data/furnitureDatabase';
import { Search, Plus, Sparkles, Box, LayoutGrid } from 'lucide-react';
import useUIStore from '../../stores/uiStore';
import useFloorPlanStore from '../../stores/floorPlanStore';
import useFurnitureStore from '../../stores/furnitureStore';
import { toast } from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const FurnitureCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const { addFurniture } = useFloorPlanStore();
    const { setActiveMode } = useUIStore();
    const { setSelectedId } = useFurnitureStore();

    const filteredItems = furnitureDatabase.filter(item => {
        const matchesSearch = (item.name + item.subcategory).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToScene = (item) => {
        const id = Date.now().toString();

        addFurniture({
            ...item,
            id,
            position: { x: 400, y: 300 },
            rotation: 0
        });

        // Auto-select the newly added item
        setSelectedId(id);

        toast.success(`Positioned ${item.name} in scene`);
        setActiveMode('3d');
    };

    return (
        <div className="h-full flex flex-col bg-slate-950/50 backdrop-blur-3xl overflow-hidden">
            {/* Premium Header */}
            <div className="p-10 pb-8 bg-gradient-to-b from-slate-900/50 to-transparent">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="text-primary-500" size={20} />
                            <span className="text-primary-400 font-black text-xs uppercase tracking-[0.3em]">Curated Collection</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-600">Library</span></h1>
                        <p className="text-slate-500 text-sm font-medium">Inject life into your spaces with over 100+ professional assets.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group flex-1 sm:w-80">
                            <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full " />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                className="w-full bg-slate-900/60 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:bg-slate-900 transition-all font-medium placeholder:text-slate-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Sub-Navigation Categories */}
                <div className="flex gap-2 overflow-x-auto mt-10 no-scrollbar pb-2">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap border",
                            activeCategory === 'all'
                                ? "bg-primary-500 border-primary-400 text-white shadow-2xl shadow-primary-500/20"
                                : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <LayoutGrid size={14} />
                        All Assets
                    </button>
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap border",
                                activeCategory === cat.id
                                    ? "bg-white border-white text-slate-950 shadow-2xl shadow-white/10"
                                    : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <Box size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Container */}
            <div className="flex-1 overflow-y-auto p-10 pt-0 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                            {/* Visual Canvas */}
                            <div className="relative h-60 overflow-hidden bg-slate-950">
                                <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-slate-950/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black text-primary-400 tracking-[0.2em] uppercase">
                                        {item.subcategory}
                                    </div>
                                    <div className="bg-primary-500/20 backdrop-blur-xl px-4 py-1.5 rounded-full border border-primary-500/30 text-[9px] font-black text-white tracking-[0.2em] uppercase flex items-center gap-2">
                                        <Box size={10} />
                                        3D Object
                                    </div>
                                </div>
                            </div>

                            {/* Info Block */}
                            <div className="p-6">
                                <h3 className="text-white font-black text-lg tracking-tight mb-1 group-hover:text-primary-400 transition-colors uppercase truncate">{item.name}</h3>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-slate-500 text-[10px] font-black tracking-widest uppercase">{item.style[0]} series</span>
                                    <span className="text-primary-400 font-inter font-black text-lg">${item.price}</span>
                                </div>
                                <button
                                    onClick={() => handleAddToScene(item)}
                                    className="w-full bg-slate-950 hover:bg-primary-500 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 border border-white/5 group/btn active:scale-95"
                                >
                                    <Plus size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                                    Deploy to Room
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-40 opacity-20">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-slate-800 flex items-center justify-center mb-6">
                            <Search size={48} />
                        </div>
                        <p className="text-white font-black text-2xl uppercase tracking-widest">No assets found</p>
                        <p className="text-slate-500 font-medium">Try searching for generic terms like "table" or "chair"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FurnitureCatalog;
