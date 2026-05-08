import { LangSelector } from './elements/lang-selector.js';
import { ProjectDetail } from './elements/project-detail-element.js';
import { initI18n, onLangChange, applyTranslations } from './i18n/i18n.js';

await initI18n();

class TranslationElement extends HTMLElement {
  get partialUrl() { return ''; }

  async connectedCallback() {
    await this._load();
    this._unsub = onLangChange(() => applyTranslations(this));
  }

  disconnectedCallback() {
    if (this._unsub) this._unsub();
  }

  async _load() {
    const res = await fetch(this.partialUrl);
    this.innerHTML = await res.text();
    applyTranslations(this);
  }
}

class AppHeader extends TranslationElement {
  get partialUrl() { return './partials/app-header.html'; }
}

class NavBar extends TranslationElement {
  get partialUrl() { return './partials/navbar.html'; }
}

class FooterMenu extends TranslationElement {
  get partialUrl() { return './partials/footer-menu.html'; }
}

class AppFooter extends TranslationElement {
  get partialUrl() { return './partials/app-footer.html'; }
}

class HeroBlock extends TranslationElement {
  get partialUrl() { return './partials/hero-block.html'; }
}

class ContactForm extends TranslationElement {
  get partialUrl() { return './partials/contact-form.html'; }
}

class OurServices extends TranslationElement {
  get partialUrl() { return './partials/our-services.html'; }
}

class OurPrices extends TranslationElement {
  get partialUrl() { return './partials/our-prices.html'; }
}

class OurTestimonials extends TranslationElement {
  get partialUrl() { return './partials/our-testimonials.html'; }
}

class WhyUs extends TranslationElement {
  get partialUrl() { return './partials/why-us.html'; }
}

class OurProjects extends TranslationElement {
  get partialUrl() { return './partials/our-projects.html'; }
}

customElements.define('lang-selector',    LangSelector);
customElements.define('app-header',       AppHeader);
customElements.define('nav-bar',          NavBar);
customElements.define('footer-menu',      FooterMenu);
customElements.define('app-footer',       AppFooter);
customElements.define('hero-block',       HeroBlock);
customElements.define('contact-form',     ContactForm);
customElements.define('our-services',     OurServices);
customElements.define('our-prices',       OurPrices);
customElements.define('our-testimonials', OurTestimonials);
customElements.define('why-us',           WhyUs);
customElements.define('our-projects',     OurProjects);
customElements.define('project-detail',   ProjectDetail);
