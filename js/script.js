// Ambil elemen-elemen yang diperlukan
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const contactItems = document.querySelectorAll('.contact-item');
const hobbyCards = document.querySelectorAll('.hobby-card');
const statNumbers = document.querySelectorAll('.stat .number');

// Mobile navigation toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup mobile menu saat klik nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dropdown di sidebar
if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener('click', function() {
        dropdownContent.classList.toggle('active');
        const arrow = this.querySelector('.arrow');
        
        if (arrow) {
            arrow.style.transform = dropdownContent.classList.contains('active')
                ? 'rotate(180deg)'
                : 'rotate(0deg)';
        }
    });
}

// Efek hover untuk kontak
contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Interaksi kartu hobi
hobbyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animasi counter angka
function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            const increment = target / 30;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 50);
        }
    });
}

// Observer untuk animasi scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animasi stats saat terlihat
            if (entry.target.classList.contains('profile-card')) {
                setTimeout(animateCounters, 500);
            }
            
            // Efek fade in
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Setup animasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // State awal untuk animasi
    const animatedElements = document.querySelectorAll('.info-card, .hobby-card, .profile-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navigasi keyboard
document.addEventListener('keydown', function(e) {
    // Tutup menu dengan ESC
    if (e.key === 'Escape') {
        // Tutup mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Tutup dropdown
        if (dropdownContent && dropdownContent.classList.contains('active')) {
            dropdownContent.classList.remove('active');
            const arrow = dropdownBtn.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    }
});

// Efek header saat scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});
