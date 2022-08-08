'use strict';

// TODO: Write the homework code in this file

const fs = require('fs');

const [, , cmd, ...args] = process.argv;

const dataFile = 'list.json';

const printHelp = () => {
  //   console.log(`Usage: node index.js [options]
  // FooCoding Node.js Week 2 - Lecture To-Do App
  // Options:
  //   list          read all to-dos
  //   write [to-do] add to-do
  //   help          show this help text
  //   `);
  fs.readFile('help.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
};

const printList = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    console.log(`${obj.length} items in your to do list`);
    obj.forEach((item) => {
      console.log(item);
    });
  });
};

const addItem = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    args.forEach((item) => obj.push(item));
    fs.writeFile(dataFile, JSON.stringify(obj), (err) => {
      if (err) throw err;
      console.log(args.join(' ') + ' added to your list');
    });
  });
};

const removeItem = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const removedItem = obj.splice(args, 1);
    fs.writeFile(dataFile, JSON.stringify(obj), (err) => {
      if (err) throw err;
      console.log(`removed ${removedItem} from task list`);
    });
  });
};

const updateItem = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const indexToUpdate = obj.indexOf(args[0]);
    if (indexToUpdate >= 0) {
      const updatedItem = obj.splice(indexToUpdate, 1, args[1]);
      fs.writeFile(dataFile, JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log(`updated ${updatedItem} with ${args[1]}`);
      });
    } else {
      console.log('that item is not in your list');
    }
  });
};

switch (cmd) {
  case 'help':
    printHelp();
    break;
  case 'list':
    printList();
    break;
  case 'add':
    addItem();
    break;
  case 'remove':
    removeItem();
    break;
  case 'reset':
    fs.writeFile(dataFile, JSON.stringify([]), (err) => {
      if (err) throw err;
      console.log('List reset');
    });
    break;
  case 'update':
    updateItem();
    break;

  default:
    printHelp();
    break;
}
