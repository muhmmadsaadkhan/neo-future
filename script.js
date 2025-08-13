
document.addEventListener('DOMContentLoaded', function() {
  
    initNavigation();
    initScrollAnimations();
    initTimeline();
    initParticleBackground();
    initParallaxEffects();
    initContactForm();
    initFloatingElements();
    initQuantumAnimations();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

  
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

   
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}


function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));


    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.style.animationDelay = `${index * 0.2}s`;
        header.classList.add('fade-in');
    });
}


function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                
                const year = entry.target.getAttribute('data-year');
                if (year) {
                    entry.target.querySelector('.timeline-content').insertAdjacentHTML('beforebegin', 
                        `<div class="year-indicator">${year}</div>`
                    );
                }
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initParticleBackground() {
    const particlesBg = document.getElementById('particles-bg');
    const particleCount = 50;
    

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesBg);
    }

 
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });


    function animateParticles() {
        const particles = particlesBg.querySelectorAll('.particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.dataset.speed);
            const x = parseFloat(particle.dataset.x);
            const y = parseFloat(particle.dataset.y);
            
        
            particle.style.transform = `translate(${x}px, ${y}px)`;
            
            
            particle.dataset.x = x + speed;
            particle.dataset.y = y + speed * 0.5;
            
           
            if (x > window.innerWidth || y > window.innerHeight) {
                particle.dataset.x = -10;
                particle.dataset.y = Math.random() * window.innerHeight;
            }
   
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.style.opacity = '0.8';
                particle.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
            } else {
                particle.style.opacity = '0.3';
                particle.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const speed = Math.random() * 0.5 + 0.1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#00d4ff' : '#b400ff'};
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        transition: all 0.3s ease;
    `;
    
    particle.dataset.speed = speed;
    particle.dataset.x = x;
    particle.dataset.y = y;
    
    container.appendChild(particle);
}


function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-icon, .quantum-sphere');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}


function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    
        
        icon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
}


function initQuantumAnimations() {
    const quantumSphere = document.querySelector('.quantum-sphere');
    if (!quantumSphere) return;
    
 
    for (let i = 0; i < 8; i++) {
        createQuantumParticle(quantumSphere, i);
    }
    
    
    quantumSphere.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
      
        createExplosionEffect(this);
    });
}

function createQuantumParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'quantum-particle';
    
    const angle = (index / 8) * Math.PI * 2;
    const radius = 120 + Math.random() * 30;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #b400ff;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: quantumOrbit 8s linear infinite;
        animation-delay: ${index * 0.5}s;
    `;
    
    container.appendChild(particle);
}

function createExplosionEffect(container) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: explosion 1s ease-out forwards;
        `;
        
        container.appendChild(particle);
        
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
  
        showNotification('Message sent successfully!', 'success');
        this.reset();
        
      
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = 'var(--gradient-purple)';
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Send Message';
            submitBtn.style.background = 'var(--gradient-blue)';
        }, 3000);
    });
    
  
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-blue)' : 'var(--accent-purple)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Performance optimizations
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
   
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
         
        }, 250);
    });
}


optimizePerformance();


const style = document.createElement('style');
style.textContent = `
    @keyframes quantumOrbit {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
        }
    }
    
    @keyframes explosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) translate(var(--x), var(--y));
            opacity: 0;
        }
    }
    
    .fade-in {
        animation: fadeInUp 1s ease forwards;
    }
    
    .year-indicator {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient-blue);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: var(--glow-blue);
        animation: fadeInDown 0.6s ease forwards;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    .notification {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 500;
    }
    
    .notification i {
        font-size: 18px;
    }
`;

document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading screen if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-mixed);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = currentSection.nextElementSibling;
        
        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = currentSection.previousElementSibling;
        
        if (prevSection && prevSection.classList.contains('section')) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    
    return sections[0];
}

// Add touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - go to next section
            const currentSection = getCurrentSection();
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection && nextSection.classList.contains('section')) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Swipe down - go to previous section
            const currentSection = getCurrentSection();
            const prevSection = currentSection.previousElementSibling;
            
            if (prevSection && prevSection.classList.contains('section')) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

console.log('NeoFuture Tech Trends Hub - JavaScript loaded successfully! 🚀');
