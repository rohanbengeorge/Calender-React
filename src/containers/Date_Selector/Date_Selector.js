import {Component} from "react";
import React from "react";
import moment from 'moment';
import {select_date} from '../../actions/index'
import {connect} from 'react-redux';
import './Date_Selector.css'

class DateSelector extends Component {
    constructor(props) {
        super(props);
        this.state={
            selected_date:this.props.date
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            selected_date:nextProps.date,
        })
    }
    handleChange=(event)=>{
        let changed_date=event.target.value;
        this.props.dispatchDate(changed_date);
        this.setState({
            selected_date:changed_date
        });
    }
    handleBackButton=()=>{
        var changed_date = moment(this.state.selected_date).subtract(1, 'months')._d;
        changed_date=moment(changed_date).format("YYYY-MM-DD");
        this.setState({
            selected_date:changed_date
        })
        this.props.dispatchDate(changed_date);
    }
    handleNextButton=()=>{
        var changed_date = moment(this.state.selected_date).add(1, 'months')._d;
        changed_date=moment(changed_date).format("YYYY-MM-DD");
        this.setState({
            selected_date:changed_date
        })
        this.props.dispatchDate(changed_date);
     }
    render() {
        var current_date = moment(this.state.selected_date).format("YYYY-MM-DD");
        let month=moment(this.state.selected_date).format('MMMM YYYY');
    
        return (
            <div className="row  align-middle">
                    <span className={"calender_text col"} ><span className={"Qclass"} >Q</span>-Calender</span>
                    
                    <div className="col d-none d-sm-block .mt-5">
                        <button type="button" className="btn btn-link changeMonth_bttn" onClick={this.handleBackButton}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </button>

                        <span className={"monthAndYear .mt-5"} >{month}</span>
                        
                        <button type="button" className="btn btn-link changeMonth_bttn" onClick={this.handleNextButton}>
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    
                    <div className="col d-none d-sm-none d-md-block  ">
                        <input type="date" required="required"  className={"form-control"} id="data_selector" value={current_date} onChange={this.handleChange}/>
                    </div>
                    
                    <hr/>
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
    mapDispatchToProps)(DateSelector);

