import {Component} from "react";
import React from "react";
import TableCell from'../Table_cell/Table_cell'
class TableCol extends Component {    

    render() {
        let cols=[0,1,2,3,4,5,6];
        const _this=this;
        let tablecol = cols.map(function (row, index) {
            return (
                <td key={"row"+index}  className={"table_col"} >
                    <TableCell row={_this.props.row}
                        col={index}
                        firstDay={_this.props.firstDay}
                        totalDays={_this.props.totalDays}/>
                </td>
            )
        });
        return (tablecol);
    }

}
export default TableCol;
