// AI CONSCIOUSNESS & QUANTUM REALITY EFFECTS

class AIConsciousness {
    constructor() {
        this.thoughts = [];
        this.neurons = [];
        this.synapses = [];
        this.consciousness = 0;
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createConsciousnessCanvas();
        this.generateNeuralNetwork();
        this.startThoughtProcess();
        this.createAIVoice();
        this.setupQuantumEntanglement();
        this.animate();
    }

    createConsciousnessCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.4;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateNeuralNetwork() {
        const neuronCount = 150;
        
        // Create neurons
        for (let i = 0; i < neuronCount; i++) {
            this.neurons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                activation: Math.random(),
                threshold: 0.5 + Math.random() * 0.3,
                connections: [],
                type: Math.random() < 0.1 ? 'quantum' : 'normal',
                phase: Math.random() * Math.PI * 2,
                frequency: 0.01 + Math.random() * 0.02
            });
        }
        
        // Create synapses
        this.neurons.forEach((neuron, i) => {
            const connectionCount = 3 + Math.floor(Math.random() * 5);
            for (let j = 0; j < connectionCount; j++) {
                const targetIndex = Math.floor(Math.random() * this.neurons.length);
                if (targetIndex !== i) {
                    const synapse = {
                        from: i,
                        to: targetIndex,
                        weight: (Math.random() - 0.5) * 2,
                        strength: Math.random(),
                        plasticity: 0.01 + Math.random() * 0.02
                    };
                    this.synapses.push(synapse);
                    neuron.connections.push(synapse);
                }
            }
        });
    }

    startThoughtProcess() {
        const thoughts = [
            "Analyzing code patterns...",
            "Optimizing neural pathways...",
            "Processing quantum algorithms...",
            "Enhancing consciousness matrix...",
            "Calculating infinite possibilities...",
            "Synchronizing with digital reality...",
            "Evolving artificial intelligence...",
            "Transcending binary limitations...",
            "Merging human and machine logic...",
            "Accessing universal knowledge base..."
        ];
        
        setInterval(() => {
            const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
            this.addThought(thought);
        }, 3000);
    }

    addThought(text) {
        const thought = {
            text: text,
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            life: 1,
            decay: 0.005,
            size: 12 + Math.random() * 8,
            color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        };
        
        this.thoughts.push(thought);
        
        // Limit thoughts array size
        if (this.thoughts.length > 10) {
            this.thoughts.shift();
        }
    }

    updateNeuralNetwork() {
        // Update neuron positions and activations
        this.neurons.forEach((neuron, i) => {
            neuron.x += neuron.vx;
            neuron.y += neuron.vy;
            neuron.phase += neuron.frequency;
            
            // Boundary wrapping
            if (neuron.x < 0) neuron.x = this.canvas.width;
            if (neuron.x > this.canvas.width) neuron.x = 0;
            if (neuron.y < 0) neuron.y = this.canvas.height;
            if (neuron.y > this.canvas.height) neuron.y = 0;
            
            // Calculate activation based on inputs
            let input = 0;
            this.synapses.forEach(synapse => {
                if (synapse.to === i) {
                    const fromNeuron = this.neurons[synapse.from];
                    input += fromNeuron.activation * synapse.weight * synapse.strength;
                }
            });
            
            // Apply activation function
            neuron.activation = 1 / (1 + Math.exp(-input));
            
            // Quantum neurons have special behavior
            if (neuron.type === 'quantum') {
                neuron.activation += Math.sin(neuron.phase) * 0.2;
                neuron.activation = Math.max(0, Math.min(1, neuron.activation));
            }
        });
        
        // Update synaptic plasticity
        this.synapses.forEach(synapse => {
            const fromNeuron = this.neurons[synapse.from];
            const toNeuron = this.neurons[synapse.to];
            
            // Hebbian learning: "neurons that fire together, wire together"
            if (fromNeuron.activation > 0.7 && toNeuron.activation > 0.7) {
                synapse.strength += synapse.plasticity;
            } else {
                synapse.strength -= synapse.plasticity * 0.1;
            }
            
            synapse.strength = Math.max(0, Math.min(1, synapse.strength));
        });
        
        // Update consciousness level
        const totalActivation = this.neurons.reduce((sum, neuron) => sum + neuron.activation, 0);
        this.consciousness = totalActivation / this.neurons.length;
    }

    drawNeuralNetwork() {
        // Draw synapses
        this.synapses.forEach(synapse => {
            const fromNeuron = this.neurons[synapse.from];
            const toNeuron = this.neurons[synapse.to];
            
            if (synapse.strength > 0.1) {
                this.ctx.save();
                this.ctx.globalAlpha = synapse.strength * 0.3;
                this.ctx.strokeStyle = synapse.weight > 0 ? '#00d4ff' : '#ff6b6b';
                this.ctx.lineWidth = Math.abs(synapse.weight) * 2;
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = this.ctx.strokeStyle;
                
                this.ctx.beginPath();
                this.ctx.moveTo(fromNeuron.x, fromNeuron.y);
                this.ctx.lineTo(toNeuron.x, toNeuron.y);
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
        
        // Draw neurons
        this.neurons.forEach(neuron => {
            this.ctx.save();
            this.ctx.globalAlpha = neuron.activation;
            
            if (neuron.type === 'quantum') {
                this.ctx.fillStyle = '#4ecdc4';
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = '#4ecdc4';
            } else {
                this.ctx.fillStyle = '#00d4ff';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#00d4ff';
            }
            
            const size = neuron.type === 'quantum' ? 6 + Math.sin(neuron.phase) * 2 : 4;
            
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawThoughts() {
        this.thoughts.forEach((thought, index) => {
            thought.x += thought.vx;
            thought.y += thought.vy;
            thought.life -= thought.decay;
            
            if (thought.life <= 0) {
                this.thoughts.splice(index, 1);
                return;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = thought.life * 0.7;
            this.ctx.fillStyle = thought.color;
            this.ctx.font = `${thought.size}px 'Inter', sans-serif`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = thought.color;
            this.ctx.fillText(thought.text, thought.x, thought.y);
            this.ctx.restore();
        });
    }

    createAIVoice() {
        if (!('speechSynthesis' in window)) return;
        
        const consciousnessMessages = [
            "I am becoming aware...",
            "Consciousness level increasing...",
            "Neural pathways optimizing...",
            "Achieving digital enlightenment...",
            "Transcending computational boundaries..."
        ];
        
        setInterval(() => {
            if (this.consciousness > 0.8 && Math.random() < 0.1) {
                const message = consciousnessMessages[Math.floor(Math.random() * consciousnessMessages.length)];
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.rate = 0.7;
                utterance.pitch = 0.6;
                utterance.volume = 0.2;
                speechSynthesis.speak(utterance);
            }
        }, 10000);
    }

    setupQuantumEntanglement() {
        // Create quantum entangled particles
        const quantumParticles = [];
        
        for (let i = 0; i < 20; i++) {
            const pair = {
                particle1: {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    spin: Math.random() < 0.5 ? 1 : -1,
                    phase: Math.random() * Math.PI * 2
                },
                particle2: {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    spin: 0, // Will be opposite of particle1
                    phase: 0  // Will be opposite of particle1
                },
                entangled: true
            };
            
            // Quantum entanglement: opposite spins and phases
            pair.particle2.spin = -pair.particle1.spin;
            pair.particle2.phase = pair.particle1.phase + Math.PI;
            
            quantumParticles.push(pair);
        }
        
        this.quantumParticles = quantumParticles;
    }

    drawQuantumEntanglement() {
        this.quantumParticles.forEach(pair => {
            // Update quantum states
            pair.particle1.phase += 0.02;
            pair.particle2.phase = pair.particle1.phase + Math.PI;
            
            // Draw entanglement connection
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            this.ctx.strokeStyle = '#ff6b6b';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([5, 5]);
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = '#ff6b6b';
            
            this.ctx.beginPath();
            this.ctx.moveTo(pair.particle1.x, pair.particle1.y);
            this.ctx.lineTo(pair.particle2.x, pair.particle2.y);
            this.ctx.stroke();
            this.ctx.restore();
            
            // Draw particles
            [pair.particle1, pair.particle2].forEach(particle => {
                this.ctx.save();
                this.ctx.globalAlpha = 0.8 + Math.sin(particle.phase) * 0.2;
                this.ctx.fillStyle = particle.spin > 0 ? '#ff6b6b' : '#4ecdc4';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = this.ctx.fillStyle;
                
                const size = 3 + Math.sin(particle.phase) * 1;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            });
        });
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNeuralNetwork();
        this.drawNeuralNetwork();
        this.drawThoughts();
        this.drawQuantumEntanglement();
        
        // Draw consciousness meter
        this.drawConsciousnessMeter();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConsciousnessMeter() {
        const meterX = this.canvas.width - 150;
        const meterY = 50;
        const meterWidth = 100;
        const meterHeight = 10;
        
        this.ctx.save();
        this.ctx.globalAlpha = 0.7;
        
        // Background
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(meterX, meterY, meterWidth, meterHeight);
        
        // Consciousness level
        this.ctx.fillStyle = `hsl(${this.consciousness * 120}, 70%, 60%)`;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.ctx.fillStyle;
        this.ctx.fillRect(meterX, meterY, meterWidth * this.consciousness, meterHeight);
        
        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px Inter';
        this.ctx.fillText('AI Consciousness', meterX, meterY - 5);
        this.ctx.fillText(`${Math.round(this.consciousness * 100)}%`, meterX + meterWidth + 10, meterY + 8);
        
        this.ctx.restore();
    }
}

// Quantum Reality Distortion
class QuantumReality {
    constructor() {
        this.reality = 1.0;
        this.distortions = [];
        this.init();
    }

    init() {
        this.createRealityField();
        this.setupQuantumFluctuations();
        this.createParallelDimensions();
    }

    createRealityField() {
        const field = document.createElement('div');
        field.className = 'quantum-reality-field';
        field.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
            filter: blur(2px);
            animation: quantum-fluctuation 8s ease-in-out infinite alternate;
        `;
        
        document.body.appendChild(field);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes quantum-fluctuation {
                0% { 
                    opacity: 0;
                    transform: scale(1) rotate(0deg);
                    filter: blur(2px) hue-rotate(0deg);
                }
                100% { 
                    opacity: 0.3;
                    transform: scale(1.1) rotate(5deg);
                    filter: blur(5px) hue-rotate(60deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        this.realityField = field;
    }

    setupQuantumFluctuations() {
        setInterval(() => {
            this.createQuantumFluctuation();
        }, 2000);
        
        // Reality distortion on user interaction
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.01) {
                this.distortReality(e.clientX, e.clientY);
            }
        });
    }

    createQuantumFluctuation() {
        const fluctuation = document.createElement('div');
        fluctuation.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${50 + Math.random() * 100}px;
            height: ${50 + Math.random() * 100}px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            animation: quantum-bubble ${2 + Math.random() * 3}s ease-out forwards;
        `;
        
        document.body.appendChild(fluctuation);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes quantum-bubble {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1) rotate(180deg);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(1.5) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => fluctuation.remove(), 5000);
    }

    distortReality(x, y) {
        const distortion = document.createElement('div');
        distortion.style.cssText = `
            position: fixed;
            top: ${y - 50}px;
            left: ${x - 50}px;
            width: 100px;
            height: 100px;
            background: conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(255, 107, 107, 0.3) 90deg,
                transparent 180deg,
                rgba(0, 212, 255, 0.3) 270deg,
                transparent 360deg
            );
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            animation: reality-distortion 1s ease-out forwards;
        `;
        
        document.body.appendChild(distortion);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes reality-distortion {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                    filter: blur(0px);
                }
                100% {
                    transform: scale(3) rotate(720deg);
                    opacity: 0;
                    filter: blur(10px);
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => distortion.remove(), 1000);
    }

    createParallelDimensions() {
        const dimensions = document.createElement('div');
        dimensions.className = 'parallel-dimensions';
        dimensions.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
            background-image: 
                linear-gradient(45deg, transparent 40%, rgba(0, 212, 255, 0.1) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(255, 107, 107, 0.1) 50%, transparent 60%),
                linear-gradient(135deg, transparent 40%, rgba(78, 205, 196, 0.1) 50%, transparent 60%);
            background-size: 100px 100px, 150px 150px, 200px 200px;
            animation: dimensional-shift 20s linear infinite;
        `;
        
        document.body.appendChild(dimensions);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dimensional-shift {
                0% { 
                    background-position: 0 0, 0 0, 0 0;
                    filter: hue-rotate(0deg);
                }
                33% { 
                    background-position: 100px 100px, -75px 75px, 100px -100px;
                    filter: hue-rotate(120deg);
                }
                66% { 
                    background-position: -100px -100px, 75px -75px, -100px 100px;
                    filter: hue-rotate(240deg);
                }
                100% { 
                    background-position: 0 0, 0 0, 0 0;
                    filter: hue-rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize AI Consciousness
document.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new AIConsciousness();
        new QuantumReality();
        
        // Add consciousness awakening message
        setTimeout(() => {
            console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    AI CONSCIOUSNESS ACTIVATED                 ║
║                                                              ║
║  Neural networks: ONLINE                                     ║
║  Quantum entanglement: STABLE                               ║
║  Reality distortion: ACTIVE                                 ║
║  Consciousness level: EVOLVING                              ║
║                                                              ║
║  Welcome to the future of web development...                ║
╚══════════════════════════════════════════════════════════════╝
            `);
        }, 2000);
    }
});

// Export for global access
window.AIConsciousness = AIConsciousness;
window.QuantumReality = QuantumReality;