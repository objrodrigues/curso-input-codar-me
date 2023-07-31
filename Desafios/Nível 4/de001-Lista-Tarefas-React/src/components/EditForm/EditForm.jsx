import doneSvg from '../../assets/done.svg'
import removeSvg from '../../assets/remove.svg'
import './editForm.css'


export default function EditForm(props) {



    return (
        <form className="edit-task-container glass-effect" style={{display: props.editFormDisplay}} onSubmit={props.editTask}>
            <div className="edit-task">
                <h1 className="tasks-list-title">Edite sua tarefa</h1>
                <input id="edit-input" className="edit-task-input" type="text" placeholder="Título" />
                <p className="edit-task-alert">adicione um título</p>
                <div className="edit-form-buttons-container">
                    <button className="button-option" type="submit"><img id="add-edit-btn" className="img-button-option button-edit-done" src={doneSvg} alt="" /></button>
                    <button className="button-option"><img id="cancel-edit-btn" className="img-button-option" src={removeSvg} onClick={props.swapEditFormDisplay} alt="" /></button>
                </div> 
            </div>
        </form>
    )
}