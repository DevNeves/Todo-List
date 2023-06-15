const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search')

const addTodo = inputValue => {
  if (inputValue.length < 3 || inputValue === '') {
    alert('Insira um TODO válido!')
    return
  }

  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center bg-dark" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-trash="${inputValue}"></i>
    </li>`
}

const removeTodo = clickedElement => {
  const dataTrashWasClicked = clickedElement.dataset.trash
  
  if (!dataTrashWasClicked) {
    return
  }

  const todo = document.querySelector(`[data-todo="${clickedElement.dataset.trash}"`)
  todo.remove()
}

const searchTodo = (todos, inputValue) => {
  todos.forEach(todo => {
    const shouldBeVisible = todo.textContent.toLowerCase().includes(inputValue)
    todo.classList.add(shouldBeVisible ? 'd-flex' : 'd-none')
    todo.classList.remove(shouldBeVisible ? 'd-none' : 'd-flex')
  })
}

formAddTodo.addEventListener('submit' , event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()
  addTodo(inputValue)

  event.target.reset()
})

todosContainer.addEventListener('click' , event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
})

formSearch.addEventListener('input' , event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  searchTodo(todos, inputValue)
}) 
