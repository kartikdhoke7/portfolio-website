// Modern Portfolio JavaScript with Enhanced Animations

// Utility function for element animations
const animateElement = (element, animationClass, delay = 0) => {
    setTimeout(() => {
        element.classList.add(animationClass);
    }, delay);
};

// Enhanced Mobile menu toggle with animations
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add body class to prevent scrolling when menu is open
        document.body.classList.toggle('menu-open');
        
        // Animate menu items
        if (navMenu.classList.contains('active')) {
            const menuLinks = navMenu.querySelectorAll('.nav-link');
            menuLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}

// Close mobile menu when clicking on a link or outside
document.addEventListener('click', (e) => {
    if (!navMenu?.contains(e.target) && !mobileMenu?.contains(e.target)) {
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Enhanced smooth scrolling with offset calculation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced navbar effects with scroll progress
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrolled / scrollHeight;
    
    // Dynamic navbar styling based on scroll
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress indicator (if exists)
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress * 100}%`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add animation based on element type
            if (element.classList.contains('skill-category')) {
                animateElement(element, 'animate-slideInLeft');
            } else if (element.classList.contains('project-card')) {
                animateElement(element, 'animate-fadeInUp', Math.random() * 200);
            } else if (element.classList.contains('certification-card')) {
                animateElement(element, 'animate-slideInRight');
            } else {
                animateElement(element, 'animate-fadeInUp');
            }
            
            // Unobserve after animation
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .certification-card, .timeline-item'
    );
    animatedElements.forEach(el => observer.observe(el));
});

// Enhanced AJAX form submission with better UX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Add input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('form-status');
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Enhanced loading state with animation
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        formStatus.style.display = 'none';
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success animation
                btnText.textContent = 'Message Sent!';
                btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Thank you! Your message has been sent successfully. I'll get back to you soon!
                `;
                formStatus.style.display = 'block';
                formStatus.style.animation = 'fadeInUp 0.5s ease';
                
                // Reset form with animation
                setTimeout(() => {
                    this.reset();
                    inputs.forEach(input => {
                        input.parentElement.classList.remove('focused', 'has-value');
                    });
                    btnText.textContent = 'Send Message';
                    btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 4000);
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error handling with animation
            btnText.textContent = 'Try Again';
            btnIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            
            formStatus.className = 'form-status error';
            formStatus.innerHTML = `
                <i class="fas fa-times-circle"></i>
                Sorry, there was an error sending your message. Please try again or contact me directly.
            `;
            formStatus.style.display = 'block';
            formStatus.style.animation = 'fadeInUp 0.5s ease';
            
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                submitBtn.classList.remove('error');
            }, 3000);
        }
    });
}

// Enhanced animated counters with easing
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                // Easing function
                const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutExpo(progress);
                    const current = Math.floor(easedProgress * target);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Dynamic typing effect for hero title
const typingElement = document.querySelector('.highlight');
if (typingElement && typingElement.classList.contains('typing-text')) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.width = '0';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
};

// Initialize scroll progress indicator
createScrollProgress();

// Add custom cursor effect
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--secondary-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary-color)';
        });
    });
};

// Initialize custom cursor (only on desktop)
if (window.innerWidth > 768) {
    createCustomCursor();
}

console.log('🚀 Modern Portfolio loaded with enhanced animations and interactions!');
