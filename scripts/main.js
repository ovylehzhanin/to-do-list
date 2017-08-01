function Main() {
  let page = new DOM();
  let app = new App(page);

  app.init();
}

window.addEventListener('DOMContentLoaded', Main, false);