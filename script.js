/* THEME LOGIC */
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
toggle.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
};

/* GALLERY & LIGHTBOX STUDIO */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const grayscale = document.getElementById("grayscale");

let images = [];
let currentIndex = 0;
let selectedImage = null;

function refreshImages() {
    // Collect all images from all visible folders
    images = Array.from(document.querySelectorAll(".category-group:not([style*='display: none']) .gallery-img"));
    
    images.forEach((img, index) => {
        img.onclick = () => openLightbox(index);
    });
}
refreshImages();

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    updateLightboxContent();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function updateLightboxContent() {
    selectedImage = images[currentIndex];
    lightboxImg.src = selectedImage.src;
    
    // Apply filters from the gallery image to the lightbox image
    lightboxImg.style.filter = selectedImage.style.filter || "none";
    
    // Reset sliders or you could parse current filters here
    // For simplicity, we reset them so the user starts fresh for each image
    resetSlidersToMatch();

    // Handle Button states (Boundary Logic)
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === images.length - 1);
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateLightboxContent();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxContent();
    }
}

/* FOLDER FILTERING */
function filterGallery(category) {
    const groups = document.querySelectorAll('.category-group');
    
    // Update active button state
    document.querySelectorAll('.filter-bar button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    groups.forEach(group => {
        if (category === 'all' || group.id === `sec-${category}`) {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
    
    refreshImages(); // Recalculate images for navigation based on visible folders
}

/* UPLOAD LOGIC */
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const uploadCategory = document.getElementById("uploadCategory");

uploadArea.onclick = () => fileInput.click();
fileInput.onchange = (e) => handleFiles(e.target.files);

function handleFiles(files) {
    for (let file of files) {
        if (!file.type.startsWith("image")) continue;
        const reader = new FileReader();
        reader.onload = e => createImageCard(e.target.result, uploadCategory.value);
        reader.readAsDataURL(file);
    }
}

function createImageCard(src, category) {
    const targetFolderSection = document.getElementById(`sec-${category}`);
    const targetGallery = document.getElementById(`gallery-${category}`);
    
    // Make folder visible if it was hidden
    targetFolderSection.style.display = "block";

    const card = document.createElement("div");
    card.className = `card ${category}`;
    card.innerHTML = `
        <img class="gallery-img" src="${src}">
        <div class="card-info">
            <h3 contenteditable="true">New Upload</h3>
        </div>
    `;
    
    targetGallery.prepend(card);
    refreshImages();
}

/* STUDIO EDITOR LOGIC */
[brightness, contrast, grayscale].forEach(slider => {
    slider.oninput = () => {
        if (selectedImage) {
            const filterStr = `brightness(${brightness.value}%) contrast(${contrast.value}%) grayscale(${grayscale.value}%)`;
            selectedImage.style.filter = filterStr;
            lightboxImg.style.filter = filterStr;
        }
    };
});

function resetFilters() {
    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;
    if (selectedImage) {
        selectedImage.style.filter = "none";
        lightboxImg.style.filter = "none";
    }
}

function resetSlidersToMatch() {
    // reset to defaults for UX clarity
    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;
}