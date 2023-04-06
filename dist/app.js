(function () {
  'use strict';

  class AbstractView {
    constructor() {
      this.app = document.getElementById('root');
    }

    setTitle(title) {
      document.title = title;
    }
  }

  class AbstractComponent {
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
      this.#createComponent();
    }

    #createComponent() {
      this.el = document.createElement('div');
      this.el.innerHTML = this.template;
    }

    render() {
      return this.el.children[0]
    }
  }

  class Component extends AbstractComponent {
    constructor(element) {
      super(element);
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
            });
          });
        });
      });
    }

    #applyEvents() {
      this.events.forEach(rules => {
        const elements = this.el.querySelectorAll(rules.selector);
        elements.forEach((el) => {
          el.addEventListener(rules.event, rules.function);
        });
      });
    }

    #applyValue() {
      this.value.forEach(rules => {
        const elements = this.el.querySelectorAll(rules.selector);
        elements.forEach((el) => {
          el.innerHTML = rules.value;
        });
      });
    }
  }

  const mainTitle = {
    template: "<h1 class='title'></h1>",
    value: [{ selector: '.title', value: 'Тестовое задание' }],
  };

  const mainTask = {
    template: `<div class='task'>
    <h3>Описание</h3>
    <p>Необходимо написать класс Component для генерации элементов на странице сайта. В текущем задании нет необходимости генерировать всевозможные html-элементы. Достаточно будет генерации нескольких видов кнопок. 
    В зависимости от переданных параметров класс Component должен создавать разный вид одного и того же элемента страницы.</p>
    <ol>
    <p>На вход классу Component приходят данные о создаваемом элементе:</p>
      <li><p>Шаблон – шаблон (html представление) элемента страницы;</p></li>
      <li><p>Параметры отображения – с их помощью можно менять внешний вид элемента страницы;</p></li>
      <li><p>Модификаторы – предназначены для «тонкой настройки» отображения элемента страницы;</p></li>
      <li><p>Текстовые значения, которые могут содержать элементы страницы;</p></li>
      <li><p>События – перечень действий на каждое событие.</p></li>
    </ol>
    <p>На выходе должны получить сгенерированный элемент страницы, созданный классом Component в зависимости от входных данных.</p>
    <ul>
    <p>Функциональные требования:</p>
      <li><p>Использование нативного JavaScript;</p></li>
    </ul>
  </div>`,
  };

  const mainMenu = {
    template: "<div class='menu'></div>",
    styles: `
  .menu {
    position: absolute;
    bottom: 0;
    right: 50%;
    left: 50%;
  }
  `
  };

  const mainMenuList = {
    template: "<ul class='menu__list'></ul>",
    styles: `
  .menu__list {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
  }
  `
  };

  const mainMenuListElement = {
    template: "<li class='menu__list-element'></li>",
    styles: `.menu__list-element {display: flex; flex-direction: column;}`
  };

  const mainMenuButton = {
    template: `<button class="button">Кнопка</button>`,
    styles: `
    .button {
      width: 130px;
      height: 40px;
      padding: 10px 25px;
      color: black;
      background: transparent;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      font-weight: 500;
      box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
      7px 7px 20px 0px rgba(0,0,0,.1),
      4px 4px 5px 0px rgba(0,0,0,.1);
      outline: none;
      transition: all 0.3s ease;
    }
    .button_color-blue {
      color: #fff;
      background: rgb(6,14,131);
      background: linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%);
      border: none;
    }
    .button_color-blue:hover {
      background: rgb(0,3,255);
      background: linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%);
    }
    .button_size-big {
      width: 260px;
      height: 80px;
      font-size: 28px;
    }
    `,
    modifiers: [{ selector: '.button', modifiers: ['color-blue', 'event-change-size'] }],
    value: [{ selector: '.button', value: 'Кнопочка' }],
    events: [
      {
        selector: '.button_event-change-size', event: 'click', function: (e) => {
          e.target.classList.toggle('button_size-big');
        }
      },
    ]
  };

  class MainView extends AbstractView {
    constructor() {
      super();
      this.setTitle('Тестовое задание');
    }

    render() {
      const main = document.createElement('main');
      const title = new Component({ ...mainTitle }).render();
      const contentText = new Component({ ...mainTask }).render();
      const menu = new Component({ ...mainMenu }).render();
      const menuList = new Component({ ...mainMenuList }).render();
      const menuListElement = new Component({ ...mainMenuListElement }).render();
      const blueButton = new Component({
        ...mainMenuButton
      }).render();

      menuListElement.append(blueButton);
      menuList.append(menuListElement);
      menu.append(menuList);
      main.append(title);
      main.append(contentText);
      main.append(menu);

      this.app.append(main);
    }
  }

  class App {
    constructor(page) {
      this.page = page;
      this.render();
    }

    render() {
      const page = this.page;
      new page().render();
    }
  }

  new App(MainView);

})();
