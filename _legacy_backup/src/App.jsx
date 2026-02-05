import React, { Suspense, useState } from 'react';
import Sidebar from './components/UI/Sidebar';
import useUIStore from './stores/uiStore';
import FloorPlanEditor from './components/FloorPlan/FloorPlanEditor';
import FurnitureCatalog from './components/Catalog/FurnitureCatalog';
import RoomFurnisher from './components/AI/RoomFurnisher';
import HomePage from './components/HomePage/HomePage';
import { Toaster } from 'react-hot-toast';

// Lazy load heavy 3D components
const ThreeDViewer = React.lazy(() => import('./components/ThreeD/ThreeDViewer'));
const VRWalkthrough = React.lazy(() => import('./components/VR/VRWalkthrough'));

function App() {
  const { activeMode } = useUIStore();
  const [showHomePage, setShowHomePage] = useState(true);

  const handleStartApp = () => {
    setShowHomePage(false);
  };

  const handleGoHome = () => {
    setShowHomePage(true);
  };

  // Show HomePage first
  if (showHomePage) {
    return <HomePage onStart={handleStartApp} />;
  }

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

const LoadingState = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse">Loading 3D Environment...</p>
    </div>
  </div>
);

export default App;

