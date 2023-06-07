const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearchInput = document.querySelector('.form-search input')

const addNewTodo = inputValue => {
  if (!inputValue) {
    // alert ('Por favor insira um TODO antes de adicionar')  
    return
  }
    
  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center bg-dark" data-selected-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-trash="${inputValue}"></i>
    </li>`    
}

const cleanInput = inputValue => {
  inputValue.reset()
}

const hiddenTodo = (todos, inputValue) => {
  todos
    .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
      todo.classList.add('hidden')
      todo.classList.remove('d-flex')  
    })  
}
  
const showTodo = (todos, inputValue) => {
  todos
    .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
      todo.classList.add('d-flex')
      todo.classList.remove('hidden')   
    })
}

const addTodo = event => {
  event.preventDefault()
    
  const inputValueToNewTODO = event.target.add.value.trim()
  addNewTodo(inputValueToNewTODO)
  cleanInput(event.target)
}

const deletedTodo = event => {
  const clickedElement = event.target
  const dataTrash = clickedElement.dataset.trash
  const selectedTodo = document.querySelector(`[data-selected-todo='${dataTrash}']`)
    
  if (dataTrash) {
    selectedTodo.remove()      
  }
}

const searchTodo = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todosToArray = Array.from(todosContainer.children)
  
  hiddenTodo(todosToArray, inputValue)
  showTodo(todosToArray, inputValue)
}

formAddTodo.addEventListener('submit' , addTodo)
todosContainer.addEventListener('click' , deletedTodo)
formSearchInput.addEventListener('input' , searchTodo)