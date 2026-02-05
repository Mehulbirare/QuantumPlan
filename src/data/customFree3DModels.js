/**
 * 🆓 HOW TO ADD FREE 3D MODELS FROM FREE3D.COM
 * 
 * After downloading models from Free3D.com, follow these steps:
 * 
 * STEP 1: Place your .glb files in the public/models folder
 * STEP 2: Create thumbnails (screenshot/render) in public/thumbnails folder  
 * STEP 3: Add entries to furnitureDatabase below
 * STEP 4: Replace placeholder URLs with your local paths
 */

// ============================================
// TEMPLATE FOR FREE3D.COM MODELS
// ============================================

// Example structure - Copy and modify for each model you download:
const free3dModelTemplate = {
    id: 'free3d_sofa_001',              // Unique ID (use descriptive name)
    name: 'Modern Leather Sofa',         // Display name
    category: 'living-room',             // Category: living-room, bedroom, dining-room, kitchen, bathroom, office, lighting
    subcategory: 'sofas',                // What type of furniture
    style: ['modern', 'contemporary'],   // Array of style tags
    width: 200,                          // Width in cm (approximate)
    depth: 90,                           // Depth in cm
    height: 80,                          // Height in cm
    price: 0,                            // Set to 0 for free models
    modelUrl: '/models/modern_sofa.glb', // Path to your .glb file in public folder
    thumbnail: '/thumbnails/modern_sofa.jpg' // Path to thumbnail image
};

// ============================================
// ADD YOUR FREE3D MODELS HERE
// ============================================

export const customFree3DModels = [
    // === LIVING ROOM FURNITURE ===
    {
        id: 'free3d_sofa_leather_001',
        name: 'Modern Leather Sofa',
        category: 'living-room',
        subcategory: 'sofas',
        style: ['modern', 'contemporary'],
        width: 220,
        depth: 95,
        height: 85,
        price: 0,
        modelUrl: '/models/modern_leather_sofa.glb',
        thumbnail: '/thumbnails/modern_leather_sofa.jpg'
    },
    {
        id: 'free3d_chair_eames_001',
        name: 'Eames Lounge Chair',
        category: 'living-room',
        subcategory: 'chairs',
        style: ['mid-century', 'modern'],
        width: 84,
        depth: 85,
        height: 86,
        price: 0,
        modelUrl: '/models/eames_lounge_chair.glb',
        thumbnail: '/thumbnails/eames_chair.jpg'
    },
    {
        id: 'free3d_coffee_table_scandi_001',
        name: 'Scandinavian Coffee Table',
        category: 'living-room',
        subcategory: 'tables',
        style: ['scandinavian', 'minimalist'],
        width: 120,
        depth: 60,
        height: 45,
        price: 0,
        modelUrl: '/models/scandinavian_coffee_table.glb',
        thumbnail: '/thumbnails/scandi_coffee_table.jpg'
    },
    {
        id: 'free3d_tv_stand_modern_001',
        name: 'Modern TV Stand',
        category: 'living-room',
        subcategory: 'tables',
        style: ['modern', 'minimalist'],
        width: 180,
        depth: 50,
        height: 60,
        price: 0,
        modelUrl: '/models/modern_tv_stand.glb',
        thumbnail: '/thumbnails/modern_tv_stand.jpg'
    },

    // === DINING ROOM FURNITURE ===
    {
        id: 'free3d_dining_table_001',
        name: 'Minimalist Dining Table',
        category: 'dining-room',
        subcategory: 'tables',
        style: ['minimalist', 'modern'],
        width: 180,
        depth: 90,
        height: 75,
        price: 0,
        modelUrl: '/models/minimalist_dining_table.glb',
        thumbnail: '/thumbnails/dining_table.jpg'
    },
    {
        id: 'free3d_dining_chair_modern_001',
        name: 'Modern Dining Chair',
        category: 'dining-room',
        subcategory: 'chairs',
        style: ['modern', 'contemporary'],
        width: 45,
        depth: 45,
        height: 90,
        price: 0,
        modelUrl: '/models/modern_dining_chair.glb',
        thumbnail: '/thumbnails/dining_chair.jpg'
    },

    // === BEDROOM FURNITURE ===
    {
        id: 'free3d_bed_king_001',
        name: 'King Size Bed with Headboard',
        category: 'bedroom',
        subcategory: 'beds',
        style: ['modern', 'minimalist'],
        width: 200,
        depth: 180,
        height: 120,
        price: 0,
        modelUrl: '/models/king_bed_modern.glb',
        thumbnail: '/thumbnails/king_bed.jpg'
    },
    {
        id: 'free3d_nightstand_001',
        name: 'Modern Nightstand',
        category: 'bedroom',
        subcategory: 'tables',
        style: ['modern', 'minimalist'],
        width: 50,
        depth: 40,
        height: 60,
        price: 0,
        modelUrl: '/models/modern_nightstand.glb',
        thumbnail: '/thumbnails/nightstand.jpg'
    },
    {
        id: 'free3d_wardrobe_contemporary_001',
        name: 'Contemporary Wardrobe',
        category: 'bedroom',
        subcategory: 'storage',
        style: ['contemporary', 'modern'],
        width: 200,
        depth: 60,
        height: 220,
        price: 0,
        modelUrl: '/models/contemporary_wardrobe.glb',
        thumbnail: '/thumbnails/wardrobe.jpg'
    },

    // === OFFICE FURNITURE ===
    {
        id: 'free3d_office_chair_001',
        name: 'Ergonomic Office Chair',
        category: 'office',
        subcategory: 'chairs',
        style: ['ergonomic', 'modern'],
        width: 60,
        depth: 60,
        height: 120,
        price: 0,
        modelUrl: '/models/ergonomic_office_chair.glb',
        thumbnail: '/thumbnails/office_chair.jpg'
    },
    {
        id: 'free3d_office_desk_001',
        name: 'Modern Office Desk',
        category: 'office',
        subcategory: 'tables',
        style: ['modern', 'minimalist'],
        width: 140,
        depth: 70,
        height: 75,
        price: 0,
        modelUrl: '/models/modern_office_desk.glb',
        thumbnail: '/thumbnails/office_desk.jpg'
    },

    // === STORAGE & SHELVING ===
    {
        id: 'free3d_bookshelf_wall_001',
        name: 'Wall-Mounted Bookshelf',
        category: 'living-room',
        subcategory: 'storage',
        style: ['modern', 'minimalist'],
        width: 180,
        depth: 30,
        height: 200,
        price: 0,
        modelUrl: '/models/wall_bookshelf.glb',
        thumbnail: '/thumbnails/wall_bookshelf.jpg'
    },
    {
        id: 'free3d_kitchen_cabinet_001',
        name: 'Kitchen Cabinet Set',
        category: 'kitchen',
        subcategory: 'storage',
        style: ['modern', 'shaker'],
        width: 60,
        depth: 60,
        height: 90,
        price: 0,
        modelUrl: '/models/kitchen_cabinet.glb',
        thumbnail: '/thumbnails/kitchen_cabinet.jpg'
    },

    // === LIGHTING & DECOR ===
    {
        id: 'free3d_floor_lamp_001',
        name: 'Modern Floor Lamp',
        category: 'lighting',
        subcategory: 'lighting',
        style: ['modern', 'industrial'],
        width: 40,
        depth: 40,
        height: 180,
        price: 0,
        modelUrl: '/models/modern_floor_lamp.glb',
        thumbnail: '/thumbnails/floor_lamp.jpg'
    },
    {
        id: 'free3d_table_lamp_001',
        name: 'Table Lamp',
        category: 'lighting',
        subcategory: 'lighting',
        style: ['modern', 'minimalist'],
        width: 30,
        depth: 30,
        height: 50,
        price: 0,
        modelUrl: '/models/table_lamp.glb',
        thumbnail: '/thumbnails/table_lamp.jpg'
    }
];

