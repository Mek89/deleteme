class AppDeleteMeComponent extends HTMLElement {
    get text() {
        return this.getAttribute('text');
    }

    get style() {
        return `
            .content {
                user-select: none;
            }

            .content span {
                cursoer: pointer;
            }

            .content span:hover {
                text-decoration: underline;
            }
        `;
    }

    connectedCallback() {
        this.contentEl.innerHTML = this.wrapLetter(this.text);
        this.contentEl.addEventListener('click', this.clickLetter.bind(this));
    }

    disconnectedCallback() {
        this.contentEl.removeEventListener('click');
    }

    wrapLetter(text) {
        return '<span>' + text.split('').join('</span><span>') + '</span>';
    }

    clickLetter(event) {
        const parentEl = event.currentTarget;
        const letterEl = event.target;

        this.hide(letterEl);

        if (this.isEmpty(parentEl)) {
            Array.prototype.forEach.call(parentEl.children, (el) => this.show(el));
        }
    }

    hide(el) {
        el.style.display = 'none';
    }

    show(el) {
        el.style.display = 'initial';
    }

    isEmpty(el) {
        return el.offsetWidth === 0;
    }

    constructor() {
        super();
        this.contentEl = document.createElement('span');
        this.contentEl.classList.add('content');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const styleEl = document.createElement('style');

        styleEl.textContent = this.style;

        shadowRoot.appendChild(this.contentEl);
        shadowRoot.appendChild(styleEl);
    }
}

window.customElements.define('app-delete-me', AppDeleteMeComponent);