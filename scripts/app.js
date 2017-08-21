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
        <i class="task__action task__check fa 
          ${itemData.status === 'new' ? 'fa-square-o' : 'fa-check-square-o'}">
        </i>
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
        id: String(date.valueOf()),
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
    li.className = itemData.status === 'new' ? 'task' : 'task task--checked';
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
    saveAppData();
  };

  let removeTask = function(array, id) {
    let index = array.findIndex(item => item.id === id);

    array.splice(index, 1);
    saveAppData();
  };

  let checkTask = function(array, id) {
    let index = array.findIndex(item => item.id === id);

    array[index].status = array[index].status === 'new' ? 'done' : 'new';
    saveAppData();
  };

  let loadApp = function() {
    let fragment = document.createDocumentFragment();

    data.taskList = JSON.parse(appStorage(data.storageName)) || [];

    for (let i = 0, end = data.taskList.length; i < end; i++) {
      fragment.appendChild(createListItem(data.taskList[i]));
    }

    page.taskList.appendChild(fragment);
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
    }, false);

    page.taskList.addEventListener('click', function(event) {
      let target = event.target,
        parent = target.parentNode.parentNode;
      // checking
      if (target.classList.contains('task__check')) {
        checkTask(data.taskList, parent.id);

        if (target.classList.contains('fa-square-o')) {
          target.classList.remove('fa-square-o');
          target.classList.add('fa-check-square-o');
        } else {
          target.classList.remove('fa-check-square-o');
          target.classList.add('fa-square-o');
        }

        parent.classList.toggle('task--checked');
      }
      // removing
      if (event.target.classList.contains('task__remove')) {
        removeTask(data.taskList, parent.id);

        parent.classList.add('task--removed');
        
        setTimeout(function() {
          page.taskList.removeChild(parent);
        }, 200);
      }
    }, false);

  };

  this.init = function() {
    loadApp();
    bindEvents();
  };
};