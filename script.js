'use strict';

/**
 * RacketPro Web - Main Interaction Controller
 * Handles mobile navigation, smooth scrolling, and lead generation form logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile toggle button if it doesn't exist
    if (window.innerWidth < 768) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';
        toggleBtn.setAttribute('aria-label', 'Toggle Menu');
        
        navbar.querySelector('.container').appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggleBtn.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggleBtn.classList.remove('open');
            });
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Logic & Validation
 * Note: Integration with Supabase typically happens via the Supabase JS Client.
 * This implementation handles UI state and basic validation.
 */
function initContactForm() {
    const contactForm = document.getElementById('leads-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Selection validation
        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        
        // UI Feedback: Disable button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending Inquire...';

        try {
            // Placeholder for Supabase logic:
            // const { data, error } = await supabase.from('leads').insert([payload]);
            
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success State
            showFormMessage('Thank you! Our pro stringer will contact you shortly.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            showFormMessage('Something went wrong. Please try again or call us directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });

    function showFormMessage(message, type) {
        let msgElement = document.getElementById('form-response');
        if (!msgElement) {
            msgElement = document.createElement('div');
            msgElement.id = 'form-response';
            contactForm.appendChild(msgElement);
        }
        
        msgElement.className = `form-message ${type}`;
        msgElement.innerText = message;
        
        // Subtle fade in/out
        msgElement.style.opacity = '1';
        setTimeout(() => {
            msgElement.style.opacity = '0';
        }, 5000);
    }
}

/**
 * Intersection Observer for Reveal Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '