import React from 'react';

const Lighting = () => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} />
            <hemisphereLight args={["#ffffff", "#082f49", 0.6]} />
        </>
    );
};

export default Lighting;
