// Floating Icon Animation
class FloatingIcon {
    constructor(options = {}) {
        this.options = {
            iconType: options.iconType || 'star', // 'star', 'circle', 'triangle', 'custom'
            customSvg: options.customSvg || '',
            size: options.size || 60,
            color: options.color || '#3461ff',
            position: options.position || 'top-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
            margin: options.margin || 30,
            floatRange: options.floatRange || 15,
            rotationSpeed: options.rotationSpeed || 3,
            pulseIntensity: options.pulseIntensity || 0.1,
            containerId: options.containerId || 'floating-icon-container'
        };
        
        this.element = null;
        this.container = null;
        this.angle = 0;
        this.scale = 1;
        this.increasing = true;
        
        this.init();
    }
    
    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.id = this.options.containerId;
        this.container.style.position = 'fixed';
        this.container.style.zIndex = '10';
        
        // Set position
        switch(this.options.position) {
            case 'top-left':
                this.container.style.top = `${this.options.margin}px`;
                this.container.style.left = `${this.options.margin}px`;
                break;
            case 'top-right':
                this.container.style.top = `${this.options.margin}px`;
                this.container.style.right = `${this.options.margin}px`;
                break;
            case 'bottom-left':
                this.container.style.bottom = `${this.options.margin}px`;
                this.container.style.left = `${this.options.margin}px`;
                break;
            case 'bottom-right':
                this.container.style.bottom = `${this.options.margin}px`;
                this.container.style.right = `${this.options.margin}px`;
                break;
        }
        
        // Create the icon
        this.element = document.createElement('div');
        this.element.style.width = `${this.options.size}px`;
        this.element.style.height = `${this.options.size}px`;
        this.element.style.transition = 'transform 0.1s ease-out';
        this.element.style.cursor = 'pointer';
        
        // Add SVG based on icon type
        let svg = '';
        
        switch(this.options.iconType) {
            case 'star':
                svg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill="${this.options.color}" stroke="#FFF" stroke-width="1" />
                </svg>`;
                break;
            case 'circle':
                svg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="${this.options.color}" stroke="#FFF" stroke-width="1" />
                </svg>`;
                break;
            case 'triangle':
                svg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L22 20H2L12 2Z" fill="${this.options.color}" stroke="#FFF" stroke-width="1" />
                </svg>`;
                break;
            case 'custom':
                svg = this.options.customSvg;
                break;
        }
        
        this.element.innerHTML = svg;
        this.container.appendChild(this.element);
        document.body.appendChild(this.container);
        
        // Add click event
        this.element.addEventListener('click', () => this.handleClick());
        
        // Start animation
        this.animate();
    }
    
    animate() {
        // Floating animation
        this.angle += 0.02;
        const yOffset = Math.sin(this.angle) * this.options.floatRange;
        
        // Rotation
        const rotation = (this.angle * this.options.rotationSpeed) % 360;
        
        // Pulse effect
        if (this.increasing) {
            this.scale += 0.001 * this.options.pulseIntensity;
            if (this.scale >= 1 + this.options.pulseIntensity) {
                this.increasing = false;
            }
        } else {
            this.scale -= 0.001 * this.options.pulseIntensity;
            if (this.scale <= 1 - this.options.pulseIntensity) {
                this.increasing = true;
            }
        }
        
        // Apply transformations
        this.element.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg) scale(${this.scale})`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleClick() {
        // Create burst animation
        if (!document.querySelector('#burst-animation')) {
            const style = document.createElement('style');
            style.id = 'burst-animation';
            style.textContent = `
                @keyframes burst {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                        box-shadow: 0 0 0 0 rgba(52, 97, 255, 0.7);
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                        box-shadow: 0 0 0 30px rgba(52, 97, 255, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create a burst animation on click
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.width = `${this.options.size * 1.5}px`;
        burst.style.height = `${this.options.size * 1.5}px`;
        burst.style.borderRadius = '50%';
        burst.style.backgroundColor = this.options.color;
        burst.style.opacity = '0.6';
        burst.style.animation = 'burst 0.6s ease-out forwards';
        
        this.container.appendChild(burst);
        
        // Remove burst element after animation completes
        setTimeout(() => {
            burst.remove();
        }, 600);
        
        // Trigger any custom click behavior
        if (typeof this.options.onClick === 'function') {
            this.options.onClick();
        }
    }
}

// Initialize the floating icon when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FloatingIcon({
        iconType: 'star',
        size: 50,
        color: '#3461ff',
        position: 'top-right',
        margin: 25,
        floatRange: 12,
        rotationSpeed: 3,
        pulseIntensity: 0.08
    });
}); 