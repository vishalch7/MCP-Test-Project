// Animated Particles Background
class ParticlesAnimation {
    constructor(options = {}) {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.options = {
            count: options.count || 100,
            color: options.color || '#6ab7ff',
            maxSize: options.maxSize || 5,
            speed: options.speed || 0.5,
            connectParticles: options.connectParticles || true,
            connectDistance: options.connectDistance || 150,
            containerId: options.containerId || 'particles-container'
        };
        
        this.init();
    }
    
    init() {
        // Create container if it doesn't exist
        let container = document.getElementById(this.options.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.options.containerId;
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.overflow = 'hidden';
            document.body.prepend(container);
        }
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.display = 'block';
        container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * this.options.maxSize + 1,
                speedX: (Math.random() - 0.5) * this.options.speed,
                speedY: (Math.random() - 0.5) * this.options.speed,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#6ab7ff', '#3461ff', '#4f7cff', '#8ac4ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Connect particles
            if (this.options.connectParticles) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const distance = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + 
                        Math.pow(p.y - p2.y, 2)
                    );
                    
                    if (distance < this.options.connectDistance) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(246, 211, 101, ${1 - distance / this.options.connectDistance})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the particles animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesAnimation({
        count: 80,
        color: '#6ab7ff',
        maxSize: 4,
        speed: 0.4,
        connectDistance: 140
    });
}); 