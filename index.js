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

class ContactForm extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/contact-form.html');
        this.innerHTML = await res.text();
    }
}

class OurServices extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/our-services.html');
        this.innerHTML = await res.text();
    }
}

class OurPrices extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/our-prices.html');
        this.innerHTML = await res.text();
    }
}

class HeroBlock extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/hero-block.html');
        this.innerHTML = await res.text();
    }
}

class OurTestimonials extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/our-testimonials.html');
        this.innerHTML = await res.text();
    }
}

class WhyUs extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/why-us.html');
        this.innerHTML = await res.text();
    }
}

class OurProjects extends HTMLElement {
    async connectedCallback() {
        const res = await fetch('./partials/our-projects.html');
        this.innerHTML = await res.text();
    }
}



customElements.define('footer-menu', FooterMenu);
customElements.define('nav-bar', NavBar);
customElements.define('contact-form', ContactForm);
customElements.define('our-services', OurServices);
customElements.define('our-prices', OurPrices);
customElements.define('hero-block', HeroBlock);
customElements.define('our-testimonials', OurTestimonials);
customElements.define('why-us', WhyUs);
customElements.define('our-projects', OurProjects);