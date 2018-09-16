import {Component} from "react";
import React from "react";
import connect from "react-redux/es/connect/connect";

import EditModal from '../EditModal/EditModal'
import {openEditModal} from "../../actions";
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        };
    }
    handleOpenModale=(event)=>{

        let index = event.target.value[0];
        this.props.dispatchEditModal(index)
        // this.setState({
        //     isModalVisible: true,
        //     index:event.target.value
        // })
        //this.props.handleCloseReminder && this.props.handleCloseReminder();
        //this.props.dispatchDelete(this.props.date,index,this.props.state)
    };


    render() {
        let date=this.props.date;
        let list=this.props.list
        if (list[date] && list[date].length!==0) {
            let lists=list[date];            
            let list_html;
            const _this=this;
            list_html = lists.map(function (row, index) {
                return (<li key={index} value={index+date[8]+date[9]}  data-toggle='tooltip' data-placement='bottom' title='Click to Edit or Delete' className={_this.props.from + " selected_cell"}
                            onClick={ _this.handleOpenModale}>{row}</li>)
            });

            return (
                <div>
                <ul className={this.props.from+"_ul"}>
                    {list_html}
                </ul>
                    {this.state.isModalVisible && <EditModal index={this.state.index}
                                                    date={this.props.date}
                                                    toggleModal={this.toggleModal}/>}
                </div>    );
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
    dispatchEditModal: (index) => dispatch(openEditModal(index,true)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(List);

