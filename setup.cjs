const fs = require('fs');
const path = require('path');

// Directories to create
const directories = [
    'src/assets/images',
    'src/components/common',
    'src/components/auth',
    'src/components/recipe',
    'src/components/favorites',
    'src/pages',
    'src/services',
    'src/hooks',
    'src/context',
    'src/types',
    'src/utils',
    'src/styles',
    'src/routes'
];

// Files to create
const files = [
    // Common Components
    'src/components/common/Header.tsx',
    'src/components/common/Footer.tsx',
    'src/components/common/Button.tsx',
    'src/components/common/Loader.tsx',
    
    // Auth Components
    'src/components/auth/LoginForm.tsx',
    'src/components/auth/AuthPopup.tsx',
    
    // Recipe Components
    'src/components/recipe/RecipeCard.tsx',
    'src/components/recipe/RecipeGrid.tsx',
    'src/components/recipe/RecipeDetailModal.tsx',
    'src/components/recipe/CategoryFilter.tsx',
    'src/components/recipe/HeroSection.tsx',
    
    // Favorites Components
    'src/components/favorites/FavoritesList.tsx',
    
    // Pages
    'src/pages/HomePage.tsx',
    'src/pages/LoginPage.tsx',
    'src/pages/FavoritesPage.tsx',
    'src/pages/RecipeDetailPage.tsx',
    
    // Services
    'src/services/api.ts',
    'src/services/authService.ts',
    'src/services/recipeService.ts',
    
    // Hooks
    'src/hooks/useAuth.ts',
    'src/hooks/useRecipes.ts',
    'src/hooks/useFavorites.ts',
    
    // Context
    'src/context/AuthContext.tsx',
    
    // Types
    'src/types/recipe.ts',
    'src/types/user.ts',
    'src/types/api.ts',
    
    // Utils
    'src/utils/helpers.ts',
    'src/utils/constants.ts',
    
    // Routes
    'src/routes/AppRoutes.tsx',
    'src/routes/ProtectedRoute.tsx',
    
    // Environment files
    '.env.example'
];

// Create directories
console.log('Creating directories...\n');
directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✓ Created: ${dir}`);
    } else {
        console.log(`⚠ Exists: ${dir}`);
    }
});

// Create files
console.log('\nCreating files...\n');
files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log(`✓ Created: ${file}`);
    } else {
        console.log(`⚠ Exists: ${file}`);
    }
});

console.log('\n✨ Folder structure created successfully!\n');