// mklsnackbar-lib.js
// MklSnackbar as a reusable library (UMD pattern)
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser global
        root.MklSnackbar = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class MklSnackbar {
        constructor() {
            this.container = null;
            this._injectCSS();
            this._createContainer();
        }
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
        _createContainer() {
            const container = document.createElement('div');
            container.id = 'snackbar-main-container';
            document.body.appendChild(container);
            this.container = container;
        }
        _getColorFromType(type) {
            switch (type) {
                case 'success': return '#4CAF50';
                case 'error': return '#f44336';
                case 'warning': return '#ff9800';
                default: return '#333';
            }
        }
        show({ message = 'Default message', type = 'default', background = null } = {}) {
            if (!this.container) return;
            const snackbarItem = document.createElement('div');
            snackbarItem.className = 'snackbar-item';
            snackbarItem.textContent = message;
            const color = background ? background : this._getColorFromType(type);
            snackbarItem.style.backgroundColor = color;
            this.container.appendChild(snackbarItem);
            setTimeout(() => {
                snackbarItem.remove();
            }, 3000);
        }
    }
    return MklSnackbar;
}));
