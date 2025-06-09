document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded successfully');

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);
            mobileMenuButton.querySelector('i').classList.toggle('ri-menu-line', isHidden);
            mobileMenuButton.querySelector('i').classList.toggle('ri-close-line', !isHidden);
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('.nav-mobile-link, .quote-button-mobile').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.querySelector('i').classList.add('ri-menu-line');
                mobileMenuButton.querySelector('i').classList.remove('ri-close-line');
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                // Placeholder for API call
                // await fetch('/api/contact', { method: 'POST', body: formData });
                alert('Thank you for your message! We will respond as soon as possible.');
                contactForm.reset();
            } catch (error) {
                console.error('Contact form submission error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Quote Form Submission
    const quoteForm = document.getElementById('quote-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const termsCheckbox = document.getElementById('terms-checkbox');
            if (termsCheckbox && termsCheckbox.getAttribute('data-checked') !== 'true') {
                alert('Please agree to the Terms & Conditions and Privacy Policy.');
                termsCheckbox.focus();
                return;
            }
            const formData = new FormData(quoteForm);
            try {
                // Placeholder for API call
                // await fetch('/api/quote', { method: 'POST', body: formData });
                alert('Thank you for your inquiry! Our team will get back to you within 24 hours.');
                quoteForm.reset();
                document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
                    checkbox.setAttribute('data-checked', 'false');
                    checkbox.classList.remove('checked');
                });
                if (termsCheckbox) {
                    termsCheckbox.setAttribute('data-checked', 'false');
                    termsCheckbox.classList.remove('checked');
                }
            } catch (error) {
                console.error('Quote form submission error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // WhatsApp Button Hover Effect
    const whatsappButton = document.querySelector('.whatsapp-button');

    if (whatsappButton) {
        const tooltip = whatsappButton.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            whatsappButton.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            whatsappButton.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
            // Accessibility: Show tooltip on focus
            whatsappButton.addEventListener('focus', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            whatsappButton.addEventListener('blur', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    }

    // Testimonial Slider
    const slider = document.getElementById('testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slider && slides.length > 0) {
        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
                dot.setAttribute('aria-current', index === currentSlide);
            });
            prevButton?.setAttribute('aria-disabled', currentSlide === 0);
            nextButton?.setAttribute('aria-disabled', currentSlide === slides.length - 1);
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
                updateSlider();
            }, 5000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        prevButton?.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            }
        });

        nextButton?.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Pause auto-slide on hover or focus
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        slider.addEventListener('focusin', stopAutoSlide);
        slider.addEventListener('focusout', startAutoSlide);

        // Initialize slider
        updateSlider();
        startAutoSlide();
    }

    // Custom Checkbox Functionality
    const checkboxes = document.querySelectorAll('.custom-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const isChecked = checkbox.getAttribute('data-checked') === 'true';
            checkbox.setAttribute('data-checked', !isChecked);
            checkbox.classList.toggle('checked');
            checkbox.setAttribute('aria-checked', !isChecked);
        });

        // Keyboard accessibility
        checkbox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                checkbox.click();
            }
        });
    });

    // Dropdown Accessibility
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        const dropdown = button.nextElementSibling;
        if (!dropdown) return;

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            dropdown.style.display = isExpanded ? 'none' : 'block';
        });

        // Close dropdown on click outside
        document.addEventListener('click', (e) => {
            if (!button.contains(e.target) && !dropdown.contains(e.target)) {
                button.setAttribute('aria-expanded', 'false');
                dropdown.style.display = 'none';
            }
        });

        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

        document.querySelectorAll('.nav-mobile-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const expanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !expanded);
            });
        });

// Message Modal
const messageButton = document.getElementById('message-button');
const messageModal = document.getElementById('message-modal');
const closeModal = document.getElementById('close-modal');
const messageForm = document.getElementById('message-form');

if (messageButton && messageModal && closeModal) {
    messageButton.addEventListener('click', (e) => {
        e.preventDefault();
        messageModal.classList.remove('hidden');
        messageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        messageForm.querySelector('#message-name').focus();
    });

    closeModal.addEventListener('click', () => {
        messageModal.classList.add('hidden');
        messageModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });

    // Close modal on Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !messageModal.classList.contains('hidden')) {
            closeModal.click();
        }
    });

    // Close modal on outside click
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            closeModal.click();
        }
    });
}

if (messageForm) {
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedback = document.getElementById('message-feedback');
        feedback.textContent = '';
        feedback.classList.remove('error', 'success');

        try {
            const recaptchaToken = await grecaptcha.execute('your-recaptcha-site-key', { action: 'contact' });
            const formData = {
                name: messageForm.querySelector('#message-name').value,
                phone: messageForm.querySelector('#message-phone').value,
                email: messageForm.querySelector('#message-email').value,
                message: messageForm.querySelector('#message-text').value,
                recaptchaToken,
            };

            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                feedback.textContent = data.message;
                feedback.classList.add('success');
                messageForm.reset();
                setTimeout(() => closeModal.click(), 2000); // Auto-close after 2s
            } else {
                feedback.textContent = data.error || 'Failed to send message';
                feedback.classList.add('error');
            }
        } catch (error) {
            feedback.textContent = 'An error occurred. Please try again.';
            feedback.classList.add('error');
        }
    });
}





});