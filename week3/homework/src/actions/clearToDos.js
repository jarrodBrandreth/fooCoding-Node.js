'use strict';

function clearToDos(todo, request, response) {
  todo.clear()
    .then(res => {
      console.log(res);
      response.status(200);
      response.end();
    }).catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = clearToDos;
