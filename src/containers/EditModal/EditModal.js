import React from 'react';
import { connect } from 'react-redux';
//import { delete_remider, toggle_the_reminder_flag } from '../Actions';
import './EditModal.css';
import moment from 'moment'
import {Del_reminder} from '../../actions/index'
import {Edit_reminder} from "../../actions";

class EditModal extends React.Component {
    constructor ( props ) {
        super ( props );
        this.state={
            showInputField:false
        };

    }
    handleDeleteButton=()=>{
        this.props.dispatchDelete(this.props.date,this.props.index,this.props.state);
        this.props.toggleModal();
    };
    handleEditbutton=()=>{
        this.setState({
            showInputField:true
        })
        //this.props.dispatchEdit(this.props.date,this.props.index,this.props.state);
    };
    handleEdit=(event)=>{
        let reminder=event.target.value;
        this.props.dispatchEdit(this.props.date,this.props.index,reminder,this.props.state)
    }
    render () {
        let date=this.props.date;
         let dateName=moment(date).format('MMMM Do YYYY');
         let reminder=this.props.state[date][this.props.index];

 //       if ( reminderList !== undefined )
            return (
                <div id='myEditModal' className='my-edit-modal'>
                    <div className='my-edit-modal-content'>
                        <div className='my-edit-modal-body'>


                                <div className='right_top'>
                                    <span data-toggle='tooltip' data-placement='bottom' title='Edit this reminder'  className='list-buttons' onClick={ this.handleEditbutton }><i className='fas fa-pen'></i></span>
                                    <span data-toggle='tooltip' data-placement='bottom' title='Delete this reminder'  onClick={ this.handleDeleteButton } className='list-buttons'><i className='fas fa-trash'></i></span>
                                      <span data-toggle='tooltip' data-placement='bottom' title='Close this dialogue box'  onClick={ this.props.toggleModal }><i className='fas fa-times'></i></span>
                                </div>
                            <div className='count-shower'>
                                {this.state.showInputField ?<input type="text" id={"editInputField"} className="form-control" autoFocus={true} placeholder={"Add Title"} required defaultValue={reminder} onBlur={this.handleEdit} /> :<span>{ reminder }</span>}
                            </div>
                        </div>


                        <div className='my-edit-modal-footer'>
                            <ul className='reminder-list'>
                                <li key={0}><i className='far fa-clock'></i><span>{dateName}</span></li>

                            </ul>
                        </div>
                    </div>
                </div>
            );
     }
}


const mapStateToProps = state => ({
    state:state.reducer
});
const mapDispatchToProps = dispatch => ({
    dispatchDelete: (date,index,state) => dispatch(Del_reminder(date,index,state)),
    dispatchEdit: (date,index,reminder,state) => dispatch(Edit_reminder(date,index,reminder,state)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(EditModal);


