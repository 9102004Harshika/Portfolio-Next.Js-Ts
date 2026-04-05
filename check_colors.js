const sharp = require('sharp');

async function analyze() {
  const image = sharp('public/assets/harshika.webp');
  const metadata = await image.metadata();
  console.log('Channels:', metadata.channels);
  console.log('Space:', metadata.space);
  
  // Get raw pixels
  const raw = await image.raw().toBuffer();
  
  let isGrayscale = true;
  // Sample pixels to see if R, G, B differ
  for (let i = 0; i < raw.length; i += metadata.channels) {
    if (metadata.channels >= 3) {
      if (raw[i] !== raw[i+1] || raw[i] !== raw[i+2]) {
        isGrayscale = false;
        break;
      }
    }
  }
  
  console.log('Is original image entirely grayscale?', isGrayscale);
}

analyze().catch(console.error);
