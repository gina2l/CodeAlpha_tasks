# Modern Image Gallery Studio 📸

Developed as part of my  Development Internship at CodeAlpha, this project is a fully functional, responsive image gallery with advanced user interaction features. It moves beyond a simple display by incorporating a "Studio Mode" for image editing and a dynamic masonry layout.

🚀 Features

- asonry Layout: Organized images into clean, responsive "Albums" (Nature, City, Architecture).
- Dynamic Uploads: Drag-and-drop or browse local files to instantly add images to specific categories.
- Integrated Image Studio: A custom-built lightbox that allows users to edit Brightness, Contrast, and Grayscale** in real-time.
- Category Filtering: Filter through albums using a smooth UI without reloading the page.
- Boundary-Aware Navigation: Smart Lightbox navigation that disables arrows when you reach the first or last image of a collection.
- Chic Dual Themes: A high-contrast Midnight Dark mode and a sophisticated Steel-Gray Light mode.
- Editable Metadata: Click directly on image titles to rename them on the fly using "contenteditable".

 🛠️ Technologies Used

- HTML5: Semantic structure and "contenteditable" attributes.
- CSS3: Custom properties (variables), Glassmorphism, Bento-grid layouts, and complex CSS filters.
- JavaScript (ES6+):
    - DOM Manipulation: For real-time gallery updates.
    - File API: To handle local image uploads and "FileReader" objects.
    - Intersection Observer: For "Reveal on Scroll" animations.
    - Event Listeners: For theme toggling and lightbox navigation.

📂 Project Structure

```text
├── images/             # Local image assets (1.jpeg, 7.jpeg, 12.jpeg, etc.)
├── index.html          # Main gallery structure
├── style.css           # Professional styling and theme variables
└── script.js           # Core logic for uploads, filtering, and editing