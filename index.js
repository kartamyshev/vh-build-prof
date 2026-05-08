class NavBar extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/navbar.html');
        this.innerHTML = await res.text();
    }
}

class FooterMenu extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/footer-menu.html');
        this.innerHTML = await res.text();
    }
}

customElements.define('footer-menu', FooterMenu);
customElements.define('nav-bar', NavBar);