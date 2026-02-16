// Reveal Animation on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Theme Toggle Functionality
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.onclick = () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("ghina-portfolio-theme", isLight ? "light" : "dark");
};

// Check for saved theme
if (localStorage.getItem("ghina-portfolio-theme") === "light") {
    document.body.classList.add("light");
}

// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});