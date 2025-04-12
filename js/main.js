// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
});

// Update scroll spy functionality
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get the current scroll position with a buffer
    const currentPos = window.scrollY + 150;
    
    // Find the current section
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentPos >= sectionTop && currentPos < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);

// Update active state on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to target
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize active state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});

// Add scroll reveal animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-up');
    observer.observe(section);
});

// Animate project cards with delay
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-up');
    observer.observe(card);
});

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const subtitle = document.querySelector('#greeting');
    if (subtitle) {
        typeWriter(subtitle, "I am");
    }
});

// Smooth state updates for form inputs
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Handle image loading animations
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Add hover effect for cards
const cards = document.querySelectorAll('.project-card, .education-card, .experience-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    });
});

// Scroll reveal functionality
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to elements
document.querySelectorAll('.project-card, .education-card, .experience-card, .skill-category').forEach(el => {
    el.classList.add('reveal');
});

// Initialize reveal on page load
reveal();

// Add letter-by-letter animation to section titles
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        [...text].forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter;
            if (letter === ' ') {
                span.innerHTML = '&nbsp;';
                span.style.marginRight = '0.25em';
            }
            span.style.setProperty('--letter-index', i);
            title.appendChild(span);
        });
    });
});

// Add text scramble effect to headings
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-text">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Add animated background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Ensure project cards are visible and animated
window.addEventListener('DOMContentLoaded', () => {
    // Set animation delays for project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    // Force project section to be visible
    setTimeout(() => {
        const projectsSection = document.getElementById('work');
        if (projectsSection) {
            projectsSection.style.opacity = '1';
            projectsSection.style.visibility = 'visible';
            
            const projectCards = projectsSection.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            });
        }
    }, 500);
});

// Add more dynamic text effects
function applyTextEffects() {
    // Apply floating effect to skill categories
    document.querySelectorAll('.skill-category').forEach(element => {
        element.classList.add('float-element');
    });
    
    // Apply reveal text effect to project titles
    document.querySelectorAll('.project-card h3').forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.classList.add('reveal-text');
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--char-index', i);
            title.appendChild(span);
        });
    });
    
    // Apply glitch effect to section subtitles
    document.querySelectorAll('.contact-subtitle, .education-field, .company-name').forEach(element => {
        const text = element.textContent;
        element.classList.add('glitch-text');
        element.setAttribute('data-text', text);
    });
    
    // Apply dynamic text effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero h2');
    if (heroSubtitle) {
        heroSubtitle.classList.add('dynamic-text');
    }
}

// Apply text wave effect
function createTextWave() {
    const texts = document.querySelectorAll('.hero-description, .about-text p');
    
    texts.forEach(text => {
        const words = text.textContent.split(' ');
        text.textContent = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.animationDelay = `${index * 0.05}s`;
            wordSpan.classList.add('wave-word');
            text.appendChild(wordSpan);
        });
    });
}

// Initialize all text effects
window.addEventListener('DOMContentLoaded', () => {
    applyTextEffects();
    createTextWave();
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
});

// Add 3D tilt effect to cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .education-card, .experience-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

addTiltEffect();

// Add interactive random character effect to the name at home page
function addNameTypingEffect() {
    const nameElement = document.querySelector('#name-effect');
    if (!nameElement) return;
    
    const originalName = nameElement.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let iteration = 0;
    let interval = null;
    
    // Clear the name element
    nameElement.innerHTML = '';
    
    // Force visibility
    nameElement.style.opacity = '1';
    nameElement.style.visibility = 'visible';
    nameElement.style.display = 'block';
    
    // Create a wrapper for the effect
    const nameWrapper = document.createElement('span');
    nameWrapper.className = 'name-typing-effect';
    nameElement.appendChild(nameWrapper);
    
    // Initial typing effect
    setTimeout(() => {
        interval = setInterval(() => {
            nameWrapper.innerText = originalName
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalName[index];
                    }
                    
                    // More visible random characters
                    return chars[Math.floor(Math.random() * (chars.length / 2))];
                })
                .join('');
            
            if (iteration >= originalName.length) {
                clearInterval(interval);
                // Add a class to indicate completion
                nameWrapper.classList.add('typing-complete');
                
                // Add a final flash effect
                setTimeout(() => {
                    nameWrapper.classList.add('flash-effect');
                    
                    // Add mouse interaction after initial animation completes
                    addMouseInteraction(nameWrapper, originalName, chars);
                }, 500);
            }
            
            iteration += 1/4; // Slower to make effect more visible
        }, 80); // Slower interval for more dramatic effect
    }, 500); // Start sooner
}

