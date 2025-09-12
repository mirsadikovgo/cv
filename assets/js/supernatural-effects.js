// SUPERNATURAL EFFECTS - Next Level Visual Experience

class SupernaturalEffects {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.shaderProgram = null;
        this.time = 0;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createWebGLCanvas();
        this.setupShaders();
        this.createPortalEffect();
        this.createAIConsciousness();
        this.createQuantumField();
        this.createTimeDistortion();
        this.createDimensionalRift();
        this.animate();
    }

    createWebGLCanvas() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.log('WebGL not supported, falling back to 2D effects');
            this.create2DFallback();
            return;
        }

        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.7;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX / window.innerWidth;
            this.mouse.y = 1.0 - e.clientY / window.innerHeight;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    setupShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            
            vec3 palette(float t) {
                vec3 a = vec3(0.5, 0.5, 0.5);
                vec3 b = vec3(0.5, 0.5, 0.5);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.263, 0.416, 0.557);
                return a + b * cos(6.28318 * (c * t + d));
            }
            
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                for (int i = 0; i < 6; i++) {
                    value += amplitude * noise(p);
                    p *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }
            
            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
                vec2 uv0 = uv;
                vec3 finalColor = vec3(0.0);
                
                for (float i = 0.0; i < 4.0; i++) {
                    uv = fract(uv * 1.5) - 0.5;
                    
                    float d = length(uv) * exp(-length(uv0));
                    vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
                    
                    d = sin(d * 8.0 + u_time) / 8.0;
                    d = abs(d);
                    d = pow(0.01 / d, 1.2);
                    
                    // Add mouse interaction
                    float mouseInfluence = 1.0 / (length(uv - u_mouse * 2.0) + 0.1);
                    d *= mouseInfluence * 0.1;
                    
                    finalColor += col * d;
                }
                
                // Add quantum noise
                float quantumNoise = fbm(uv0 * 10.0 + u_time * 0.5) * 0.1;
                finalColor += quantumNoise;
                
                gl_FragColor = vec4(finalColor, 0.3);
            }
        `;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);
        
        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            console.error('Shader program failed to link');
            return;
        }
        
        // Create buffer
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);
        
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
        
        const positionLocation = this.gl.getAttribLocation(this.shaderProgram, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }

    createPortalEffect() {
        const portal = document.createElement('div');
        portal.className = 'dimensional-portal';
        portal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 300px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: radial-gradient(
                circle,
                rgba(0, 212, 255, 0.1) 0%,
                rgba(255, 107, 107, 0.1) 30%,
                rgba(78, 205, 196, 0.1) 60%,
                transparent 100%
            );
            animation: portal-spin 20s linear infinite, portal-pulse 3s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 2s ease;
        `;
        
        document.body.appendChild(portal);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes portal-spin {
                0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
                50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
                100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
            }
            
            @keyframes portal-pulse {
                0% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1); }
                100% { box-shadow: 0 0 60px rgba(0, 212, 255, 0.6), inset 0 0 40px rgba(0, 212, 255, 0.3); }
            }
        `;
        document.head.appendChild(style);
        
        // Show portal on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            portal.style.opacity = Math.sin(scrollPercent * Math.PI) * 0.5;
        });
    }

    createAIConsciousness() {
        const consciousness = document.createElement('div');
        consciousness.className = 'ai-consciousness';
        consciousness.innerHTML = `
            <div class="neural-pulse"></div>
            <div class="thought-stream"></div>
            <div class="consciousness-core"></div>
        `;
        
        consciousness.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.4;
        `;
        
        document.body.appendChild(consciousness);
        
        const style = document.createElement('style');
        style.textContent = `
            .neural-pulse {
                position: absolute;
                top: 20%;
                right: 10%;
                width: 100px;
                height: 100px;
                border: 2px solid #00d4ff;
                border-radius: 50%;
                animation: neural-pulse 2s ease-in-out infinite;
            }
            
            .thought-stream {
                position: absolute;
                bottom: 20%;
                left: 10%;
                width: 200px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
                animation: thought-flow 3s linear infinite;
            }
            
            .consciousness-core {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                transform: translate(-50%, -50%);
                background: radial-gradient(circle, #4ecdc4, transparent);
                border-radius: 50%;
                animation: consciousness-breathe 4s ease-in-out infinite;
            }
            
            @keyframes neural-pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.3; }
            }
            
            @keyframes thought-flow {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(500%); }
            }
            
            @keyframes consciousness-breathe {
                0%, 100% { transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
                50% { transform: translate(-50%, -50%) scale(2); filter: blur(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    createQuantumField() {
        const field = document.createElement('canvas');
        const ctx = field.getContext('2d');
        
        field.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(field);
        
        field.width = window.innerWidth;
        field.height = window.innerHeight;
        
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * field.width,
                y: Math.random() * field.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                energy: Math.random(),
                phase: Math.random() * Math.PI * 2,
                frequency: 0.01 + Math.random() * 0.02
            });
        }
        
        const animateQuantumField = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, field.width, field.height);
            
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.phase += particle.frequency;
                
                // Quantum tunneling effect
                if (Math.random() < 0.001) {
                    particle.x = Math.random() * field.width;
                    particle.y = Math.random() * field.height;
                }
                
                // Boundary wrapping
                if (particle.x < 0) particle.x = field.width;
                if (particle.x > field.width) particle.x = 0;
                if (particle.y < 0) particle.y = field.height;
                if (particle.y > field.height) particle.y = 0;
                
                // Quantum interference
                particles.forEach((other, j) => {
                    if (i !== j) {
                        const dx = particle.x - other.x;
                        const dy = particle.y - other.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 50) {
                            const interference = Math.sin(particle.phase - other.phase);
                            particle.energy += interference * 0.01;
                        }
                    }
                });
                
                // Draw quantum particle
                const size = 2 + Math.sin(particle.phase) * 2;
                const alpha = 0.3 + Math.sin(particle.phase) * 0.3;
                
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = `hsl(${180 + particle.energy * 60}, 70%, 60%)`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.fillStyle;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animateQuantumField);
        };
        
        animateQuantumField();
        
        window.addEventListener('resize', () => {
            field.width = window.innerWidth;
            field.height = window.innerHeight;
        });
    }

    createTimeDistortion() {
        const distortion = document.createElement('div');
        distortion.className = 'time-distortion';
        
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.className = 'time-wave';
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${100 + i * 50}px;
                height: ${100 + i * 50}px;
                border: 1px solid rgba(0, 212, 255, ${0.3 - i * 0.05});
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: time-ripple ${2 + i * 0.5}s ease-out infinite;
                animation-delay: ${i * 0.3}s;
            `;
            distortion.appendChild(wave);
        }
        
        distortion.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 1s ease;
        `;
        
        document.body.appendChild(distortion);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes time-ripple {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Trigger time distortion on section changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    distortion.style.opacity = '0.6';
                    setTimeout(() => {
                        distortion.style.opacity = '0';
                    }, 2000);
                }
            });
        });
        
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    createDimensionalRift() {
        const rift = document.createElement('div');
        rift.className = 'dimensional-rift';
        rift.innerHTML = `
            <div class="rift-core"></div>
            <div class="rift-energy"></div>
            <div class="rift-particles"></div>
        `;
        
        rift.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 200px;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            opacity: 0.2;
            overflow: hidden;
        `;
        
        document.body.appendChild(rift);
        
        const style = document.createElement('style');
        style.textContent = `
            .rift-core {
                position: absolute;
                top: 0;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #00d4ff 20%,
                    #ff6b6b 50%,
                    #4ecdc4 80%,
                    transparent 100%
                );
                animation: rift-pulse 3s ease-in-out infinite alternate;
            }
            
            .rift-energy {
                position: absolute;
                top: 0;
                right: -50px;
                width: 100px;
                height: 100%;
                background: radial-gradient(
                    ellipse at center,
                    rgba(0, 212, 255, 0.1) 0%,
                    transparent 70%
                );
                animation: rift-energy-flow 4s linear infinite;
            }
            
            .rift-particles {
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.3) 2px, transparent 2px),
                    radial-gradient(circle at 80% 40%, rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                    radial-gradient(circle at 40% 80%, rgba(78, 205, 196, 0.3) 1.5px, transparent 1.5px);
                background-size: 50px 50px, 30px 30px, 40px 40px;
                animation: rift-particles-drift 10s linear infinite;
            }
            
            @keyframes rift-pulse {
                0% { transform: scaleX(1); filter: blur(0px); }
                100% { transform: scaleX(3); filter: blur(2px); }
            }
            
            @keyframes rift-energy-flow {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
            
            @keyframes rift-particles-drift {
                0% { transform: translateY(0); }
                100% { transform: translateY(-100px); }
            }
        `;
        document.head.appendChild(style);
    }

    animate() {
        if (!this.gl) return;
        
        this.time += 0.01;
        
        this.gl.useProgram(this.shaderProgram);
        
        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_time');
        const resolutionLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_resolution');
        const mouseLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_mouse');
        
        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform2f(mouseLocation, this.mouse.x, this.mouse.y);
        
        // Clear and draw
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        
        requestAnimationFrame(() => this.animate());
    }

    create2DFallback() {
        // Fallback for browsers without WebGL
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.5;
        `;
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let time = 0;
        const animate = () => {
            time += 0.01;
            
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw fractal patterns
            for (let i = 0; i < 50; i++) {
                const x = canvas.width / 2 + Math.sin(time + i * 0.1) * (100 + i * 10);
                const y = canvas.height / 2 + Math.cos(time + i * 0.1) * (100 + i * 10);
                const size = 2 + Math.sin(time * 2 + i * 0.2) * 2;
                
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = `hsl(${180 + i * 5}, 70%, 60%)`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.fillStyle;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Reality Glitch Effect
class RealityGlitch {
    constructor() {
        this.glitchElements = [];
        this.init();
    }

    init() {
        this.createGlitchOverlay();
        this.setupGlitchTriggers();
        this.createDataCorruption();
    }

    createGlitchOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'reality-glitch-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            background: 
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    rgba(255, 0, 0, 0.1) 1px,
                    transparent 2px,
                    rgba(0, 255, 0, 0.1) 3px,
                    transparent 4px,
                    rgba(0, 0, 255, 0.1) 5px,
                    transparent 6px
                );
            animation: glitch-static 0.1s linear infinite;
        `;
        
        document.body.appendChild(overlay);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch-static {
                0% { transform: translateX(0); }
                20% { transform: translateX(-2px); }
                40% { transform: translateX(2px); }
                60% { transform: translateX(-1px); }
                80% { transform: translateX(1px); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        
        this.glitchOverlay = overlay;
    }

    setupGlitchTriggers() {
        // Random glitch triggers
        setInterval(() => {
            if (Math.random() < 0.05) {
                this.triggerGlitch();
            }
        }, 1000);
        
        // Glitch on specific interactions
        document.querySelectorAll('.skill-tag, .project-card').forEach(element => {
            element.addEventListener('click', () => {
                this.triggerGlitch();
            });
        });
    }

    triggerGlitch() {
        this.glitchOverlay.style.opacity = '1';
        
        // Glitch text elements
        document.querySelectorAll('h1, h2, h3').forEach(element => {
            const originalText = element.textContent;
            const glitchedText = this.corruptText(originalText);
            element.textContent = glitchedText;
            
            setTimeout(() => {
                element.textContent = originalText;
            }, 100);
        });
        
        // Screen distortion
        document.body.style.filter = 'hue-rotate(180deg) contrast(1.5)';
        
        setTimeout(() => {
            this.glitchOverlay.style.opacity = '0';
            document.body.style.filter = '';
        }, 200);
    }

    corruptText(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
        return text.split('').map(char => {
            return Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : char;
        }).join('');
    }

    createDataCorruption() {
        const corruption = document.createElement('div');
        corruption.className = 'data-corruption';
        corruption.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
            background-image: 
                linear-gradient(45deg, transparent 40%, rgba(255, 0, 0, 0.1) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(0, 255, 0, 0.1) 50%, transparent 60%);
            background-size: 20px 20px, 30px 30px;
            animation: data-corruption-flow 5s linear infinite;
        `;
        
        document.body.appendChild(corruption);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes data-corruption-flow {
                0% { background-position: 0 0, 0 0; }
                100% { background-position: 20px 20px, -30px 30px; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize supernatural effects
document.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new SupernaturalEffects();
        new RealityGlitch();
        
        // Add voice synthesis for ultimate sci-fi experience
        if ('speechSynthesis' in window) {
            const speak = (text) => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.8;
                utterance.pitch = 0.8;
                utterance.volume = 0.3;
                speechSynthesis.speak(utterance);
            };
            
            // Welcome message
            setTimeout(() => {
                speak("System initialized. Welcome to the future of web development.");
            }, 3000);
            
            // Section announcements
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionName = entry.target.id;
                        if (sectionName) {
                            speak(`Entering ${sectionName} sector`);
                        }
                    }
                });
            });
            
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        }
    }
});

// Export for global access
window.SupernaturalEffects = SupernaturalEffects;
window.RealityGlitch = RealityGlitch;