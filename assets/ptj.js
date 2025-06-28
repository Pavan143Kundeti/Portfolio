// ===== MODERN PORTFOLIO JAVASCRIPT =====

// DOM Elements
const body = document.body;
const loadingScreen = document.querySelector('.loading-screen');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// ===== NAVIGATION =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== THEME TOGGLE =====
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== SMOOTH SCROLLING =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = [
        'AI Engineer',
        'Data Scientist', 
        'Python Developer',
        'Java Developer',
        'Full Stack Developer',
        'Machine Learning Enthusiast',
        'Database Specialist',
        'Cloud Developer',
        'Web Developer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// ===== AOS INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill bars animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// ===== PROJECTS SLIDER =====
function initProjectsSlider() {
    const slider = document.querySelector('.projects-slider');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || cards.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    function updateSlider() {
        // Hide all cards
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Show current card
        cards[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize
    updateSlider();
}

// ===== CERTIFICATES SLIDER =====
document.addEventListener('DOMContentLoaded', function() {
    const certTrack = document.querySelector('.certificates-track');
    const certItems = document.querySelectorAll('.certificate-item');
    const prevBtn = document.getElementById('prev-certificate');
    const nextBtn = document.getElementById('next-certificate');
    const visibleCount = 2;
    let currentIndex = 0;
    
    function updateSlider() {
        // Calculate max index so last slide always shows the last certificate
        const maxIndex = Math.max(0, certItems.length - visibleCount);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        const offset = -(currentIndex * (certItems[0].offsetWidth + 30));
        certTrack.style.transform = `translateX(${offset}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }

    if (prevBtn && nextBtn && certTrack && certItems.length > visibleCount) {
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            updateSlider();
        });
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            updateSlider();
        });
        window.addEventListener('resize', updateSlider);
        updateSlider();
    } else if (certTrack) {
        // If 2 or fewer certificates, reset transform
        certTrack.style.transform = 'translateX(0)';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
    }
});

// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare email content
            const emailContent = `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
                
                ---
                This message was sent from your portfolio website.
            `;
            
            // Send email using EmailJS (you'll need to set this up)
            // For now, we'll use a simple mailto link as fallback
            const mailtoLink = `mailto:pavankumarkundeti237@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
            
            // Try to open email client
            window.open(mailtoLink);
            
            // Show success message
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== SCROLL TO TOP =====
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        if (scrollTop > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects slider
    initProjectsSlider();
    
    // Initialize certificates slider
    initCertificatesSlider();
    
    // Add scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        `;
        
        scrollToTopBtn.addEventListener('click', scrollToTop);
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-3px)';
            scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        });
        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
    
    console.log('Portfolio website loaded successfully!');
});
