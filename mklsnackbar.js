/**
         * A reusable Snackbar class that can display multiple notifications simultaneously.
         */
class MklSnackbar {
    constructor() {
        // The main container for all snackbar instances
        this.container = null;

        // Create the necessary elements and styles on instantiation
        this._injectCSS();
        this._createContainer();
    }

    /**
     * Injects the necessary CSS for the snackbar container and items.
     * @private
     */
    _injectCSS() {
        if (document.getElementById('snackbar-styles')) return;

        const style = document.createElement('style');
        style.id = 'snackbar-styles';
        style.textContent = `
                    #snackbar-main-container {
                        position: fixed;
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1000;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }

                    .snackbar-item {
                        min-width: 250px;
                        max-width: 350px;
                        color: #fff;
                        text-align: center;
                        border-radius: 8px;
                        padding: 16px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        font-size: 1rem;
                        animation: slide-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, 
                                   slide-out 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) 2.6s forwards;
                    }

                    @keyframes slide-in {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slide-out {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                    }
                `;
        document.head.appendChild(style);
    }

    /**
     * Creates the main snackbar container and appends it to the body.
     * @private
     */
    _createContainer() {
        const container = document.createElement('div');
        container.id = 'snackbar-main-container';
        document.body.appendChild(container);
        this.container = container;
    }

    /**
     * Gets the appropriate color based on a predefined notification type.
     * @param {string} type - The type of message ('success', 'error', 'warning').
     * @returns {string} The hex color code.
     * @private
     */
    _getColorFromType(type) {
        switch (type) {
            case 'success': return '#4CAF50'; // Green
            case 'error': return '#f44336'; // Red
            case 'warning': return '#ff9800'; // Orange
            default: return '#333'; // Default dark grey
        }
    }

    /**
     * Creates and shows a new snackbar instance.
     */
    show({ message = 'Default message', type = 'default', background = null } = {}) {
        if (!this.container) return;

        // Create a new element for this specific snackbar
        const snackbarItem = document.createElement('div');
        snackbarItem.className = 'snackbar-item';

        // Set the message text
        snackbarItem.textContent = message;

        // Determine the background color. A provided background color takes precedence.
        const color = background ? background : this._getColorFromType(type);
        snackbarItem.style.backgroundColor = color;

        // Add the new snackbar to the container
        this.container.appendChild(snackbarItem);

        // Set a timeout to remove the element after animations complete
        setTimeout(() => {
            snackbarItem.remove();
        }, 3000); // Duration matches the animation delays
    }
}