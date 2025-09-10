// mkldialog.js - Simple dialog library to replace alert and confirm
(function(global) {
  class MklDialog {
    constructor() {
      this._injectStyles();
      this._createDialogElements();
    }

    _injectStyles() {
      if (document.getElementById('mkl-dialog-styles')) return;
      const style = document.createElement('style');
      style.id = 'mkl-dialog-styles';
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        .mkl-dialog-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(33, 33, 33, 0.32);
          z-index: 99999;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .mkl-dialog-box {
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 3px 16px 0 rgba(60,64,67,0.30), 0 1.5px 6px 0 rgba(60,64,67,0.15);
          min-width: 320px;
          max-width: 92vw;
          padding: 32px 24px 20px 24px;
          text-align: center;
          position: relative;
          font-family: 'Roboto', Arial, sans-serif;
        }
        .mkl-dialog-message {
          margin-bottom: 28px;
          font-size: 1.13rem;
          color: #1a1a1a;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .mkl-dialog-btns {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .mkl-dialog-btn {
          padding: 8px 24px;
          border: none;
          border-radius: 100px;
          font-size: 1rem;
          font-family: 'Roboto', Arial, sans-serif;
          font-weight: 500;
          cursor: pointer;
          background: #6750a4;
          color: #fff;
          box-shadow: none;
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.03em;
        }
        .mkl-dialog-btn.cancel {
          background: #e0e0e0;
          color: #1a1a1a;
        }
        .mkl-dialog-btn:hover {
          background: #4f378b;
        }
        .mkl-dialog-btn.cancel:hover {
          background: #d1c4e9;
        }
      `;
      document.head.appendChild(style);
    }

    _createDialogElements() {
      if (document.getElementById('mkl-dialog-overlay')) {
        this.overlay = document.getElementById('mkl-dialog-overlay');
        this.box = this.overlay.querySelector('.mkl-dialog-box');
        return;
      }
      this.overlay = document.createElement('div');
      this.overlay.id = 'mkl-dialog-overlay';
      this.overlay.className = 'mkl-dialog-overlay';
      this.overlay.innerHTML = `
        <div class="mkl-dialog-box">
          <div class="mkl-dialog-message"></div>
          <div class="mkl-dialog-btns"></div>
        </div>
      `;
      document.body.appendChild(this.overlay);
      this.box = this.overlay.querySelector('.mkl-dialog-box');
    }

    alert(message, options = {}) {
      return new Promise(resolve => {
        this._showDialog(message, [
          { text: options.okText || 'OK', class: '', action: () => resolve(true) }
        ]);
      });
    }

    confirm(message, options = {}) {
      return new Promise(resolve => {
        this._showDialog(message, [
          { text: options.okText || 'OK', class: '', action: () => resolve(true) },
          { text: options.cancelText || 'Cancel', class: 'cancel', action: () => resolve(false) }
        ]);
      });
    }

    _showDialog(message, buttons) {
      this.overlay.style.display = 'flex';
      this.box.querySelector('.mkl-dialog-message').textContent = message;
      const btns = this.box.querySelector('.mkl-dialog-btns');
      btns.innerHTML = '';
      buttons.forEach(btn => {
        const b = document.createElement('button');
        b.className = 'mkl-dialog-btn' + (btn.class ? ' ' + btn.class : '');
        b.textContent = btn.text;
        b.onclick = () => {
          this.overlay.style.display = 'none';
          btn.action();
        };
        btns.appendChild(b);
      });
    }
  }

  global.MklDialog = MklDialog;
})(typeof window !== 'undefined' ? window : this);
