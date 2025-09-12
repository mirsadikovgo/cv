// Advanced Visual Effects for Resume

class VisualEffects {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupMouseTracking();
        this.createParticleSystem();
        this.startAnimation();
        this.setupHoverEffects();
        this.createMatrixRain();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';

        document.body.appendChild(this.canvas);
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createMouseParticles();
        });
    }

    createMouseParticles() {
        if (Math.random() < 0.1) {
            this.particles.push({
                x: this.mouse.x,
                y: this.mouse.y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                decay: 0.02,
                size: Math.random() * 3 + 1,
                color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`
            });
        }
    }

    createParticleSystem() {
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                life: Math.random(),
                decay: 0.005,
                size: Math.random() * 2 + 1,
                color: '#00d4ff'
            });
        }
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    startAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawParticles();
            this.drawConnections();
            requestAnimationFrame(animate);
        };
        animate();
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (1 - distance / 100) * 0.2;
                    this.ctx.strokeStyle = '#00d4ff';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
    }

    setupHoverEffects() {
        // Skill tags hover effect
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', (e) => {
                this.createBurstEffect(e.target);
            });
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target);
            });
        });

        // Contact links hover effect
        document.querySelectorAll('.contact-link, .contact-method').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.createGlowEffect(e.target);
            });
        });
    }

    createBurstEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * 3,
                vy: Math.sin(angle) * 3,
                life: 1,
                decay: 0.03,
                size: 2,
                color: '#4ecdc4'
            });
        }
    }

    createRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create ripple particles
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02,
                size: Math.random() * 3 + 1,
                color: '#ff6b6b'
            });
        }
    }

    createGlowEffect(element) {
        const rect = element.getBoundingClientRect();

        // Create glowing particles around the element
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: rect.left + Math.random() * rect.width,
                y: rect.top + Math.random() * rect.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                life: 1,
                decay: 0.025,
                size: Math.random() * 2 + 1,
                color: '#ffa726'
            });
        }
    }

    createMatrixRain() {
        const matrixCanvas = document.createElement('canvas');
        const matrixCtx = matrixCanvas.getContext('2d');

        matrixCanvas.style.position = 'fixed';
        matrixCanvas.style.top = '0';
        matrixCanvas.style.left = '0';
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        matrixCanvas.style.pointerEvents = 'none';
        matrixCanvas.style.zIndex = '-2';
        matrixCanvas.style.opacity = '0.05';

        document.body.appendChild(matrixCanvas);

        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            matrixCtx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            matrixCtx.fillStyle = '#00d4ff';
            matrixCtx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 100);

        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        });
    }
}

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.trailLength = 15;
        this.init();
    }

    init() {
        this.createTrail();
        this.setupMouseTracking();
        this.animate();
    }

    createTrail() {
        for (let i = 0; i < this.trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                box-shadow: 0 0 10px #00d4ff;
            `;
            document.body.appendChild(dot);
            this.trail.push({
                element: dot,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            });
        }
    }

    setupMouseTracking() {
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.trail[0].targetX = mouseX;
            this.trail[0].targetY = mouseY;
        });

        document.addEventListener('mouseenter', () => {
            this.trail.forEach(dot => {
                dot.element.style.opacity = '1';
            });
        });

        document.addEventListener('mouseleave', () => {
            this.trail.forEach(dot => {
                dot.element.style.opacity = '0';
            });
        });
    }

    animate() {
        this.trail.forEach((dot, index) => {
            if (index === 0) {
                dot.x += (dot.targetX - dot.x) * 0.3;
                dot.y += (dot.targetY - dot.y) * 0.3;
            } else {
                const prevDot = this.trail[index - 1];
                dot.x += (prevDot.x - dot.x) * 0.3;
                dot.y += (prevDot.y - dot.y) * 0.3;
            }

            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            dot.element.style.opacity = (this.trailLength - index) / this.trailLength * 0.8;
            dot.element.style.transform = `scale(${(this.trailLength - index) / this.trailLength})`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
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
                    char = this.getRandomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }

        this.element.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize effects if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new VisualEffects();
        new CursorTrail();

        // Add text scramble effect to section titles
        document.querySelectorAll('.section-title').forEach(title => {
            const scramble = new TextScramble(title);
            const originalText = title.textContent;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scramble.setText(originalText);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(title);
        });
    }
});

// Export for use in other modules
window.VisualEffects = VisualEffects;
window.CursorTrail = CursorTrail;
window.TextScramble = TextScramble;