const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearchTodo = document.querySelector('.form-search')

const addNewTodo = inputValue => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-trash="${inputValue}"></i>
    </li>`

    return
  }

  alert('Insira um valor')
}

const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }
}

const filteredTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodo = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodo : !matchedTodo
  })

const manipulateClasses = (filteredTodos, classToAdd, classToRemove) => {
  filteredTodos
    .forEach(todo => {
      todo.classList.add(classToAdd)
      todo.classList.remove(classToRemove)
    })
}
const hiddeTodo = (todos, inputValue) => {
  const todosToHide = filteredTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodo = (todos, inputValue) => {
  const todosToShow = filteredTodos(todos, inputValue, true)
  manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const addTodo = event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()
  addNewTodo(inputValue)
  event.target.reset()
}

const removeTodos = event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
}

const searchTodos = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hiddeTodo(todos, inputValue)
  showTodo(todos, inputValue)
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodos)
formSearchTodo.addEventListener('keyup', searchTodos)
