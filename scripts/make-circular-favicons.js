const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48];
const publicDir = path.join(__dirname, '..', 'public');

async function makeCircularFavicon(size) {
  const inputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
  const tempPath = path.join(publicDir, `favicon-${size}x${size}.tmp.png`);
  
  // Create a circular mask
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
    </svg>`
  );

  try {
    // Write to temporary file first
    await sharp(inputPath)
      .resize(size, size)
      .composite([{
        input: mask,
        blend: 'dest-in'
      }])
      .png()
      .toFile(tempPath);
    
    // Replace original with circular version
    fs.renameSync(tempPath, inputPath);
    
    console.log(`✓ Created circular favicon-${size}x${size}.png`);
  } catch (error) {
    console.error(`✗ Error processing favicon-${size}x${size}.png:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function processAll() {
  console.log('Making favicons circular...\n');
  
  for (const size of sizes) {
    await makeCircularFavicon(size);
  }
  
  console.log('\nDone!');
}

processAll().catch(console.error);
