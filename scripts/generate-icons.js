import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a simple SVG icon programmatically
const createSVGIcon = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ecdc4;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="url(#bg)" stroke="white" stroke-width="2"/>
  
  <!-- Main icon elements -->
  <g transform="translate(${size*0.15}, ${size*0.15})">
    <!-- Plate -->
    <ellipse cx="${size*0.35}" cy="${size*0.55}" rx="${size*0.25}" ry="${size*0.08}" fill="white" opacity="0.9"/>
    
    <!-- Question mark -->
    <text x="${size*0.35}" y="${size*0.4}" 
          font-family="Arial, sans-serif" 
          font-size="${size*0.3}" 
          font-weight="bold" 
          text-anchor="middle" 
          fill="url(#accent)">?</text>
    
    <!-- Utensils -->
    <g stroke="white" stroke-width="${size*0.02}" fill="none" opacity="0.8">
      <!-- Fork -->
      <line x1="${size*0.15}" y1="${size*0.45}" x2="${size*0.15}" y2="${size*0.65}"/>
      <line x1="${size*0.13}" y1="${size*0.45}" x2="${size*0.13}" y2="${size*0.55}"/>
      <line x1="${size*0.17}" y1="${size*0.45}" x2="${size*0.17}" y2="${size*0.55}"/>
      
      <!-- Knife -->
      <line x1="${size*0.55}" y1="${size*0.45}" x2="${size*0.55}" y2="${size*0.65}"/>
      <line x1="${size*0.53}" y1="${size*0.45}" x2="${size*0.57}" y2="${size*0.49}"/>
    </g>
    
    <!-- Decorative sparkles -->
    <g fill="white" opacity="0.6">
      <circle cx="${size*0.2}" cy="${size*0.25}" r="${size*0.015}"/>
      <circle cx="${size*0.5}" cy="${size*0.2}" r="${size*0.02}"/>
      <circle cx="${size*0.1}" cy="${size*0.35}" r="${size*0.01}"/>
      <circle cx="${size*0.6}" cy="${size*0.35}" r="${size*0.015}"/>
    </g>
  </g>
</svg>`;
};

// Sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate SVG files for each size
sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filePath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Generated ${size}x${size} SVG icon`);
});

// Create a simple PNG fallback script
const createHTMLPreview = () => {
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>PWA Icons Preview</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f0f0f0; }
        .icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; }
        .icon-item { text-align: center; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .icon-item img { max-width: 100%; height: auto; border-radius: 8px; }
        .icon-item h3 { margin: 10px 0 5px 0; color: #333; }
        .icon-item p { margin: 0; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>🤷‍♀️ Unhelpful Meal Decider - PWA Icons</h1>
    <p>These are the generated icons for the Progressive Web App. Use these SVG files or convert them to PNG as needed.</p>
    
    <div class="icon-grid">
        ${sizes.map(size => `
        <div class="icon-item">
            <img src="icon-${size}x${size}.svg" alt="${size}x${size} icon">
            <h3>${size}x${size}</h3>
            <p>icon-${size}x${size}.svg</p>
        </div>
        `).join('')}
    </div>
    
    <h2>📱 Installation Instructions</h2>
    <p><strong>To convert SVG to PNG (if needed):</strong></p>
    <ol>
        <li>Use an online SVG to PNG converter</li>
        <li>Or use ImageMagick: <code>convert icon-192x192.svg icon-192x192.png</code></li>
        <li>Or use any image editor that supports SVG</li>
    </ol>
    
    <p><strong>Note:</strong> Modern browsers support SVG icons in PWA manifests, so PNG conversion is optional.</p>
    
    <h2>🎨 Icon Design</h2>
    <p>The icon features:</p>
    <ul>
        <li>Gradient background matching the app's theme (#667eea to #764ba2)</li>
        <li>Question mark symbolizing the "unhelpful" nature</li>
        <li>Plate and utensils for the food theme</li>
        <li>Decorative sparkles for visual appeal</li>
        <li>Clean, scalable vector design</li>
    </ul>
</body>
</html>`;
  
  const previewPath = path.join(iconsDir, 'preview.html');
  fs.writeFileSync(previewPath, html);
  console.log('Generated preview.html for icon preview');
};

createHTMLPreview();

console.log('\n✅ PWA icons generated successfully!');
console.log(`📁 Icons location: ${iconsDir}`);
console.log('🌐 Open preview.html to see all icons');
console.log('\n💡 Tip: You can use these SVG files directly, or convert them to PNG if needed.');
console.log('Modern browsers support SVG icons in PWA manifests.');

export { createSVGIcon, sizes }; 