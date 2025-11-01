const fs = require('fs');
const puppeteer = require('puppeteer');

async function generatePNG() {
  try {
    // Read the SVG content
    const svgContent = fs.readFileSync('system_flowchart.svg', 'utf8');
    
    // Create HTML wrapper
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    svg {
      display: block;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);
    await page.setViewport({ width: 1200, height: 3200 });
    
    await page.screenshot({
      path: 'system_flowchart.png',
      fullPage: true,
      type: 'png'
    });
    
    await browser.close();
    console.log('PNG flowchart saved as system_flowchart.png');
  } catch (error) {
    console.error('Error generating PNG:', error.message);
    console.log('Note: Install puppeteer with: npm install puppeteer');
    console.log('SVG file is available at system_flowchart.svg');
  }
}

generatePNG();

