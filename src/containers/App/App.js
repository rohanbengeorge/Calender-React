import React, { Component } from 'react';
import './App.css';
import DateSelector from '../Date_Selector/Date_Selector'
import DateTableContainer from '../Date_TableContainer/Date_TableContainer'
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import {select_date} from '../../actions'

import ReminderModal from '../Reminder_modal/Reminder_modal'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_date:null,
            isVisible:false
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
            this.handleBack();
        else
            this.handleNext();     
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
        
        var selected = new Date(Date.parse(this.props.date));
        var eventText=event.target.textContent
        var dayno=eventText[0];
        if(!isNaN(eventText[1]))
            dayno=dayno+eventText[1];
        if(!isNaN(dayno))
        {
            if(dayno[0]!==" ")
                selected.setDate(dayno);
             else
                dayno=selected.getDate();
            selected=moment(selected).format("YYYY-MM-DD");
            this.setState({
                selected_date:selected,
                isVisible:true
            });
            
        }
    }    
    toggleModal = () => this.setState({ isVisible: false })

    render() {
        
        return (
            <div id="div_container">
                <DateSelector />
                <div onClick={this.handleClick}><DateTableContainer /></div>
                {this.state.isVisible && <ReminderModal 
                                toggleModal={ this.toggleModal } 
                                selected_date={this.state.selected_date}/>}   
            </div>
        );
    }
}


const mapStateToProps = state => ({
    date:state.reducer.date
});

const mapDispatchToProps = dispatch => ({
    dispatchDate: (date) => dispatch(select_date(date)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