// ============================================
// CATEGORIES REFERENCE
// ============================================
/*
Available categories:
- 'living-room'
- 'bedroom'
- 'dining-room'
- 'kitchen'
- 'bathroom'
- 'office'
- 'lighting'

Common subcategories:
Living Room: 'sofas', 'chairs', 'tables', 'storage', 'decoration'
Bedroom: 'beds', 'tables', 'storage', 'chairs', 'decoration'
Dining Room: 'tables', 'chairs', 'storage'
Kitchen: 'storage', 'tables', 'chairs', 'appliances'
Bathroom: 'tables', 'fixtures', 'storage'
Office: 'tables', 'chairs', 'storage'
Lighting: 'lighting'

Common styles:
'modern', 'contemporary', 'minimalist', 'mid-century', 'industrial', 
'scandinavian', 'bohemian', 'traditional', 'rustic', 'luxury', 
'functional', 'ergonomic', 'transitional', 'farmhouse'
*/

// ============================================
// QUICK SETUP INSTRUCTIONS
// ============================================
/*
1. CREATE FOLDERS (if they don't exist):
   - public/models/
   - public/thumbnails/

2. DOWNLOAD FROM FREE3D:
   - Visit https://free3d.com/3d-models/furniture
   - Download models in OBJ or GLTF format
   - If OBJ, convert to GLTF using Blender or online converter

3. NAME YOUR FILES:
   - Use lowercase with underscores
   - Example: modern_sofa.glb, eames_chair.glb
   - Place in public/models/

4. CREATE THUMBNAILS:
   - Take screenshot or render
   - Save as JPG or PNG
   - Name same as model: modern_sofa.jpg
   - Place in public/thumbnails/

5. UPDATE THIS FILE:
   - Add entry to customFree3DModels array above
   - Fill in all properties

6. IMPORT IN furnitureDatabase.js:
   - Add: import { customFree3DModels } from './customFree3DModels';
   - Merge: export const furnitureDatabase = [...existingItems, ...customFree3DModels];

7. TEST:
   - Run your app
   - Check if models appear in catalog
   - Click "Deploy to Room" to place in 3D view

DONE! 🎉
*/

export default customFree3DModels;