// Add mouse interaction to the name
function addMouseInteraction(element, originalText, chars) {
    // Create letter spans for each character
    const letters = originalText.split('').map(letter => {
        const span = document.createElement('span');
        span.className = 'interactive-letter';
        span.textContent = letter;
        span.setAttribute('data-letter', letter);
        return span;
    });
    
    // Clear and append letter spans
    element.innerHTML = '';
    letters.forEach(letter => element.appendChild(letter));
    
    // Add mouse interaction
    element.addEventListener('mousemove', (e) => {
        // Get mouse position relative to the element
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        // Determine which letters to scramble based on mouse position
        const letterWidth = rect.width / originalText.length;
        const scrambleRadius = 5; // Increase scramble radius for more effect
        
        // Calculate which letter the mouse is over
        const centerLetterIndex = Math.floor(mouseX / letterWidth);
        
        // Scramble letters near the mouse
        letters.forEach((letterSpan, index) => {
            const distance = Math.abs(index - centerLetterIndex);
            
            if (distance <= scrambleRadius) {
                // The closer to the mouse, the higher chance of scrambling
                const scrambleChance = 0.8 - (distance / (scrambleRadius + 1)) * 0.5;
                
                if (Math.random() < scrambleChance) {
                    // Scramble the letter
                    letterSpan.textContent = chars[Math.floor(Math.random() * chars.length)];
                    letterSpan.classList.add('scrambled');
                }
            } else if (letterSpan.classList.contains('scrambled')) {
                // Reset letter when mouse moves away
                letterSpan.textContent = letterSpan.getAttribute('data-letter');
                letterSpan.classList.remove('scrambled');
            }
        });
    });
    
    // Force the effect to be more visible by adding a click handler
    element.addEventListener('click', () => {
        // Scramble all letters briefly
        letters.forEach((letterSpan) => {
            letterSpan.textContent = chars[Math.floor(Math.random() * chars.length)];
            letterSpan.classList.add('scrambled');
            
            // Reset after a short delay
            setTimeout(() => {
                letterSpan.textContent = letterSpan.getAttribute('data-letter');
                letterSpan.classList.remove('scrambled');
            }, 500);
        });
    });
    
    // Reset all letters when mouse leaves
    element.addEventListener('mouseleave', () => {
        letters.forEach(letterSpan => {
            letterSpan.textContent = letterSpan.getAttribute('data-letter');
            letterSpan.classList.remove('scrambled');
        });
    });
}

// Initialize the name typing effect
window.addEventListener('DOMContentLoaded', () => {
    // Remove all other animations first
    const heroH1 = document.querySelector('#name-effect');
    if (heroH1) {
        // Force a reset of the element
        const originalText = heroH1.textContent;
        heroH1.innerHTML = '';
        
        // Create a wrapper for the effect
        const nameWrapper = document.createElement('span');
        nameWrapper.className = 'name-typing-effect';
        heroH1.appendChild(nameWrapper);
        
        // Start with random characters
        const chars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let iteration = 0;
        
        // Immediately start the animation
        const interval = setInterval(() => {
            nameWrapper.innerText = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                nameWrapper.classList.add('typing-complete');
                
                // Add mouse interaction after completion
                setTimeout(() => {
                    addMouseInteraction(nameWrapper, originalText, chars);
                }, 500);
            }
            
            iteration += 1/3;
        }, 60);
    }
});

// Fix for navigation highlight issue
document.addEventListener('DOMContentLoaded', function() {
    // First, clean up all existing navigation event listeners to prevent conflicts
    window.removeEventListener('scroll', updateActiveNavLink);
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create a direct mapping between section IDs and their nav links
    const sectionToNavMap = {};
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        sectionToNavMap[targetId] = link;
    });
    
    // Function to set the active nav link directly (not based on scroll position)
    function setActiveNavLink(sectionId) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = sectionToNavMap[sectionId];
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Handle click events on navigation links
    navLinks.forEach(link => {
        // Remove old event listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new click handler
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section ID
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Immediately set this link as active (don't wait for scroll)
                setActiveNavLink(targetId);
                
                // Scroll to the target section
                const navHeight = 100; // Fixed header height
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Use Intersection Observer for more accurate section detection during scrolling
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px', // Adjust based on your header size
        threshold: 0.1 // Section needs to be 10% visible
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        // Find the section with the largest intersection ratio
        let maxSection = null;
        let maxRatio = 0;
        
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                maxSection = entry.target;
            }
        });
        
        // Update active link if we found a visible section
        if (maxSection) {
            setActiveNavLink(maxSection.id);
        }
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add a throttled scroll handler as backup
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(function() {
                // Calculate which section should be active based on viewport position
                const scrollPosition = window.pageYOffset + (window.innerHeight / 2);
                
                let currentSection = null;
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120; // Adjust offset as needed
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        currentSection = section;
                    }
                });
                
                // Update active link if we found a section
                if (currentSection) {
                    setActiveNavLink(currentSection.id);
                }
                
                isScrolling = false;
            });
        }
    });
    
    // Set initial active section based on current position
    function setInitialActive() {
        // If there's a hash in the URL, use that section
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            setActiveNavLink(targetId);
        } else {
            // Otherwise determine the visible section
            const scrollPosition = window.pageYOffset + (window.innerHeight / 2);
            
            // Find the current section
            let currentSection = null;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section;
                }
            });
            
            if (currentSection) {
                setActiveNavLink(currentSection.id);
            } else if (sections.length > 0) {
                // Default to first section if none is visible
                setActiveNavLink(sections[0].id);
            }
        }
    }
    
    // Set initial active section
    setTimeout(setInitialActive, 100);
});
