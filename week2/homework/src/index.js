'use strict';

// TODO: Write the homework code in this file

const fs = require('fs');

const [, , cmd, ...args] = process.argv;

const dataFile = 'list.json';

const printHelp = () => {
  fs.readFile('help.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
};

const printList = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    console.log(`${obj.length} items in your to do list `);
    obj.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  });
};

const addItem = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    obj.push(args.join(' '));
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
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < obj.length) {
      const removedItem = obj.splice(index, 1);
      fs.writeFile(dataFile, JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log(`removed ${removedItem} from task list`);
      });
    }
    else {
      console.log('invalid list item');
    }
  });
};

const updateItem = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < obj.length) {
      const updatedItem = obj.splice(index, 1, args[1]);
      fs.writeFile(dataFile, JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log(`updated ${updatedItem} with ${args[1]}`);
      });
    }
    else {
      console.log('invalid list number');
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
