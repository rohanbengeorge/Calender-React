import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import List from '../List/List'
import {Add_reminder} from '../../actions'
import './Reminder_modal.css'
class ReminderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            opacity:1,
            remAppinder:null,
            selected_date:null,
            time:""
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            display:'block',
            opacity:1,
            selected_date:nextProps.selected_date,
        });        
    }
    handleClose=(event)=>{
        this.setState({
            display:'none',
            opacity:0,   
        });
        this.props.toggleModal();
    };
    handleSubmit=(event)=>{

        this.props.dispatchReminder(this.props.selected_date,this.state.reminder,this.state.time,this.props.state);
        this.handleClose(event); 
        this.setState(this.state);  
    }
    handleBlurReminder=(event)=>{
        this.setState({
            reminder:event.target.value
        });
    }
    handleBlurTime=(event)=>{
        this.setState({
            time:event.target.value
        });        
    }
    render() {
        const styles = {
            containerStyle: {
                display:this.state.display,
                opacity: this.state.opacity,
            }
        };
        const { containerStyle } = styles;
        return (
            <div id="confirmbox" className="modal fade model_css" role="dialog" style={containerStyle}  >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" >Add Reminders to {this.props.selected_date} </h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.handleClose}>&times;</button>
                        </div>
                        <div className="modal-body my_modal_body">
                            < List date={this.props.selected_date}
                                    handleCloseReminder={this.handleClose}/>

                        </div>
                        <div className="modal-footer">
                            <input type="text" className="form-control" id="input_task" required placeholder={"Add title"} onBlur={this.handleBlurReminder}/>
                            <input type="time" className="form-control" id="time_task" onBlur={this.handleBlurTime} />
                            <button type="button" id="submit_confirm" data-dismiss="modal"  className="btn btn-primary " onClick={this.handleSubmit}>Submit
                            </button>
                        </div>
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
    dispatchReminder: (date,reminder,time,state) => dispatch(Add_reminder(date,reminder,time,state)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ReminderModal);

