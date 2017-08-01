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
  this.name = 'test';

  this.init = function() {
    console.log(this.name);
  }
};