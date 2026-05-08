import {
  setLang, getLang, onLangChange, LANGUAGES,
} from '../i18n/i18n.js';

export class LangSelector extends HTMLElement {
  connectedCallback() {
    this._render();
    this._unsub = onLangChange(() => this._render());
  }

  disconnectedCallback() {
    if (this._unsub) this._unsub();
  }

  _render() {
    const current = getLang();
    this.innerHTML = `
      <div class="lang-selector">
        <select class="lang-select" aria-label="Select language">
          ${LANGUAGES.map(l => `
            <option value="${l.code}"${l.code === current ? ' selected' : ''}>
              ${l.flag}
            </option>
          `).join('')}
        </select>
      </div>
    `;
    this.querySelector('.lang-select').addEventListener('change', (e) => {
      setLang(e.target.value);
    });
  }
}