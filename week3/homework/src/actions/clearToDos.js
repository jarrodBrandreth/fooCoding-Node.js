'use strict';

function clearToDos(todo, request, response) {
  todo.clear()
    .then(res => {
      response.status(200);
      // console.log(res);
      response.json(res);
      response.end();
    }).catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = clearToDos;
