import { MainView } from "./views/main";
import '../static/global.css'

class App {
  constructor(page) {
    this.page = page
    this.render()
  }

  render() {
    const page = this.page
    new page().render()
  }
}

new App(MainView)