import {Component} from "react";
import React from "react";
import TableCol from "../Table_col/Table_col";
import connect from "react-redux/es/connect/connect";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Date_Table.css'
class DateTable  extends Component {

    render() {
        let firstDay = parseInt(moment(this.props.date).startOf('month').format('d'),10);
        let totalDays=parseInt(moment(this.props.date).daysInMonth(),10);
        let totalrows= (firstDay+totalDays)/7;
        let rows=[]
        for (let i=0;i<=totalrows;i++)
            rows.push(i)

        let tablerow = rows.map(function (row, index) {
            return (
                <tr key={"row"+index}>
                    <TableCol row={index}
                                firstDay={firstDay}
                                totalDays={totalDays}/>
                </tr>
            )
        });
        return (
            <table className="table table-bordered table-striped calender_table">
                <thead>
                    <tr>
                        <td>SUN</td>
                        <td>MON</td>
                        <td>TUE</td>
                        <td>WED</td>
                        <td>THU</td>
                        <td>FRI</td>
                        <td>SAT</td>
                    </tr>
                </thead>
                <tbody>
                    {tablerow}
                </tbody>
            </table>
        );
    }
}



const mapStateToProps = state => ({
    date:state.reducer.date,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(DateTable);


