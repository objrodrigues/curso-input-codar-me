import doneSvg from '../../assets/done.svg'
import undoneSvg from '../../assets/undone.svg'
import editSvg from '../../assets/edit.svg'
import removeSvg from '../../assets/remove.svg'
import './task.css'

export default function Task(props) {

    return (
        <div id={props.id} className="task">
            <h2 className={props.completed ? "task-options-container done" : "task-options-container"}>
                {props.title}
            </h2>
            <section className="task-options-container">
                <button className="button-option"><img className="img-button-option" src={props.completed ? doneSvg : undoneSvg} onClick={props.updateTaskStatus} alt="" /></button>
                <button className="button-option"><img className="img-button-option" src={editSvg} onClick={props.swapEditFormDisplay} alt="" /></button>
                <button className="button-option"><img className="img-button-option" src={removeSvg} onClick={props.removeTask} alt="" /></button>
            </section>
        </div>
    )
}