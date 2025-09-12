class ResumeApp {
    constructor() {
        this.currentSection = 0;
        this.sections = [];
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.setupScrollProgress();
        this.setupNavigation();
        this.setupIntersectionObserver();
        this.setupTypewriter();
        this.setupSkillAnimations();
        this.setupProjectAnimations();
        this.hideLoader();
        this.setupSmoothScrolling();
    }

    createParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and animation
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random colors
            const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffa726'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);
        }
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    setupNavigation() {
        this.sections = document.querySelectorAll('.section');
        const navDots = document.querySelectorAll('.nav-dot');
        
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });
    }

    scrollToSection(index) {
        const section = this.sections[index];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Update navigation
                    const sectionIndex = Array.from(this.sections).indexOf(entry.target);
                    this.updateNavigation(sectionIndex);
                    
                    // Trigger section-specific animations
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateNavigation(activeIndex) {
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
        this.currentSection = activeIndex;
    }

    triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'skills':
                this.animateSkillCards();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'experience':
                this.animateTimeline();
                break;
        }
    }

    setupTypewriter() {
        const subtitle = document.querySelector('.hero .subtitle');
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #00d4ff';
        subtitle.style.whiteSpace = 'nowrap';
        subtitle.style.overflow = 'hidden';
        subtitle.style.width = '0';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 2000);
    }

    setupSkillAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            const tags = card.querySelectorAll('.skill-tag');
            tags.forEach((tag, tagIndex) => {
                tag.addEventListener('mouseenter', () => {
                    this.createSkillParticles(tag);
                });
            });
        });
    }

    createSkillParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00d4ff';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2;
            const distance = 50;
            
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }

    animateSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }

    setupProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverEffect(card);
            });
        });
    }

    createHoverEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.background = 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.opacity = '0';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        ripple.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(1.1)' }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }

    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 200);
        });
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 300);
        });
    }

    hideLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.querySelector('.loading');
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
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
    }

    // Matrix rain effect for background
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 100);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Cursor trail effect
    setupCursorTrail() {
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.position = 'fixed';
            dot.style.width = '4px';
            dot.style.height = '4px';
            dot.style.background = '#00d4ff';
            dot.style.borderRadius = '50%';
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.opacity = '0';
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateTrail = () => {
            let x = mouseX, y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                dot.style.opacity = (trailLength - index) / trailLength;
                dot.style.transform = `scale(${(trailLength - index) / trailLength})`;
                
                if (nextDot) {
                    x += (parseFloat(nextDot.style.left) - x) * 0.3;
                    y += (parseFloat(nextDot.style.top) - y) * 0.3;
                }
            });
            
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ResumeApp();
    
    // Optional: Enable matrix rain and cursor trail for extra effects
    // app.createMatrixRain();
    // app.setupCursorTrail();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const app = window.resumeApp;
    if (!app) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case 'j':
            e.preventDefault();
            app.scrollToSection(Math.min(app.currentSection + 1, app.sections.length - 1));
            break;
        case 'ArrowUp':
        case 'k':
            e.preventDefault();
            app.scrollToSection(Math.max(app.currentSection - 1, 0));
            break;
        case 'Home':
            e.preventDefault();
            app.scrollToSection(0);
            break;
        case 'End':
            e.preventDefault();
            app.scrollToSection(app.sections.length - 1);
            break;
    }
});

// Store app instance globally for keyboard shortcuts
window.addEventListener('load', () => {
    window.resumeApp = new ResumeApp();
});