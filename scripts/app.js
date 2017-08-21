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

  let getListItemTemplate = function(itemData) {
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

  let createTask = function(textContent) {
    let date = new Date,
      item = {
        id: date.valueOf(),
        status: 'new',
        content: textContent,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDay()
        }
      };

      data.taskList.push(item);

      return item;
  }

  let saveAppData = function() {
    appStorage(data.storageName, JSON.stringify(data.taskList));
  };

  let createListItem = function(itemData) {
    let li = document.createElement('li');

    li.id = itemData.id;
    li.className = 'task';
    li.innerHTML = getListItemTemplate(itemData);
    
    return li;
  };

  let clearInput = function(input) {
    input.value = '';
  };

  let addItem = function(input, rootElement) {
    let listItem = createListItem(createTask(input.value));
    rootElement.appendChild(listItem);
    clearInput(input);
    // saveAppData();
  };

  let loadApp = function() {
    data.taskList = JSON.parse(appStorage(data.storageName)) || [];
  };

  let bindEvents = function() {
    page.addItemButton.addEventListener('click', function() {
      addItem(page.textInput, page.taskList);
    }, false);

    page.textInput.addEventListener('keydown', function(event) {
      const ENTER_KEY_CODE = 13;

      if (event.keyCode === ENTER_KEY_CODE) {
        addItem(page.textInput, page.taskList);
      }
    }, false)

  };

  this.init = function() {
    loadApp();
    bindEvents();
  };
};