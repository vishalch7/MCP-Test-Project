// Typing Text Animation
class TypingTextAnimation {
    constructor(options = {}) {
        this.options = {
            elementId: options.elementId || 'typing-text',
            texts: options.texts || ['Welcome to my website', 'Check out my cool animations', 'Enjoy your stay!'],
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            delayBetweenTexts: options.delayBetweenTexts || 2000,
            loop: options.loop !== undefined ? options.loop : true,
            cursor: options.cursor !== undefined ? options.cursor : true,
            cursorChar: options.cursorChar || '|',
            cursorBlinkSpeed: options.cursorBlinkSpeed || 500
        };
        
        this.element = null;
        this.cursorElement = null;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Get or create the element
        this.element = document.getElementById(this.options.elementId);
        
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.id = this.options.elementId;
            document.body.appendChild(this.element);
        }
        
        // Style the element
        this.element.style.display = 'inline-block';
        this.element.style.minHeight = '1.2em';
        
        // Add cursor if enabled
        if (this.options.cursor) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.textContent = this.options.cursorChar;
            this.cursorElement.style.display = 'inline-block';
            this.cursorElement.style.marginLeft = '2px';
            this.cursorElement.style.animation = `cursor-blink ${this.options.cursorBlinkSpeed}ms infinite`;
            this.cursorElement.style.color = '#6ab7ff';
            this.cursorElement.style.fontWeight = 'bold';
            this.cursorElement.style.textShadow = '0 0 5px rgba(52, 97, 255, 0.5)';
            
            // Add cursor blink animation if not already added
            if (!document.querySelector('#typing-animations-style')) {
                const style = document.createElement('style');
                style.id = 'typing-animations-style';
                style.textContent = `
                    @keyframes cursor-blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    
                    @keyframes slide-in {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(0); }
                    }
                    
                    @keyframes slide-out {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-100%); }
                    }
                    
                    @keyframes pulse-glow {
                        0%, 100% { box-shadow: 0 0 10px rgba(52, 97, 255, 0.3); }
                        50% { box-shadow: 0 0 20px rgba(52, 97, 255, 0.5); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.element.parentNode.insertBefore(this.cursorElement, this.element.nextSibling);
        }
        
        // Start typing
        this.type();
    }
    
    type() {
        if (this.isPaused) {
            setTimeout(() => this.type(), 100);
            return;
        }
        
        const currentText = this.options.texts[this.currentTextIndex];
        const isComplete = this.isDeleting 
            ? this.currentCharIndex === 0 
            : this.currentCharIndex === currentText.length;
        
        // If complete, toggle deleting state or move to next text
        if (isComplete) {
            if (this.isDeleting) {
                // Move to next text
                this.currentTextIndex = this.options.loop 
                    ? (this.currentTextIndex + 1) % this.options.texts.length 
                    : Math.min(this.currentTextIndex + 1, this.options.texts.length - 1);
                
                // Stop if reached the end and not looping
                if (!this.options.loop && this.currentTextIndex === this.options.texts.length - 1 && this.currentCharIndex === currentText.length) {
                    return;
                }
                
                this.isDeleting = false;
                
                // Pause before typing next text
                setTimeout(() => this.type(), this.options.delayBetweenTexts);
                return;
            } else {
                // Pause before deleting
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.options.delayBetweenTexts);
                return;
            }
        }
        
        // Update current char index
        this.currentCharIndex = this.isDeleting 
            ? this.currentCharIndex - 1 
            : this.currentCharIndex + 1;
        
        // Update text
        this.element.textContent = currentText.substring(0, this.currentCharIndex);
        
        // Schedule next update
        const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    setTexts(texts) {
        this.options.texts = texts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }
}

// Initialize the typing text animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing typing container
    const existingContainer = document.getElementById('typing-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Create a notification-style banner for the typing text
    const banner = document.createElement('div');
    banner.id = 'typing-container';
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.background = 'rgba(255, 255, 255, 0.85)';
    banner.style.backdropFilter = 'blur(8px)';
    banner.style.borderBottom = '2px solid rgba(52, 97, 255, 0.5)';
    banner.style.color = '#333';
    banner.style.padding = '12px 0';
    banner.style.textAlign = 'center';
    banner.style.fontFamily = 'Poppins, sans-serif';
    banner.style.fontSize = '1rem';
    banner.style.fontWeight = '600';
    banner.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    banner.style.zIndex = '1000';
    banner.style.animation = 'slide-in 0.5s ease-out, pulse-glow 2s infinite';
    
    // Create a wrapper for the typing text
    const textWrapper = document.createElement('div');
    textWrapper.style.display = 'flex';
    textWrapper.style.justifyContent = 'center';
    textWrapper.style.alignItems = 'center';
    textWrapper.style.gap = '10px';
    
    // Add an icon
    const icon = document.createElement('span');
    icon.innerHTML = '✨';
    icon.style.fontSize = '1.2rem';
    icon.style.color = '#3461ff';
    icon.style.animation = 'rotate-icon 3s infinite linear';
    
    // Add icon rotation animation if not already added
    if (!document.querySelector('#icon-rotation-animation')) {
        const style = document.createElement('style');
        style.id = 'icon-rotation-animation';
        style.textContent = `
            @keyframes rotate-icon {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create the typing text element
    const typingElement = document.createElement('div');
    typingElement.id = 'typing-text';
    typingElement.style.display = 'inline-block';
    typingElement.style.background = 'linear-gradient(90deg, #6ab7ff, #3461ff)';
    typingElement.style.webkitBackgroundClip = 'text';
    typingElement.style.webkitTextFillColor = 'transparent';
    typingElement.style.backgroundClip = 'text';
    typingElement.style.textFillColor = 'transparent';
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '10px';
    closeButton.style.top = '50%';
    closeButton.style.transform = 'translateY(-50%)';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#3461ff';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.opacity = '0.7';
    closeButton.style.transition = 'opacity 0.2s';
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.7';
    });
    
    closeButton.addEventListener('click', () => {
        banner.style.animation = 'slide-out 0.5s ease-in forwards';
        setTimeout(() => {
            banner.remove();
        }, 500);
    });
    
    // Assemble the components
    textWrapper.appendChild(icon);
    textWrapper.appendChild(typingElement);
    banner.appendChild(textWrapper);
    banner.appendChild(closeButton);
    
    // Add to body
    document.body.prepend(banner);
    
    // Initialize the animation
    new TypingTextAnimation({
        elementId: 'typing-text',
        texts: [
            'Welcome to my beautiful website!',
            'Check out these cool animations!',
            'Hover over elements to see effects!',
            'Made with ❤️ and JavaScript'
        ],
        typeSpeed: 80,
        deleteSpeed: 40,
        delayBetweenTexts: 2000
    });
}); 