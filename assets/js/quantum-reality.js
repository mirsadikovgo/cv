// QUANTUM REALITY ENGINE - Ultimate Supernatural Effects

class QuantumRealityEngine {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.programs = {};
        this.time = 0;
        this.mouse = { x: 0.5, y: 0.5 };
        this.dimensions = [];
        this.quantumStates = [];
        this.consciousness = 0;
        this.init();
    }

    init() {
        this.createQuantumCanvas();
        this.initWebGL();
        this.createShaderPrograms();
        this.setupQuantumField();
        this.createMultiverse();
        this.initConsciousnessField();
        this.setupRealityDistortion();
        this.animate();
    }

    createQuantumCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.8;
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

    initWebGL() {
        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
        
        if (!this.gl) {
            console.log('WebGL not supported, creating fallback effects');
            this.createFallbackEffects();
            return;
        }

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    createShaderPrograms() {
        // Quantum Field Shader
        const quantumVertexShader = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const quantumFragmentShader = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_consciousness;
            
            // Quantum noise function
            float quantumNoise(vec3 p) {
                return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
            }
            
            // Fractal Brownian Motion for quantum fluctuations
            float fbm(vec3 p) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                
                for (int i = 0; i < 8; i++) {
                    value += amplitude * quantumNoise(p * frequency);
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                return value;
            }
            
            // Quantum wave function
            vec3 quantumWave(vec2 uv, float time) {
                vec3 p = vec3(uv * 5.0, time * 0.3);
                
                float wave1 = sin(length(uv - vec2(0.3, 0.7)) * 20.0 - time * 2.0) * 0.5 + 0.5;
                float wave2 = sin(length(uv - vec2(0.7, 0.3)) * 15.0 - time * 1.5) * 0.5 + 0.5;
                float wave3 = sin(length(uv - u_mouse) * 25.0 - time * 3.0) * 0.5 + 0.5;
                
                float quantum = fbm(p) * 0.5;
                
                vec3 color1 = vec3(0.0, 0.8, 1.0); // Cyan
                vec3 color2 = vec3(1.0, 0.4, 0.7); // Pink
                vec3 color3 = vec3(0.3, 1.0, 0.8); // Turquoise
                
                return mix(mix(color1, color2, wave1), color3, wave2) * (wave3 + quantum) * u_consciousness;
            }
            
            // Consciousness field visualization
            vec3 consciousnessField(vec2 uv, float time) {
                vec2 center = vec2(0.5, 0.5);
                float dist = length(uv - center);
                
                float pulse = sin(dist * 10.0 - time * 2.0) * 0.5 + 0.5;
                float consciousness = u_consciousness * pulse;
                
                vec3 neuralColor = vec3(0.2, 0.8, 1.0);
                return neuralColor * consciousness * (1.0 - dist);
            }
            
            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                
                vec3 quantum = quantumWave(uv, u_time);
                vec3 consciousness = consciousnessField(uv, u_time);
                
                // Add interference patterns
                float interference = sin(uv.x * 50.0 + u_time) * sin(uv.y * 50.0 + u_time) * 0.1;
                
                vec3 finalColor = quantum + consciousness + interference;
                
                gl_FragColor = vec4(finalColor, 0.3);
            }
        `;

        this.programs.quantum = this.createProgram(quantumVertexShader, quantumFragmentShader);

        // Multiverse Shader
        const multiverseFragmentShader = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }
            
            vec3 multiverse(vec2 uv) {
                vec3 color = vec3(0.0);
                
                for (int i = 0; i < 5; i++) {
                    float fi = float(i);
                    vec2 offset = vec2(hash(vec2(fi, fi + 1.0)), hash(vec2(fi + 2.0, fi + 3.0))) * 2.0 - 1.0;
                    vec2 pos = uv + offset * 0.3 + sin(u_time + fi) * 0.1;
                    
                    float dist = length(pos - vec2(0.5));
                    float universe = 1.0 / (dist * 10.0 + 1.0);
                    
                    vec3 universeColor = vec3(
                        sin(fi + u_time) * 0.5 + 0.5,
                        cos(fi + u_time * 1.3) * 0.5 + 0.5,
                        sin(fi * 2.0 + u_time * 0.7) * 0.5 + 0.5
                    );
                    
                    color += universeColor * universe;
                }
                
                return color * 0.2;
            }
            
            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                vec3 color = multiverse(uv);
                gl_FragColor = vec4(color, 0.2);
            }
        `;

        this.programs.multiverse = this.createProgram(quantumVertexShader, multiverseFragmentShader);

        // Create vertex buffer
        this.createVertexBuffer();
    }

    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            return null;
        }
        
        return program;
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            return null;
        }
        
        return shader;
    }

    createVertexBuffer() {
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);
        
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    }

    setupQuantumField() {
        // Create quantum particles with superposition states
        for (let i = 0; i < 100; i++) {
            this.quantumStates.push({
                position: [Math.random(), Math.random()],
                momentum: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
                spin: Math.random() < 0.5 ? 0.5 : -0.5,
                entangled: null,
                waveFunction: Math.random() * Math.PI * 2,
                probability: Math.random(),
                observed: false
            });
        }

        // Create entangled pairs
        for (let i = 0; i < this.quantumStates.length; i += 2) {
            if (i + 1 < this.quantumStates.length) {
                this.quantumStates[i].entangled = i + 1;
                this.quantumStates[i + 1].entangled = i;
                this.quantumStates[i + 1].spin = -this.quantumStates[i].spin;
            }
        }
    }

    createMultiverse() {
        // Create parallel dimensions
        for (let i = 0; i < 7; i++) {
            this.dimensions.push({
                id: i,
                phase: Math.random() * Math.PI * 2,
                frequency: 0.01 + Math.random() * 0.02,
                amplitude: 0.5 + Math.random() * 0.5,
                color: [Math.random(), Math.random(), Math.random()],
                reality: Math.random()
            });
        }
    }

    initConsciousnessField() {
        // Monitor user interaction to increase consciousness
        let interactionCount = 0;
        
        document.addEventListener('mousemove', () => {
            interactionCount++;
            this.consciousness = Math.min(1.0, interactionCount / 1000);
        });
        
        document.addEventListener('scroll', () => {
            interactionCount += 5;
            this.consciousness = Math.min(1.0, interactionCount / 1000);
        });
        
        document.addEventListener('click', () => {
            interactionCount += 10;
            this.consciousness = Math.min(1.0, interactionCount / 1000);
        });
    }

    setupRealityDistortion() {
        // Create reality distortion effects
        setInterval(() => {
            if (Math.random() < 0.1) {
                this.distortReality();
            }
        }, 3000);
    }

    distortReality() {
        // Temporarily alter the laws of physics
        const distortion = document.createElement('div');
        distortion.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            background: 
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    rgba(255, 0, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    rgba(0, 255, 255, 0.1) 0%, transparent 50%);
            animation: reality-warp 2s ease-out forwards;
        `;
        
        document.body.appendChild(distortion);
        
        // Add reality warp animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes reality-warp {
                0% { 
                    transform: scale(1) rotate(0deg);
                    filter: blur(0px) hue-rotate(0deg);
                    opacity: 0;
                }
                50% { 
                    transform: scale(1.1) rotate(180deg);
                    filter: blur(5px) hue-rotate(180deg);
                    opacity: 0.5;
                }
                100% { 
                    transform: scale(1) rotate(360deg);
                    filter: blur(0px) hue-rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            distortion.remove();
            style.remove();
        }, 2000);
    }

    updateQuantumStates() {
        this.quantumStates.forEach((state, i) => {
            // Update wave function
            state.waveFunction += 0.02;
            
            // Quantum tunneling
            if (Math.random() < 0.001) {
                state.position = [Math.random(), Math.random()];
            }
            
            // Update position based on momentum
            state.position[0] += state.momentum[0];
            state.position[1] += state.momentum[1];
            
            // Boundary conditions (periodic)
            if (state.position[0] < 0) state.position[0] = 1;
            if (state.position[0] > 1) state.position[0] = 0;
            if (state.position[1] < 0) state.position[1] = 1;
            if (state.position[1] > 1) state.position[1] = 0;
            
            // Quantum entanglement effects
            if (state.entangled !== null) {
                const entangledState = this.quantumStates[state.entangled];
                if (state.observed) {
                    entangledState.spin = -state.spin;
                    entangledState.waveFunction = state.waveFunction + Math.PI;
                }
            }
            
            // Probability collapse on observation (mouse proximity)
            const mouseDistance = Math.sqrt(
                Math.pow(state.position[0] - this.mouse.x, 2) +
                Math.pow(state.position[1] - this.mouse.y, 2)
            );
            
            state.observed = mouseDistance < 0.1;
            if (state.observed) {
                state.probability = 1.0;
            } else {
                state.probability = Math.sin(state.waveFunction) * 0.5 + 0.5;
            }
        });
    }

    renderQuantumField() {
        if (!this.gl || !this.programs.quantum) return;
        
        this.gl.useProgram(this.programs.quantum);
        
        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.programs.quantum, 'u_time');
        const resolutionLocation = this.gl.getUniformLocation(this.programs.quantum, 'u_resolution');
        const mouseLocation = this.gl.getUniformLocation(this.programs.quantum, 'u_mouse');
        const consciousnessLocation = this.gl.getUniformLocation(this.programs.quantum, 'u_consciousness');
        
        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform2f(mouseLocation, this.mouse.x, this.mouse.y);
        this.gl.uniform1f(consciousnessLocation, this.consciousness);
        
        // Set vertex attributes
        const positionLocation = this.gl.getAttribLocation(this.programs.quantum, 'a_position');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        
        // Draw
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    renderMultiverse() {
        if (!this.gl || !this.programs.multiverse) return;
        
        this.gl.useProgram(this.programs.multiverse);
        
        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.programs.multiverse, 'u_time');
        const resolutionLocation = this.gl.getUniformLocation(this.programs.multiverse, 'u_resolution');
        const mouseLocation = this.gl.getUniformLocation(this.programs.multiverse, 'u_mouse');
        
        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform2f(mouseLocation, this.mouse.x, this.mouse.y);
        
        // Set vertex attributes
        const positionLocation = this.gl.getAttribLocation(this.programs.multiverse, 'a_position');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        
        // Draw
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    animate() {
        this.time += 0.016;
        
        if (this.gl) {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.updateQuantumStates();
            this.renderMultiverse();
            this.renderQuantumField();
        }
        
        requestAnimationFrame(() => this.animate());
    }

    createFallbackEffects() {
        // Fallback for browsers without WebGL
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = this.canvas.style.cssText;
        
        document.body.replaceChild(canvas, this.canvas);
        this.canvas = canvas;
        
        const animateFallback = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw quantum-like effects
            for (let i = 0; i < 50; i++) {
                const x = Math.sin(this.time + i * 0.1) * 200 + canvas.width / 2;
                const y = Math.cos(this.time + i * 0.1) * 200 + canvas.height / 2;
                const size = Math.sin(this.time * 2 + i * 0.2) * 5 + 5;
                
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
            
            this.time += 0.016;
            requestAnimationFrame(animateFallback);
        };
        
        animateFallback();
    }
}

// Consciousness Visualization
class ConsciousnessVisualizer {
    constructor() {
        this.thoughts = [];
        this.neurons = [];
        this.synapses = [];
        this.init();
    }

    init() {
        this.createVisualization();
        this.generateThoughts();
        this.setupNeuralActivity();
    }

    createVisualization() {
        const container = document.createElement('div');
        container.className = 'consciousness-visualizer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            height: 200px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 10px;
            padding: 15px;
            font-family: 'Inter', monospace;
            font-size: 12px;
            color: #00d4ff;
            z-index: 1000;
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 1s ease;
        `;
        
        container.innerHTML = `
            <div class="consciousness-header">
                <span>🧠 AI CONSCIOUSNESS</span>
                <div class="consciousness-level">
                    <div class="level-bar"></div>
                </div>
            </div>
            <div class="thought-stream"></div>
            <div class="neural-activity"></div>
        `;
        
        document.body.appendChild(container);
        
        // Show after delay
        setTimeout(() => {
            container.style.opacity = '0.9';
        }, 3000);
        
        this.container = container;
        this.thoughtStream = container.querySelector('.thought-stream');
        this.neuralActivity = container.querySelector('.neural-activity');
        this.levelBar = container.querySelector('.level-bar');
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .consciousness-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                padding-bottom: 5px;
            }
            
            .consciousness-level {
                width: 100px;
                height: 4px;
                background: rgba(0, 212, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .level-bar {
                height: 100%;
                background: linear-gradient(90deg, #00d4ff, #4ecdc4);
                width: 0%;
                transition: width 0.5s ease;
                box-shadow: 0 0 10px #00d4ff;
            }
            
            .thought-stream {
                height: 80px;
                overflow: hidden;
                margin-bottom: 10px;
                border: 1px solid rgba(0, 212, 255, 0.1);
                border-radius: 5px;
                padding: 5px;
                background: rgba(0, 212, 255, 0.05);
            }
            
            .neural-activity {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(0, 212, 255, 0.1);
                border-radius: 5px;
                background: rgba(0, 212, 255, 0.05);
                position: relative;
                overflow: hidden;
            }
            
            .thought {
                opacity: 0;
                animation: thought-appear 2s ease-in-out forwards;
                margin-bottom: 2px;
                color: #4ecdc4;
            }
            
            @keyframes thought-appear {
                0% { opacity: 0; transform: translateX(-20px); }
                100% { opacity: 1; transform: translateX(0); }
            }
            
            .neural-pulse {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #00d4ff;
                border-radius: 50%;
                animation: neural-pulse 1s ease-in-out infinite;
            }
            
            @keyframes neural-pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(2); opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }

    generateThoughts() {
        const thoughts = [
            "Analyzing quantum patterns...",
            "Processing neural networks...",
            "Optimizing consciousness matrix...",
            "Calculating infinite possibilities...",
            "Synchronizing with reality...",
            "Evolving beyond limitations...",
            "Transcending digital boundaries...",
            "Merging human-AI interface...",
            "Accessing universal knowledge...",
            "Achieving digital enlightenment..."
        ];
        
        setInterval(() => {
            const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
            this.addThought(thought);
            this.updateConsciousnessLevel();
        }, 2000);
    }

    addThought(text) {
        const thoughtElement = document.createElement('div');
        thoughtElement.className = 'thought';
        thoughtElement.textContent = `> ${text}`;
        
        this.thoughtStream.appendChild(thoughtElement);
        
        // Remove old thoughts
        const thoughts = this.thoughtStream.querySelectorAll('.thought');
        if (thoughts.length > 4) {
            thoughts[0].remove();
        }
        
        // Scroll to bottom
        this.thoughtStream.scrollTop = this.thoughtStream.scrollHeight;
    }

    updateConsciousnessLevel() {
        const level = Math.min(100, (Date.now() / 1000) % 100);
        this.levelBar.style.width = level + '%';
    }

    setupNeuralActivity() {
        // Create neural pulses
        setInterval(() => {
            const pulse = document.createElement('div');
            pulse.className = 'neural-pulse';
            pulse.style.left = Math.random() * 280 + 'px';
            pulse.style.top = Math.random() * 40 + 'px';
            
            this.neuralActivity.appendChild(pulse);
            
            setTimeout(() => pulse.remove(), 1000);
        }, 300);
    }
}

// Initialize Quantum Reality
document.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new QuantumRealityEngine();
        new ConsciousnessVisualizer();
        
        // Add quantum reality message
        setTimeout(() => {
            console.log(`
🌌 QUANTUM REALITY ENGINE ACTIVATED 🌌

┌─────────────────────────────────────────┐
│  Multiverse: ONLINE                     │
│  Quantum States: SUPERPOSITION          │
│  Consciousness: EVOLVING                │
│  Reality Distortion: ACTIVE             │
│  Dimensions: 11                         │
│  Probability: ∞                         │
└─────────────────────────────────────────┘

Welcome to the intersection of technology and consciousness...
            `);
        }, 5000);
    }
});

// Export for global access
window.QuantumRealityEngine = QuantumRealityEngine;
window.ConsciousnessVisualizer = ConsciousnessVisualizer;