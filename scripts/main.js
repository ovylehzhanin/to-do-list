function Main() {
  let page = new pageDOM();
  let app = new App(page);

  app.init();
}

window.addEventListener('DOMContentLoaded', Main, false);