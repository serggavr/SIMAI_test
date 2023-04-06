import { AbstractView } from "../common/view";
import { Component } from "../components/component";
import { mainMenu, mainMenuList, mainMenuListElement, mainMenuButton, mainTitle, mainTask } from "../constants/templates"

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle('Тестовое задание');
  }

  render() {
    const main = document.createElement('main');
    const title = new Component({ ...mainTitle }).render()
    const contentText = new Component({ ...mainTask }).render()
    const menu = new Component({ ...mainMenu }).render()
    const menuList = new Component({ ...mainMenuList }).render()
    const menuListElement = new Component({ ...mainMenuListElement }).render()
    const blueButton = new Component({
      ...mainMenuButton
    }).render()

    menuListElement.append(blueButton)
    menuList.append(menuListElement)
    menu.append(menuList)
    main.append(title)
    main.append(contentText)
    main.append(menu)

    this.app.append(main);
  }
}