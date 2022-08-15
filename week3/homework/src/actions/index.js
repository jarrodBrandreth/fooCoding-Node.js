'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos:  require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  readSingleToDo: require('./readSingleToDo'), // added
  patchToDo: require('./patchToDo'), // added
  clearToDos: require('./clearToDos') // added
};
