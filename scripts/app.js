function _(id) {
  return document.getElementById(id);
}

const pageDOM = function() {
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

  let getItemTemplate = function(itemData) {
    return `
      <div class="task__inner">
        <i class="task__action task__check fa fa-circle-o"></i>
        <div class="content">${itemData.content}
          <small>${itemData.date.year}/${itemData.date.month}/${itemData.date.day}</small>
        </div>
        <i class="task__action task__remove fa fa-trash"></i>
      </div>
    `;
  };

  let saveAppData = function() {
    appStorage(data.storageName, JSON.stringify(data.taskList));
  };

  let addItem = function() {
    let date = new Date;
    let li = document.createElement('li');
    let item = {
      id: date.valueOf(),
      status: 'new',
      content: page.textInput.value,
      date: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay()
      }
    };

    li.id = item.id;
    li.className = 'task';
    li.innerHTML = getItemTemplate(item);
    
    data.taskList.push(item);
    page.taskList.append(li);
    page.textInput.value = '';
    // saveAppData();
  };

  let loadApp = function() {
    data.taskList = JSON.parse(appStorage(data.storageName)) || [];
    console.log(JSON.stringify(data.taskList));
  };

  let bindEvents = function() {
    let _app = this;

    page.addItemButton.addEventListener('click', addItem, false);
    
    page.textInput.addEventListener('keydown', function(event) {
      const ENTER_KEY_CODE = 13;

      if (event.keyCode === ENTER_KEY_CODE) {
        addItem();
      }
    }, false)
  };

  this.init = function() {
    loadApp();
    bindEvents();
  };
};