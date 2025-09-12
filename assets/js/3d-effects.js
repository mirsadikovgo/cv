// Advanced 3D Effects and Animations

class ThreeDEffects {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            // Fallback to CSS 3D transforms if Three.js is not available
            this.initCSS3D();
            return;
        }
        
        this.initThreeJS();
        this.createParticleSystem();
        this.setupEventListeners();
        this.animate();
    }

    initCSS3D() {
        // CSS 3D Transform effects as fallback
        this.setupCSS3DCards();
        this.setupParallaxEffect();
        this.setupTiltEffect();
    }

    setupCSS3DCards() {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.3s ease';
            
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${(e.clientY - centerY) / 10}deg) 
                    rotateY(${(centerX - e.clientX) / 10}deg) 
                    translateZ(20px)
                `;
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${(e.clientY - centerY) / 20}deg) 
                    rotateY(${(centerX - e.clientX) / 20}deg) 
                    translateZ(20px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.section-title, .profile-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.contact-method, .summary-item');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// Holographic Effect
class HolographicEffect {
    constructor() {
        this.init();
    }

    init() {
        this.createHolographicOverlay();
        this.setupHolographicText();
    }

    createHolographicOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'holographic-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: 
                linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.02) 50%, transparent 70%),
                linear-gradient(-45deg, transparent 30%, rgba(255, 107, 107, 0.02) 50%, transparent 70%);
            animation: holographic-scan 8s linear infinite;
        `;
        
        document.body.appendChild(overlay);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes holographic-scan {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }

    setupHolographicText() {
        const textElements = document.querySelectorAll('.section-title');
        
        textElements.forEach(element => {
            element.style.position = 'relative';
            
            // Create holographic effect on hover
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = `
                    0 0 5px #00d4ff,
                    0 0 10px #00d4ff,
                    0 0 15px #00d4ff,
                    0 0 20px #00d4ff,
                    0 0 35px #00d4ff,
                    0 0 40px #00d4ff
                `;
                element.style.animation = 'holographic-flicker 0.5s ease-in-out';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = '';
                element.style.animation = '';
            });
        });
        
        // Add flicker animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes holographic-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Quantum Particle System
class QuantumParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.setupMouseTracking();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02
            });
        }
    }

    getRandomColor() {
        const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffa726', '#9c27b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Update pulse
            particle.pulse += particle.pulseSpeed;
            particle.opacity = 0.2 + Math.sin(particle.pulse) * 0.3;
            
            // Limit velocity
            const maxVel = 2;
            if (Math.abs(particle.vx) > maxVel) particle.vx = maxVel * Math.sign(particle.vx);
            if (Math.abs(particle.vy) > maxVel) particle.vy = maxVel * Math.sign(particle.vy);
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.shadowBlur = 5;
                    this.ctx.shadowColor = particle.color;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    
                    this.ctx.restore();
                }
            });
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Neural Network Visualization
class NeuralNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createNetwork();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
        `;
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createNetwork();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const layers = 4;
        const nodesPerLayer = 8;
        const layerSpacing = this.canvas.width / (layers + 1);
        const nodeSpacing = this.canvas.height / (nodesPerLayer + 1);
        
        // Create nodes
        for (let layer = 0; layer < layers; layer++) {
            for (let node = 0; node < nodesPerLayer; node++) {
                this.nodes.push({
                    x: layerSpacing * (layer + 1),
                    y: nodeSpacing * (node + 1),
                    layer: layer,
                    activation: Math.random(),
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
        
        // Create connections
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((otherNode, j) => {
                if (otherNode.layer === node.layer + 1) {
                    this.connections.push({
                        from: i,
                        to: j,
                        weight: Math.random() * 2 - 1,
                        activity: 0
                    });
                }
            });
        });
    }

    updateNetwork() {
        // Update node activations
        this.nodes.forEach(node => {
            node.pulse += 0.02;
            node.activation = 0.5 + Math.sin(node.pulse) * 0.5;
        });
        
        // Update connection activities
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            connection.activity = fromNode.activation * Math.abs(connection.weight);
        });
    }

    drawNetwork() {
        // Draw connections
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            
            this.ctx.save();
            this.ctx.globalAlpha = connection.activity * 0.5;
            this.ctx.strokeStyle = connection.weight > 0 ? '#00d4ff' : '#ff6b6b';
            this.ctx.lineWidth = Math.abs(connection.weight) * 2;
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.save();
            this.ctx.globalAlpha = node.activation;
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#4ecdc4';
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateNetwork();
        this.drawNetwork();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new ThreeDEffects();
        new HolographicEffect();
        new QuantumParticles();
        new NeuralNetwork();
    }
});

// Export for global access
window.ThreeDEffects = ThreeDEffects;
window.HolographicEffect = HolographicEffect;
window.QuantumParticles = QuantumParticles;
window.NeuralNetwork = NeuralNetwork;