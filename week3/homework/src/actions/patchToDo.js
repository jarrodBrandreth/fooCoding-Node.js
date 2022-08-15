'use strict';

const deserializeTodo = require('./deserializeTodo');

function patchToDo(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ done, description }) => {
      const id = request.params.id;
      return todo.patch(id, done, description);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = patchToDo;
