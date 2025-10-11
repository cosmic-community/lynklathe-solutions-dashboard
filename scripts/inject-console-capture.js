const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      console.log(`✓ Script already present in ${filePath}`);
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${SCRIPT_TAG}\n  </head>`);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Injected console capture into ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

function findHtmlFiles(dir) {
  const files = [];
  
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

const outDir = path.join(process.cwd(), '.next');
if (fs.existsSync(outDir)) {
  console.log('Injecting console capture script into build...');
  const htmlFiles = findHtmlFiles(outDir);
  htmlFiles.forEach(injectScript);
  console.log(`Processed ${htmlFiles.length} files`);
} else {
  console.log('Build directory not found. Run build first.');
}