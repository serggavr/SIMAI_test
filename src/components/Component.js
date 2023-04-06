import { AbstractComponent } from "../common/component";

export class Component extends AbstractComponent {
  constructor(element) {
    super(element)
    this.template = element.template;
    this.styles = element.styles;
    this.modifiers = element.modifiers;
    this.value = element.value;
    this.events = element.events;
    if (this.styles) {
      this.#applyStyles();
    }
    if (this.value) {
      this.#applyValue();
    }
    if (this.modifiers) {
      this.#applyModifiers();
    }
    if (this.events) {
      this.#applyEvents();
    }
  }

  #applyStyles() {
    this.stylesheet = document.createElement('style');
    this.stylesheet.appendChild(document.createTextNode(this.styles));
    document.getElementsByTagName("head")[0].appendChild(this.stylesheet);
  }

  #applyModifiers() {
    this.modifiers.forEach(rules => {
      const elements = this.el.querySelectorAll(rules.selector);
      elements.forEach((element) => {
        this.modifiers.forEach((modifier) => {
          modifier.modifiers.forEach((modifier) => {
            element.classList.add(`${rules.selector.replace(/[.#]/g, '')}_${modifier}`);
          })
        })
      })
    })
  }

  #applyEvents() {
    this.events.forEach(rules => {
      const elements = this.el.querySelectorAll(rules.selector);
      elements.forEach((el) => {
        el.addEventListener(rules.event, rules.function);
      })
    })
  }

  #applyValue() {
    this.value.forEach(rules => {
      const elements = this.el.querySelectorAll(rules.selector);
      elements.forEach((el) => {
        el.innerHTML = rules.value;
      })
    })
  }
}