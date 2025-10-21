<h1 align="left">🍽️ Cookpal - Recipe Discovery App</h1>
<p align="left"> <b>Cookpal is a modern, responsive recipe discovery application built with React, TypeScript, and Vite. It leverages <a href="https://www.themealdb.com/api.php">TheMealDB API</a> to provide users with a vast collection of recipes from various cuisines and categories.</b> </p>
<h2 align="left">✨ Key Highlights</h2>
<ul align="left"> <li>🎨 <b>Beautiful UI/UX</b> - Modern gradient designs with smooth animations using Framer Motion</li> <li>📱 <b>Fully Responsive</b> - Works seamlessly on desktop, tablet, and mobile devices</li> <li>🔍 <b>Smart Search</b> - Browse recipes by categories or search by name</li> <li>❤️ <b>Favorites System</b> - Save your favorite recipes (authentication required)</li> <li>🎬 <b>Video Tutorials</b> - Direct links to YouTube cooking tutorials</li> <li>🎪 <b>Hero Slideshow</b> - Trending recipes carousel with swipe support</li> <li>🌈 <b>Dynamic Categories</b> - 14+ colorful category filters</li> </ul>
<h2 align="left">🚀 Features</h2>
<ul align="left"> <li>🏠 <b>Home Page</b> <ul> <li>Hero section with auto-sliding recipe carousel</li> <li>Category-based filtering with vibrant colored badges</li> <li>Grid layout displaying recipe cards with images</li> <li>Smooth animations and hover effects</li> </ul> </li> <li>📄 <b>Recipe Detail Page</b> <ul> <li>High-quality recipe images</li> <li>Complete ingredient list with measurements</li> <li>Step-by-step cooking instructions</li> <li>Video tutorial links</li> <li>Nutrition information</li> <li>Servings, prep time, and difficulty ratings</li> <li>Share functionality</li> </ul> </li> <li>🔐 <b>Authentication</b> <ul> <li>Beautiful login/register pages</li> <li>Social login integration (Google, Facebook)</li> <li>Form validation with error handling</li> <li>Password visibility toggle</li> </ul> </li> <li>💝 <b>Favorites (Coming Soon)</b> <ul> <li>Save recipes to your personal collection</li> <li>Quick access to saved recipes</li> <li>Remove from favorites option</li> </ul> </li> </ul>
<h2 align="left">🛠️ Tech Stack</h2>
<ul align="left"> <li><b>Core</b> <ul> <li>React 19.1.1 - UI library</li> <li>TypeScript 5.9.3 - Type safety</li> <li>Vite 7.1.7 - Build tool & dev server</li> </ul> </li> <li><b>Styling & Animation</b> <ul> <li>TailwindCSS 3.4.18 - Utility-first CSS</li> <li>Framer Motion 12.23.24 - Smooth animations</li> <li>Lucide React 0.545.0 - Beautiful icons</li> </ul> </li> <li><b>Routing & State</b> <ul> <li>React Router DOM 7.9.4 - Client-side routing</li> <li>Axios 1.12.2 - HTTP client</li> </ul> </li> <li><b>Data Visualization</b> <ul> <li>Recharts 3.2.1 - Charts for analytics</li> </ul> </li> </ul>
<h2 align="left">📦 Installation</h2>
<ul align="left"> <li><b>Prerequisites</b> <ul> <li>Node.js (v20.19.0 or higher recommended)</li> <li>npm or yarn package manager</li> </ul> </li> <li><b>Steps</b> <ol> <li>Clone the repository <pre> git clone https://github.com/yourusername/cookpal-frontend.git cd cookpal-frontend </pre> </li> <li>Install dependencies <pre> npm install # or yarn install </pre> </li> <li>Set up environment variables (optional) <pre> cp .env.example .env </pre> </li> <li>Start the development server <pre> npm run dev # or yarn dev </pre> </li> <li>Open your browser <pre> http://localhost:5173 </pre> </li> </ol> </li> </ul>
<h2 align="left">⚙️ Environment Variables</h2>
<pre> # Backend API URL (when backend is ready) VITE_BACKEND_API_URL=http://localhost:5000/api # Other configurations VITE_APP_NAME=Cookpal </pre> <p align="left"><b>Note:</b> The app currently uses TheMealDB public API and doesn't require backend setup for basic functionality.</p>
<h2 align="left">📜 Available Scripts</h2>
<table> <tr> <th>Script</th> <th>Description</th> </tr> <tr> <td>npm run dev</td> <td>Start development server</td> </tr> <tr> <td>npm run build</td> <td>Build for production</td> </tr> <tr> <td>npm run lint</td> <td>Run ESLint</td> </tr> <tr> <td>npm run preview</td> <td>Preview production build</td> </tr> </table>
<h2 align="left">🗂️ Project Structure</h2>

```
src/ ├── assets/ # Images, icons, static files ├── components/ # Reusable UI components │ ├── common/ # Header, Footer, Loader, etc. │ ├── recipe/ # Recipe-related components │ └── auth/ # Authentication components ├── pages/ # Page components │ ├── HomePage.tsx │ ├── RecipeDetailPage.tsx │ ├── LoginPage.tsx │ └── RegisterPage.tsx ├── services/ # API service functions ├── types/ # TypeScript type definitions ├── utils/ # Helper functions & constants ├── App.tsx # Main app component └── main.tsx # App entry point 
```

<h2 align="left">🎨 Design Features</h2>
<ul align="left"> <li><b>Color Palette</b> <ul> <li>Primary Orange: #f97316 - Warm and appetizing</li> <li>Primary Green: #22c55e - Fresh and healthy</li> <li>Accent Red: #ef4444 - Energy and passion</li> <li>Gradients: Multi-color smooth transitions</li> </ul> </li> <li><b>Animations</b> <ul> <li>✨ Smooth page transitions</li> <li>🎭 Card hover effects</li> <li>📍 Tab switching animations</li> <li>🎪 Hero carousel with swipe gestures</li> </ul> </li> </ul>
<h2 align="left">📱 Responsive Design</h2>
<ul align="left"> <li>📱 Mobile devices (320px - 767px)</li> <li>📲 Tablets (768px - 1023px)</li> <li>💻 Desktop (1024px+)</li> <li>🖥️ Large screens (1920px+)</li> </ul>
<br/>
<br/>
<img width="453" height="678" alt="login" src="https://github.com/user-attachments/assets/cb787b9a-9433-48ac-a12d-0d40dbd59062" />
<br/>
<br/>
<img width="444" height="795" alt="registration" src="https://github.com/user-attachments/assets/524803f9-1852-42a9-b0f2-f3c65f517386" />
<br/>
<br/>
<img width="536" height="864" alt="landing page" src="https://github.com/user-attachments/assets/991ca9e2-bb65-462b-a513-ce3f8267243c" />
<br/>
<br/>
<img width="526" height="861" alt="popup" src="https://github.com/user-attachments/assets/02b5ded5-afde-4f6a-98d7-23d016d8bd79" />
