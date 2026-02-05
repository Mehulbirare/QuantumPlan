# 🪑 Free 3D Furniture Models Guide

This guide lists the best **FREE** 3D furniture models you can download from [Free3D.com](https://free3d.com) for your floor plan application.

## 📦 Recommended Models from Free3D

### 🛋️ Living Room Furniture

#### 1. **Modern Leather Sofa**
- **URL**: Search "modern sofa" on https://free3d.com/3d-models/sofa
- **Formats**: OBJ, FBX, 3DS
- **License**: Free for personal/commercial use
- **Why**: High-quality textures, realistic proportions
- **Dimensions**: ~200cm x 90cm x 80cm

#### 2. **Eames Lounge Chair & Ottoman**
- **URL**: Search "eames chair" on Free3D
- **Formats**: OBJ, MAX, FBX
- **License**: Free
- **Why**: Iconic mid-century modern design
- **Dimensions**: ~84cm x 85cm x 86cm

#### 3. **Scandinavian Coffee Table**
- **URL**: Search "coffee table wood" on Free3D
- **Formats**: OBJ, FBX, GLTF/GLB (best for web)
- **License**: Free
- **Why**: Low-poly, perfect for web rendering
- **Dimensions**: ~120cm x 60cm x 45cm

#### 4. **TV Stand / Media Console**
- **URL**: https://free3d.com/3d-models/tv-stand
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Essential for modern living rooms
- **Dimensions**: ~180cm x 50cm x 60cm

### 🍽️ Dining Room Furniture

#### 5. **Minimalist Dining Table & Chairs Set**
- **URL**: https://free3d.com/3d-models/dining-table
- **Formats**: OBJ, FBX, 3DS
- **License**: Free
- **Why**: Complete set, low-poly
- **Dimensions**: Table 180cm x 90cm, Chairs 45cm x 45cm

#### 6. **Modern Dining Chair (Single)**
- **URL**: Search "dining chair modern" on Free3D
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Can be duplicated to create custom sets
- **Dimensions**: ~45cm x 45cm x 90cm

### 🛏️ Bedroom Furniture

#### 7. **King Size Bed with Headboard**
- **URL**: https://free3d.com/3d-models/bed
- **Formats**: OBJ, FBX, MAX
- **License**: Free
- **Why**: Detailed with pillows and duvet
- **Dimensions**: ~200cm x 180cm x 120cm

#### 8. **Nightstand / Bedside Table**
- **URL**: Search "nightstand" on Free3D
- **Formats**: OBJ, 3DS, FBX
- **License**: Free
- **Why**: Essential bedroom accessory
- **Dimensions**: ~50cm x 40cm x 60cm

#### 9. **Contemporary Wardrobe**
- **URL**: https://free3d.com/3d-models/wardrobe
- **Formats**: OBJ, FBX, 3DS
- **License**: Free
- **Why**: Large piece that defines room scale
- **Dimensions**: ~200cm x 60cm x 220cm

### 🖥️ Office Furniture

#### 10. **Ergonomic Office Chair**
- **URL**: https://free3d.com/3d-models/office-chair
- **Format**: OBJ, FBX
- **License**: Free
- **Why**: Complex geometry, good test model
- **Dimensions**: ~60cm x 60cm x 120cm

#### 11. **Modern Office Desk**
- **URL**: Search "office desk" on Free3D
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Essential for home office layouts
- **Dimensions**: ~140cm x 70cm x 75cm

### 🗄️ Storage & Shelving

#### 12. **Wall-Mounted Bookshelf**
- **URL**: Search "bookshelf" on Free3D
- **Formats**: OBJ, FBX, 3DS
- **License**: Free
- **Why**: Shows wall interaction
- **Dimensions**: ~180cm x 30cm x 200cm

#### 13. **Kitchen Cabinet Set**
- **URL**: https://free3d.com/3d-models/kitchen-cabinet
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Modular, can be repeated
- **Dimensions**: Various (60cm, 80cm, 100cm widths)

### 💡 Lighting & Decor

#### 14. **Floor Lamp (Modern/Industrial)**
- **URL**: Search "floor lamp" on Free3D
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Adds vertical dimension
- **Dimensions**: ~40cm diameter, 180cm height

#### 15. **Table Lamp**
- **URL**: https://free3d.com/3d-models/lamp
- **Formats**: OBJ, FBX
- **License**: Free
- **Why**: Small decorative detail
- **Dimensions**: ~30cm x 30cm x 50cm

---

## 🔧 How to Download & Use

### Step 1: Download Models
1. Visit https://free3d.com
2. Search for the furniture type (e.g., "modern sofa")
3. Click on a model you like
4. Click **"Download"** button
5. Choose **OBJ** or **GLTF/GLB** format (best for web)
6. Extract the ZIP file

### Step 2: Convert to GLTF (if needed)
If you downloaded OBJ/FBX, convert to GLTF using:
- **Online**: https://products.aspose.app/3d/conversion/obj-to-gltf
- **Desktop**: Blender (File > Export > glTF 2.0)

### Step 3: Add to Your Project
```bash
# Create a models directory
mkdir public/models

# Place your .glb files here
public/models/
  ├── sofa.glb
  ├── chair.glb
  ├── table.glb
  └── ...
```

### Step 4: Update Furniture Database
Edit `src/data/furnitureDatabase.js` and add:

```javascript
{
    id: 'custom_sofa_1',
    name: 'Modern Leather Sofa',
    category: 'living',
    subcategory: 'Seating',
    modelPath: '/models/sofa.glb',  // Your downloaded model
    thumbnail: '/thumbnails/sofa.jpg',
    dimensions: { width: 200, depth: 90, height: 80 },
    price: 0,  // Free model
    style: ['Modern', 'Contemporary'],
    color: '#4a5568'
}
```

---

## 🎨 Best Practices

### File Formats
- ✅ **GLTF/GLB**: Best for web, highly optimized
- ✅ **OBJ**: Universal, easy to import
- ⚠️ **FBX**: Good quality but needs conversion
- ❌ **MAX/BLEND**: Needs Blender to convert

### Performance Tips
1. **Optimize models**: Use low-poly versions (<10k triangles)
2. **Compress textures**: Resize to 1024x1024 or 512x512
3. **Use GLB format**: Includes textures in one file
4. **Lazy load**: Only load models when needed

### File Size Guidelines
- Small items (lamps, chairs): < 1 MB
- Medium items (tables, sofas): 1-3 MB
- Large items (beds, wardrobes): 3-7 MB

---

## 🆓 License Information

Most models on Free3D are:
- ✅ Free for personal use
- ✅ Free for commercial use (check individual model)
- ❌ Cannot redistribute the models themselves
- ✅ Can use in your app/renders

**Always check the specific license on each model's page!**

---

## 🔗 Additional Resources

### More Free 3D Model Sites
- **Sketchfab**: https://sketchfab.com/feed (Some free models)
- **TurboSquid Free**: https://www.turbosquid.com/Search/3D-Models/free
- **CGTrader Free**: https://www.cgtrader.com/free-3d-models
- **Poly Haven**: https://polyhaven.com/models (CC0 License)

### Tools for 3D Models
- **Blender** (Free): Edit, optimize, convert models
- **Online GLTF Viewer**: https://gltf-viewer.donmccurdy.com/
- **Three.js Editor**: https://threejs.org/editor/

---

## 📝 Quick Start Checklist

- [ ] Visit Free3D.com
- [ ] Download 5-10 models (start with sofa, chair, table, bed)
- [ ] Convert to GLTF if needed
- [ ] Create `public/models` folder
- [ ] Add models to folder
- [ ] Update furniture database
- [ ] Test in 3D viewer
- [ ] Optimize if slow

---

## 💡 Pro Tips

1. **Start Small**: Download 5 models first, test the workflow
2. **Consistent Scale**: Free3D models may have different scales, normalize in Blender
3. **Name Consistently**: Use lowercase, underscores: `modern_sofa_1.glb`
4. **Create Thumbnails**: Take screenshots for catalog
5. **Document Sources**: Keep a list of where each model came from

---

**Ready to add amazing 3D furniture to your floor plan app! 🚀**
