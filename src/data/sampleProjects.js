
export const SAMPLE_PROJECTS = [
    {
        id: 'modern-apt-1',
        name: 'Modern City Apartment',
        lastModified: Date.now(),
        floors: [
            {
                id: 'f1',
                name: 'Main Floor',
                level: 0,
                walls: [
                    // Outer Shell (30ft x 40ft approx)
                    { id: 'w1', start: { x: 100, y: 100 }, end: { x: 700, y: 100 }, color: '#334155', material: 'concrete' },
                    { id: 'w2', start: { x: 700, y: 100 }, end: { x: 700, y: 500 }, color: '#334155', material: 'concrete' },
                    { id: 'w3', start: { x: 700, y: 500 }, end: { x: 100, y: 500 }, color: '#334155', material: 'concrete' },
                    { id: 'w4', start: { x: 100, y: 500 }, end: { x: 100, y: 100 }, color: '#334155', material: 'concrete' },

                    // Bedroom Wall
                    { id: 'w5', start: { x: 400, y: 100 }, end: { x: 400, y: 300 }, color: '#94a3b8', material: 'smooth' },
                    { id: 'w6', start: { x: 400, y: 300 }, end: { x: 700, y: 300 }, color: '#94a3b8', material: 'smooth' },

                    // Bathroom Wall
                    { id: 'w7', start: { x: 100, y: 300 }, end: { x: 250, y: 300 }, color: '#94a3b8', material: 'smooth' },
                    { id: 'w8', start: { x: 250, y: 300 }, end: { x: 250, y: 100 }, color: '#94a3b8', material: 'smooth' },
                ],
                openings: [
                    // Main Entrance
                    { id: 'd1', wallId: 'w4', type: 'door', position: 0.8, width: 40 },
                    // Bedroom Door
                    { id: 'd2', wallId: 'w6', type: 'door', position: 0.2, width: 32 },
                    // Bathroom Door
                    { id: 'd3', wallId: 'w8', type: 'door', position: 0.5, width: 30 },
                    // Windows
                    { id: 'win1', wallId: 'w1', type: 'window', position: 0.5, width: 60 },
                    { id: 'win2', wallId: 'w2', type: 'window', position: 0.5, width: 60 },
                ],
                furniture: []
            }
        ]
    },
    {
        id: 'luxury-villa',
        name: 'Open Concept Villa',
        lastModified: Date.now(),
        floors: [
            {
                id: 'f1',
                name: 'Ground Floor',
                level: 0,
                walls: [
                    // L-Shape Layout
                    { id: 'v1', start: { x: 200, y: 200 }, end: { x: 800, y: 200 }, color: '#10b981', material: 'brickwork' },
                    { id: 'v2', start: { x: 800, y: 200 }, end: { x: 800, y: 600 }, color: '#10b981', material: 'brickwork' },
                    { id: 'v3', start: { x: 800, y: 600 }, end: { x: 500, y: 600 }, color: '#10b981', material: 'brickwork' },
                    { id: 'v4', start: { x: 500, y: 600 }, end: { x: 500, y: 400 }, color: '#10b981', material: 'brickwork' },
                    { id: 'v5', start: { x: 500, y: 400 }, end: { x: 200, y: 400 }, color: '#10b981', material: 'brickwork' },
                    { id: 'v6', start: { x: 200, y: 400 }, end: { x: 200, y: 200 }, color: '#10b981', material: 'brickwork' },
                ],
                openings: [
                    { id: 'vd1', wallId: 'v6', type: 'door', position: 0.5, width: 70 }, // Double Door
                    { id: 'vw1', wallId: 'v1', type: 'window', position: 0.3, width: 80 },
                    { id: 'vw2', wallId: 'v1', type: 'window', position: 0.7, width: 80 },
                    { id: 'vw3', wallId: 'v2', type: 'window', position: 0.5, width: 100 }, // Panorama
                ],
                furniture: []
            }
        ]
    }
];
