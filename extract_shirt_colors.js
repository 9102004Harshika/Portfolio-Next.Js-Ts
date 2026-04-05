const sharp = require('sharp');

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if(max === min){
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l]; // h, s, l are in [0, 1]
}

async function analyze() {
  const image = sharp('public/assets/harshika.webp');
  const metadata = await image.metadata();
  const raw = await image.raw().toBuffer();
  
  // We'll look at the bottom 40% of the image (shirt)
  const startY = Math.floor(metadata.height * 0.6);
  let hueCounts = new Array(36).fill(0); // 10 degree buckets
  
  for (let y = startY; y < metadata.height; y++) {
    for (let x = 0; x < metadata.width; x++) {
      const idx = (y * metadata.width + x) * metadata.channels;
      const r = raw[idx];
      const g = raw[idx+1];
      const b = raw[idx+2];
      
      const [h, s, l] = rgbToHsl(r, g, b);
      
      // ignore white/black/gray
      if (s > 0.15 && l > 0.15 && l < 0.85) {
        let hDeg = h * 360;
        // Ignore skin tones roughly (mostly hue 0-35 or 340-360) 
        // Wait, what if the shirt overlaps? We just want to find any peaks outside skin tones.
        let bucket = Math.floor(hDeg / 10) % 36;
        hueCounts[bucket]++;
      }
    }
  }
  
  let maxCount = 0;
  let maxBucket = -1;
  console.log("Hue buckets (10 degree intervals):");
  for (let i = 0; i < 36; i++) {
     if (hueCounts[i] > maxCount) {
         // skip skin-like buckets (0-3, 34-35)
         if (i > 3 && i < 34) {
             maxCount = hueCounts[i];
             maxBucket = i;
         }
     }
     if (hueCounts[i] > 1000) {
         console.log(`Bucket ${i*10}-${(i+1)*10}: ${hueCounts[i]} pixels (potential flower color)`);
     }
  }
}

analyze().catch(console.error);
