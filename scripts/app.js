function _(id) {
  return document.getElementById(id);
}

const DOM = function() {
  this.app = _('app');
  this.textInput = _('actions__text-input');
  this.addItemButton = _('actions__add-btn');
  this.taskList = _('task-list');
};

const App = function (page) {
  let data = {
    storageName: 'taskList',
    taskList: null
  };

  let appStorage = function(key, value) {
    if (!value) {
      return localStorage.getItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  };

  let addItem = function() {
    let date = new Date,
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDay(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    
    let item = {
        id: date.valueOf(),
        status: 'new',
        content: page.textInput.value
      };

    let template = `
      <li class="task task--checked">
        <div class="task__inner">
          <i class="task__action task__check fa fa-circle-o"></i>
          <div class="content">Inner text</div>
          <i class="task__action task__remove fa fa-trash"></i>
        </div>
      </li>
    `;

    page.taskList.innerHTML += template;
  };

  let bindEvents = function() {
    let _app = this;

    page.addItemButton.addEventListener('click', addItem, false);

  };

  this.init = function() {
    bindEvents();
  }
};