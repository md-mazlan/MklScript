class MklLoadingController {
    constructor() {
        // Private properties
        this.loadingOverlay = null;

        // Initialize the controller
        this._injectStyles();
        this._createLoaderElement();
    }

    /**
     * Creates a <style> tag and injects the loader's CSS into the document's head.
     * This is a private method intended for internal use.
     */
    _injectStyles() {
        const styleId = 'mkl-loading-styles';
        // Avoid injecting styles more than once
        if (document.getElementById(styleId)) {
            return;
        }

        const css = `
                    /* Styles for the loading overlay */
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

                    /* Spinner animation */
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

    /**
     * Creates the loading overlay and spinner elements and appends them to the body.
     * This is a private method intended for internal use by the class.
     */
    _createLoaderElement() {
        // Check if the element already exists to avoid duplicates
        if (document.querySelector('.mkl-loading-overlay')) {
            this.loadingOverlay = document.querySelector('.mkl-loading-overlay');
            return;
        }

        // Create the main overlay element
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'mkl-loading-overlay';

        // Create the spinner element
        const spinner = document.createElement('div');
        spinner.className = 'mkl-spinner';

        // Append the spinner to the overlay, and the overlay to the body
        this.loadingOverlay.appendChild(spinner);
        document.body.appendChild(this.loadingOverlay);
    }

    /**
     * Displays the loading overlay.
     */
    show() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('visible');
        }
    }

    /**
     * Hides the loading overlay.
     */
    hide() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('visible');
        }
    }

    /**
     * Simulates a task that takes time and shows the loader during the task.
     * @param {number} duration - The duration in milliseconds to show the loader.
     */
    showFor(duration = 2000) {
        this.show();
        setTimeout(() => {
            this.hide();
        }, duration);
    }
}