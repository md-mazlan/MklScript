// mklsnackbar.js
// MklSnackbar: Flexible Snackbar library with Bootstrap-like API and color classes (UMD)
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
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
                #snackbar-container {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1055;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                .snackbar {
                    min-width: 250px;
                    max-width: 350px;
                    color: #fff;
                    text-align: center;
                    border-radius: 0.375rem;
                    padding: 16px;
                    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
                    font-size: 1rem;
                    font-family: inherit;
                    animation: slide-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, 
                               slide-out 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) 2.6s forwards;
                }
                .bg-primary { background-color: #0d6efd !important; }
                .bg-secondary { background-color: #6c757d !important; }
                .bg-success { background-color: #198754 !important; }
                .bg-danger { background-color: #dc3545 !important; }
                .bg-warning { background-color: #ffc107 !important; color: #212529 !important; }
                .bg-info { background-color: #0dcaf0 !important; color: #212529 !important; }
                .bg-light { background-color: #f8f9fa !important; color: #212529 !important; }
                .bg-dark { background-color: #212529 !important; }
                @keyframes slide-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-out {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(30px); }
                }
            `;
            document.head.appendChild(style);
        }
        _createContainer() {
            let container = document.getElementById('snackbar-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'snackbar-container';
                document.body.appendChild(container);
            }
            this.container = container;
        }
        show(message, options = {}) {
            if (!this.container) return;
            // Options: type, className, delay, style (object)
            const {
                type = 'primary',
                className = '',
                delay = 3000,
                style = {}
            } = options;
            const snackbarItem = document.createElement('div');
            snackbarItem.className = `snackbar bg-${type} ${className}`.trim();
            snackbarItem.textContent = message;

            // Apply custom inline styles if provided
            if (style && typeof style === 'object') {
                Object.entries(style).forEach(([key, value]) => {
                    snackbarItem.style[key] = value;
                });
            }

            this.container.appendChild(snackbarItem);
            setTimeout(() => {
                snackbarItem.remove();
            }, delay);
        }
        // Bootstrap-like helpers
        primary(message, opts = {}) { this.show(message, { ...opts, type: 'primary' }); }
        secondary(message, opts = {}) { this.show(message, { ...opts, type: 'secondary' }); }
        success(message, opts = {}) { this.show(message, { ...opts, type: 'success' }); }
        danger(message, opts = {}) { this.show(message, { ...opts, type: 'danger' }); }
        warning(message, opts = {}) { this.show(message, { ...opts, type: 'warning' }); }
        info(message, opts = {}) { this.show(message, { ...opts, type: 'info' }); }
        light(message, opts = {}) { this.show(message, { ...opts, type: 'light' }); }
        dark(message, opts = {}) { this.show(message, { ...opts, type: 'dark' }); }
    }
    return MklSnackbar;
}));
