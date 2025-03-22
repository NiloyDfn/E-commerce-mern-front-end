const fs = require('fs');
const path = require('path');

const filesToRename = {
    'Cartitems.tsx': 'CartItems.tsx',
    'protectedRoute.tsx': 'ProtectedRoute.tsx'
};

function renameFiles(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        
        if (fs.statSync(fullPath).isDirectory()) {
            renameFiles(fullPath);
        } else if (filesToRename[item]) {
            const newPath = path.join(dir, filesToRename[item]);
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed ${item} to ${filesToRename[item]}`);
        }
    });
}

// Start from the components directory
const componentsPath = path.join(__dirname, 'src', 'components');
renameFiles(componentsPath);

