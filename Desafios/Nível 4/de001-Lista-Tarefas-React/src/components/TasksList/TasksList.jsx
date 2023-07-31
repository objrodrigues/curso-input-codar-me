import './tasksList.css'

export default function TasksList({children}) {
    return (
        <div className="tasks-list-container">
            <h1 className="tasks-list-title">Lista de tarefas</h1>
            <div className="tasks-container">
                {children}
            </div>
        </div>
    )
}