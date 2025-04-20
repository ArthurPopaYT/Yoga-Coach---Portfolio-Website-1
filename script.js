// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, service, message });
            
            // Show success message
            alert('Thank you for your message! Emma will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Mobile menu toggle functionality
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add button to header
        header.insertBefore(mobileMenuBtn, nav);
        
        // Add toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    };
    
    // Only create mobile menu on smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Handle resize events
    let mobileMenuCreated = window.innerWidth <= 768;
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !mobileMenuCreated) {
            createMobileMenu();
            mobileMenuCreated = true;
        }
    });
    
    // Add animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sections = document.querySelectorAll('section');
    
    const animateOnScroll = () => {
        // Animate service cards
        serviceCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate');
            }
        });
        
        // Add fade-in animation to sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (sectionTop < screenPosition) {
                section.classList.add('visible');
            }
        });
        
        // Parallax effect for hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const scrolled = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    };
    
    // Run animateOnScroll once on page load
    setTimeout(animateOnScroll, 100);
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Glowing effect on hover for some elements
    const addGlowEffects = () => {
        const glowElements = document.querySelectorAll('.btn, .service-icon, .social-icon');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.classList.add('glow');
            });
            
            element.addEventListener('mouseleave', function() {
                this.classList.remove('glow');
            });
        });
    };
    
    addGlowEffects();
    
    // Update copyright year dynamically
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2023', currentYear);
    }
    
    // Add animated typing effect to hero text
    const addTypingEffect = () => {
        const heroTitle = document.querySelector('.hero-content h2');
        
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.opacity = '1';
            
            let charIndex = 0;
            
            const typeText = () => {
                if (charIndex < text.length) {
                    heroTitle.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, 100);
                }
            };
            
            typeText();
        }
    };
    
    // Uncomment to enable typing effect
    // addTypingEffect();
}); 