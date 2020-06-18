const fs = require("fs");
const generateID = () => new Date().getTime();

const writeTodos = (todos) => {
  fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (error) => {
    if (error) throw error;

    console.log("Файл создан/перезаписан!");
  });
};

const readTodos = (callback = () => { }) => {
  fs.readFile("./todos.json", "utf-8", (error, content) => {
    if (error) throw error;
    callback(JSON.parse(content));
  });
};

const createTodo = (title) => {
  const todo = {
    id: generateID(),
    title,
    completed: false,
  };

  readTodos((todos) => {
    const newTodos = [...todos, todo];

    writeTodos(newTodos);
  });
};

const updateTodo = (id, body) => {
  readTodos((todos) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...body };
      } else {
        return todo;
      }
    });

    writeTodos(newTodos);
  });
};

const filterTodos = (callback = () => { }, compliteType) => {

  fs.readFile("./todos.json", "utf-8", (error, content) => {
    if (error) throw error;
    let filterContent = []
    if (compliteType === 'true') {
      filterContent = JSON.parse(content).filter(todo => todo.completed === true)
      console.log(filterContent)
    }
    if (compliteType === 'false') {
      filterContent = JSON.parse(content).filter(todo => todo.completed === false)
    }
    callback(filterContent);
  })
}

const delTodo = (id) => {
  let newTodoList = []
  fs.readFile("./todos.json", "utf-8", (error, content) => {
    if (error) throw error;
    newTodoList = JSON.parse(content).filter(todo => todo.id !== +id)
    writeTodos(newTodoList)
  })

}
module.exports = {
  writeTodos,
  readTodos,
  createTodo,
  updateTodo,
  filterTodos,
  delTodo
};
