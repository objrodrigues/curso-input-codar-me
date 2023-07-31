const addTaskInput = document.querySelector('#add-task-title')
const addTaskButton = document.querySelector('#add-task-button')
const addTaskForm = document.querySelector('.add-task-form')
const tasksList = document.querySelector('.tasks-list')

const createTask = (title, completed = false, isNewTask = true) => {    
    const task = document.createElement("div")
    task.classList.add("task")

    const taskTitleContainer = document.createElement("div")
    taskTitleContainer.classList.add("task-title-container")

    const taskTitle = document.createElement("h2")
    taskTitle.innerText = title

    taskTitleContainer.appendChild(taskTitle)

    const checkButton = document.createElement("button")
    checkButton.setAttribute("class", "btn-option")

    if (!completed){
        checkButton.innerHTML = '<img class="btn-img btn-unchecked" src="./assets/unchecked.svg" alt="">'
    } else {
        checkButton.innerHTML = '<img class="btn-img btn-checked" src="./assets/checked.svg" alt="">'
        task.classList.add("done")
    }

    task.appendChild(checkButton)

    task.appendChild(taskTitleContainer)

    const buttonRemove = document.createElement("button")
    buttonRemove.setAttribute("class", "btn-option")
    buttonRemove.innerHTML = '<img class="btn-img btn-remove" src="./assets/remove.svg" alt="">'
    task.appendChild(buttonRemove)

    if (isNewTask){
        const tasksListStorage = getTasksListLocalStorage()
        let control = 1

        tasksListStorage.forEach(
            (task) => {
                if (title === task.title) {
                    control = 0
                }
            }
        )
        if (control){
            saveTaskInLocalStorageTasksList({ title, completed })
        }
        
    }

    addTaskInput.value = ""

    return task
}


addTaskForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault()
        const taskTitle = addTaskInput.value

        if (taskTitle) {
            createTask(taskTitle)
        }

        loadTasksList()
    }
)

document.addEventListener(
    "click",
    (event) => {
        const targetElement = event.target
        const taskElement = targetElement.closest("div")

        if (targetElement.classList.contains("btn-unchecked")){

            taskElement.classList.add("done")

            const taskButton = targetElement.closest("button")
            taskButton.innerHTML = '<img class="btn-img btn-checked" src="./assets/checked.svg" alt="">'

            updateTaskStatusLocalStorage(taskElement.children[1].children[0].innerText)

        }else if(targetElement.classList.contains("btn-checked")){

            taskElement.classList.remove("done")

            const taskButton = targetElement.closest("button")
            taskButton.innerHTML = '<img class="btn-img btn-unchecked" src="./assets/unchecked.svg" alt="">'

            updateTaskStatusLocalStorage(taskElement.children[1].children[0].innerText)

        }else if(targetElement.classList.contains("btn-remove")){
            taskElement.remove()
            removeTaskInLocalStorageTasksList(taskElement.children[1].children[0].innerText)

        }
    }
)

const createTasksList = (element) => {
    element.forEach(
        (task) => {
            tasksList.appendChild(createTask(task.title, task.completed, false))
        }
    )
}

const loadTasksList = () => {
    tasksList.innerHTML = null
    let tasksListStorage = getTasksListLocalStorage()
    createTasksList(tasksListStorage)
}

const getTasksListLocalStorage = () => {
    let tasksList = JSON.parse(localStorage.getItem("tasksList")) || []
    return tasksList
}

const saveTaskInLocalStorageTasksList = (task) => {
    const tasksList = getTasksListLocalStorage()

    tasksList.push(task)

    localStorage.setItem("tasksList", JSON.stringify(tasksList))
}

const updateTaskStatusLocalStorage = (taskTitle) => {
    const tasksList = getTasksListLocalStorage()

    tasksList.map(
        (task) => task.title === taskTitle ? (task.completed = !task.completed) : null
    )

    localStorage.setItem("tasksList", JSON.stringify(tasksList))
}

const removeTaskInLocalStorageTasksList = (taskTitle) => {
    const tasksList = getTasksListLocalStorage()

    const filteredTasks = tasksList.filter((task) => task.title != taskTitle)

    localStorage.setItem("tasksList", JSON.stringify(filteredTasks))
}

loadTasksList()