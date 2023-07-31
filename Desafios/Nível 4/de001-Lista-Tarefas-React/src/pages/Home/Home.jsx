import addSvg from '../../assets/add.svg'
import searchSvg from '../../assets/search.svg'
import filterSvg from '../../assets/filter.svg'
import Task from '../../components/Task/Task'
import { useState } from 'react'
import EditForm from '../../components/EditForm/EditForm'
import './home.css'
import TasksList from '../../components/TasksList/TasksList'

export default function Home() {

    const generateId = () => {
        return Math.floor(Date.now() * Math.random()).toString(36)
    }

    const getTasksList = () => {
        let tasksList = JSON.parse(localStorage.getItem("tasksList")) || []
        return tasksList
    }

    const [tasksListStorage, setTasksListStorage] = useState(getTasksList())
    const [taskFilter, setTaskFilter] = useState('all')
    const [editFormDisplay, setEditFormDisplay] = useState('none')
    const [taskEditControl, setTaskEditControl] = useState('')


    const updateTaskStatus = (e) => {
        e.preventDefault()
        const taskId = e.target.closest("div").id

        tasksListStorage.map(
            (task) => task.props.id === taskId ? task.props.completed = !task.props.completed : null
        )

        localStorage.setItem("tasksList", JSON.stringify(tasksListStorage))

        setTasksListStorage(getTasksList())
    }

    const removeTask = (e) => {
        e.preventDefault()

        const taskId = e.target.closest("div").id
        const filteredTasks = tasksListStorage.filter((task) => task.props.id != taskId)

        localStorage.setItem("tasksList", JSON.stringify(filteredTasks))

        setTasksListStorage(getTasksList())
    }

    const saveTask = (e) => {
        e.preventDefault()

        if (e.target.closest("form").children[0].value) {
            const taskTitle = e.target.closest("form").children[0].value
            tasksListStorage.push(<Task id={generateId()} title={taskTitle} completed={false} />)

            localStorage.setItem("tasksList", JSON.stringify(tasksListStorage))

            setTasksListStorage(getTasksList())

            e.target.closest("form").children[0].value = ''
        }
    }

    const loadTasks = () => {
        const tasksList = []

        if (tasksListStorage) {

            switch (taskFilter) {
                case "all":
                    tasksListStorage.forEach(
                        (task) => {
                            tasksList.push(
                                <Task
                                    key={task.props.id}
                                    id={task.props.id}
                                    title={task.props.title}
                                    completed={task.props.completed}
                                    updateTaskStatus={updateTaskStatus}
                                    removeTask={removeTask}
                                    swapEditFormDisplay={swapEditFormDisplay}
                                />
                            )
                        }
                    )
                    break
                case "completed":
                    tasksListStorage.forEach(
                        (task) => {
                            if (task.props.completed) {
                                tasksList.push(
                                    <Task
                                        key={task.props.id}
                                        id={task.props.id}
                                        title={task.props.title}
                                        completed={task.props.completed}
                                        updateTaskStatus={updateTaskStatus}
                                        removeTask={removeTask}
                                        swapEditFormDisplay={swapEditFormDisplay}
                                    />
                                )
                            }
                        }
                    )
                    break
                case "not-completed":
                    tasksListStorage.forEach(
                        (task) => {
                            if (!task.props.completed) {
                                tasksList.push(
                                    <Task
                                        key={task.props.id}
                                        id={task.props.id}
                                        title={task.props.title}
                                        completed={task.props.completed}
                                        updateTaskStatus={updateTaskStatus}
                                        removeTask={removeTask}
                                        swapEditFormDisplay={swapEditFormDisplay}
                                    />
                                )
                            }
                        }
                    )
                    break
                default:
                    tasksListStorage.forEach(
                        (task) => {
                            if (task.props.title.toUpperCase() === taskFilter.toUpperCase()) {
                                tasksList.push(
                                    <Task
                                        key={task.props.id}
                                        id={task.props.id}
                                        title={task.props.title}
                                        completed={task.props.completed}
                                        updateTaskStatus={updateTaskStatus}
                                        removeTask={removeTask}
                                        swapEditFormDisplay={swapEditFormDisplay}
                                    />
                                )
                            }
                        }
                    )
                    break
            }
        }
        return tasksList
    }

    const filterTasks = (e) => {
        e.preventDefault()
        setTaskFilter(e.target.value)
    }

    const searchTask = (e) => {
        e.preventDefault()
        if (e.target.closest("div").children[0].value) {
            setTaskFilter(e.target.closest("div").children[0].value)
            e.target.closest("div").children[0].value = ''
        }
    }

    const swapEditFormDisplay = (e) => {
        e.preventDefault()
        setTaskEditControl(e.target.closest("div").id)
        if (editFormDisplay === "flex") {
            setEditFormDisplay("none")
        } else {
            setEditFormDisplay("flex")
        }
    }

    const editTask = (e) => {
        e.preventDefault()
        const newTask = e.target.children[0].children[1].value
        if (newTask) {
            tasksListStorage.forEach(
                (task) => {
                    if (task.props.id === taskEditControl) {
                        task.props.title = newTask
                        e.target.children[0].children[1].value = ''
                    }
                }
            )
        }
        localStorage.setItem("tasksList", JSON.stringify(tasksListStorage))
        swapEditFormDisplay(e)
    }

    return (
        <div className="global-container">
            <div className="options">
                <form id="task-form" className="add-task" onSubmit={saveTask}>
                    <input
                        id="task-input"
                        type="text"
                        placeholder="Adicione uma tarefa"
                        name="taskTitle"
                    />
                    <button className="button-option" type="submit"><img src={addSvg} alt="" /></button>
                </form>

                <div className="search-task">
                    <input id="task-search" type="search" placeholder="Busque uma tarefa" />
                    <button id="task-search-btn" className="button-option"><img src={searchSvg} onClick={searchTask} alt="" /></button>
                </div>

                <div className="filter-task">
                    <select id="filter-task" name="select" onChange={filterTasks}>
                        <option value="all" defaultValue={true}>Todas</option>
                        <option value="completed">Concluídas</option>
                        <option value="not-completed">Não concluídas</option>
                    </select>
                    <img src={filterSvg} alt="" />
                </div>
            </div>

            <TasksList>
                {loadTasks()}
            </ TasksList>

            <EditForm editFormDisplay={editFormDisplay} editTask={editTask} swapEditFormDisplay={swapEditFormDisplay} />
        </div>
    )
}