import {Component} from "react";
import React from "react";
import connect from "react-redux/es/connect/connect";
import {Del_reminder} from '../../actions/index'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {

            date: null,
        };
    }
    handleDelete=(event)=>{
        let index = event.target.value;
        this.props.dispatchDelete(this.props.date,index,this.props.state)
    }
    render() {
        let date=this.props.date;
        let list=this.props.list
        if (list[date] && list[date].length!==0) {
            let lists=list[date];            
            let list_html;
            if (typeof(lists) === "string") {
                list_html=<li>{lists}</li>
            }
            else {
                const _this=this;
                list_html = lists.map(function (row, index) {
                    return (<li key={index} value={index} className={_this.props.from} onClick={_this.handleDelete}>{row}</li>)
                });
            }
            return (
                <ul className={this.props.from+"_ul"}>
                    {list_html}
                </ul>);
        }
        else if(this.props.from)
            return null;
        else
            return (<p>Empty</p>);

    }
}

const mapStateToProps = state => ({
    state:state.reducer,
    list: state.reducer,


});
const mapDispatchToProps = dispatch => ({
    dispatchDelete: (date,index,state) => dispatch(Del_reminder(date,index,state)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(List);

