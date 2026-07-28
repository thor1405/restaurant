const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /bg-\[#0a0a0a\]/g, replace: 'bg-[#FAFAFA]' },
  { search: /bg-\[#111111\]/g, replace: 'bg-[#F5F5F5]' },
  { search: /bg-\[#1C1C1C\]/g, replace: 'bg-white' },
  { search: /text-white(?!(\/[0-9]+))/g, replace: 'text-black' }, // Match exact text-white, not text-white/50
  { search: /text-white\/30/g, replace: 'text-black/30' },
  { search: /text-white\/40/g, replace: 'text-black/40' },
  { search: /text-white\/50/g, replace: 'text-black/50' },
  { search: /text-white\/60/g, replace: 'text-black/60' },
  { search: /text-white\/70/g, replace: 'text-black/70' },
  { search: /text-white\/80/g, replace: 'text-black/80' },
  { search: /text-white\/90/g, replace: 'text-black/90' },
  { search: /border-white\/5/g, replace: 'border-black/5' },
  { search: /border-white\/10/g, replace: 'border-black/10' },
  { search: /border-white\/20/g, replace: 'border-black/20' },
  { search: /bg-white\/5/g, replace: 'bg-black/5' },
  { search: /bg-white\/10/g, replace: 'bg-black/10' },
  { search: /bg-black\/50/g, replace: 'bg-transparent' }, // Used mostly for inputs
  { search: /hover:text-white/g, replace: 'hover:text-black' },
  { search: /placeholder:text-white\/40/g, replace: 'placeholder:text-black/40' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const rule of replacements) {
        if (rule.search.test(content)) {
          content = content.replace(rule.search, rule.replace);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Modified: ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
processDirectory(targetDir);
console.log('Done!');
