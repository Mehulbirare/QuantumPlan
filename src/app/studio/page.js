"use client";
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/UI/Sidebar';
import useUIStore from '@/stores/uiStore';
import { Toaster } from 'react-hot-toast';

const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium animate-pulse">Loading Environment...</p>
        </div>
    </div>
);

const FloorPlanEditor = dynamic(() => import('@/components/FloorPlan/FloorPlanEditor'), { ssr: false, loading: () => <LoadingState /> });
const FurnitureCatalog = dynamic(() => import('@/components/Catalog/FurnitureCatalog'), { ssr: false });
const RoomFurnisher = dynamic(() => import('@/components/AI/RoomFurnisher'), { ssr: false });
const ThreeDViewer = dynamic(() => import('@/components/ThreeD/ThreeDViewer'), { ssr: false, loading: () => <LoadingState /> });
const VRWalkthrough = dynamic(() => import('@/components/VR/VRWalkthrough'), { ssr: false, loading: () => <LoadingState /> });

export default function StudioPage() {
    const { activeMode } = useUIStore();
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    const renderContent = () => {
        switch (activeMode) {
            case 'floorplan':
                return <FloorPlanEditor />;
            case '3d':
                return <ThreeDViewer />;
            case 'catalog':
                return <FurnitureCatalog />;
            case 'ai':
                return <RoomFurnisher />;
            case 'vr':
                return <VRWalkthrough />;
            default:
                return <FloorPlanEditor />;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#0f172a',
                        color: '#fff',
                        border: '1px solid #1e293b',
                    },
                }}
            />
            <Sidebar onGoHome={handleGoHome} />
            <main className="flex-1 relative h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                <Suspense fallback={<LoadingState />}>
                    {renderContent()}
                </Suspense>
            </main>
        </div>
    );
}
