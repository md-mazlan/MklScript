// mkl-loading-controller-lib.js
// MklLoadingController as a reusable library (UMD pattern)
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser global
        root.MklLoadingController = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class MklLoadingController {
        constructor() {
            this.loadingOverlay = null;
            this._injectStyles();
            this._createLoaderElement();
        }
        _injectStyles() {
            const styleId = 'mkl-loading-styles';
            if (document.getElementById(styleId)) return;
            const css = `
                .mkl-loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }
                .mkl-loading-overlay.visible {
                    opacity: 1;
                    visibility: visible;
                }
                .mkl-spinner {
                    border: 6px solid #f3f3f3;
                    border-top: 6px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: mkl-spin 1s linear infinite;
                }
                @keyframes mkl-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        }
        _createLoaderElement() {
            if (document.querySelector('.mkl-loading-overlay')) {
                this.loadingOverlay = document.querySelector('.mkl-loading-overlay');
                return;
            }
            this.loadingOverlay = document.createElement('div');
            this.loadingOverlay.className = 'mkl-loading-overlay';
            const spinner = document.createElement('div');
            spinner.className = 'mkl-spinner';
            this.loadingOverlay.appendChild(spinner);
            document.body.appendChild(this.loadingOverlay);
        }
        show() {
            if (this.loadingOverlay) {
                this.loadingOverlay.classList.add('visible');
            }
        }
        hide() {
            if (this.loadingOverlay) {
                this.loadingOverlay.classList.remove('visible');
            }
        }
        showFor(duration = 2000) {
            this.show();
            setTimeout(() => {
                this.hide();
            }, duration);
        }
    }
    return MklLoadingController;
}));
