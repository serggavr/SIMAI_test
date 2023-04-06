export class AbstractComponent {
  constructor({
    template = null,
    styles = null,
    modifier = null,
    value = null,
    events = null,
  }) {
    this.template = template;
    this.styles = styles;
    this.modifier = modifier;
    this.value = value;
    this.events = events;
    this.#createComponent()
  }

  #createComponent() {
    this.el = document.createElement('div');
    this.el.innerHTML = this.template;
  }

  render() {
    return this.el.children[0]
  }
}