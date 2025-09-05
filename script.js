// Portfolio JavaScript - Basic functionality with AJAX form submission

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// AJAX form submission to prevent redirect
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const formStatus = document.getElementById('form-status');
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';
        
        try {
            // Get form data
            const formData = new FormData(this);
            
            // Submit to Formspree using fetch
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show success message on same page
                btnText.textContent = 'Message Sent!';
                btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Thank you! Your message has been sent successfully. I'll get back to you soon!
                `;
                formStatus.style.display = 'block';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    btnText.textContent = 'Send Message';
                    btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    formStatus.style.display = 'none';
                }, 4000);
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error handling
            btnText.textContent = 'Try Again';
            btnIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            
            formStatus.className = 'form-status error';
            formStatus.innerHTML = `
                <i class="fas fa-times-circle"></i>
                Sorry, there was an error sending your message. Please try again or contact me directly.
            `;
            formStatus.style.display = 'block';
            
            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Animated counters
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);
                const increment = target / 200;

                if (count < target) {
                    const timer = setInterval(() => {
                        const current = parseInt(counter.innerText);
                        if (current < target) {
                            counter.innerText = Math.ceil(current + increment);
                        } else {
                            counter.innerText = target + (target === 87 ? '%' : '+');
                            clearInterval(timer);
                        }
                    }, 10);
                }
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

console.log('✅ Portfolio loaded with AJAX form submission!');
