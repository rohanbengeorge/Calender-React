import {Component} from "react";
import React from "react";
import moment from 'moment';
import List from '../List/List'
import {connect} from 'react-redux';
import "./Table_cell.css"

class TableCell extends Component {
    render() {
        let firstDay =this.props.firstDay;
        firstDay = parseInt(firstDay,10);
        let dayno=(this.props.row *7)+this.props.col-firstDay+1;
        
        if(dayno<1 || dayno>this.props.totalDays)
            dayno=null;

        var selected_date= new Date(Date.parse(this.props.date));     
        if (selected_date.getDate() === dayno ){
            selected_date.setDate(dayno);  
            dayno=<div className={"change_color"}> {dayno}</div>;
        }
         else  
            selected_date.setDate(dayno);    

        selected_date=moment(selected_date).format("YYYY-MM-DD");
        let classLabel;    
        dayno===null ?  classLabel = "table_cell" : classLabel="table_cell selected_cell"
        
        return (        
            <div className={classLabel} >
                {dayno}                
                < List date={selected_date} from={"reminder_list"} />                             
            </div>
        );
    }
}

const mapStateToProps = state => ({
    date:state.reducer.date,
});

export default connect(
    mapStateToProps,
    null)(TableCell);

