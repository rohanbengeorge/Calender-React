import React, { Component } from 'react';
import './App.css';
import DateSelector from '../Date_Selector/Date_Selector'
import DateTableContainer from '../Date_TableContainer/Date_TableContainer'
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import {openEditModal, select_date} from '../../actions'

import ReminderModal from '../Reminder_modal/Reminder_modal'
import EditModal from "../EditModal/EditModal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_date:null,
            isReminderVisible:false,
            isEditModalVisible:false,
        };
    }
    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
    }


    handleScroll=(event)=>{
        if(event.deltaY<0)
            !this.state.isVisible && this.handleBack();
        else
            !this.state.isVisible && this.handleNext();     
    }
    handleBack=(event)=>{
        let cur_date=this.props.date;
        let changed_date = moment(cur_date).subtract(1, 'months')._d;
        changed_date=moment(changed_date).format("YYYY-MM-DD");
        this.props.dispatchDate(changed_date);
    } 
    handleNext=(event)=>{
        let cur_date=this.props.date;
        let changed_date = moment(cur_date).add(1, 'months')._d;
        changed_date=moment(changed_date).format("YYYY-MM-DD");
        this.props.dispatchDate(changed_date);
    }  
    handleClick=(event)=>{
        if(!event.target.innerHTML.startsWith("<tr") && !event.target.innerHTML.startsWith("<td")) {
            let selected = new Date(Date.parse(this.props.date));
            let eventText = event.target.innerText;
            let dayno = eventText[0];
            if (!isNaN(eventText[1]) && eventText[0] < 4)
                dayno = dayno + eventText[1];
            if (!isNaN(dayno)) {
                if (dayno[0] !== " ")
                    selected.setDate(dayno);
                else
                    dayno = selected.getDate();
                selected = moment(selected).format("YYYY-MM-DD");
                this.setState({
                    selected_date: selected,
                    isReminderVisible: true
                });

            }
        }
    }    
    toggleReminderModal = () => this.setState({ isReminderVisible: false })
    toggleEditModal = () => {
        this.setState({ isReminderVisible: false });
        this.props.dispatchEditModal(-1);
    }
    render() {
        
        return (
            <div id="div_container">
                <DateSelector />
                <div onClick={this.handleClick}><DateTableContainer /></div>
                {this.state.isReminderVisible && !this.props.isEditModalOpen && <ReminderModal
                                toggleModal={ this.toggleReminderModal }
                                selected_date={this.state.selected_date}/>}
                {this.props.isEditModalOpen && <EditModal index={this.props.index}
                                                         date={this.state.selected_date}
                                                         toggleModal={this.toggleEditModal}/>}

            </div>
        );
    }
}


const mapStateToProps = state => ({
    date:state.reducer.date,
    isEditModalOpen:state.reducer.isEditModalOpen,
    index:state.reducer.index
});

const mapDispatchToProps = dispatch => ({
    dispatchDate: (date) => dispatch(select_date(date)),
    dispatchEditModal: (index) => dispatch(openEditModal(index,false)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

