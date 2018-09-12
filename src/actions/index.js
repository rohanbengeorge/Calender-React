import moment from "moment";
export function select_date(date){
  return{  type: 'SELECT_DATE',
    date: date,
    } 
};

export function  Add_reminder(date,reminder,time,state){
    let dateName = moment(date).format("YYYY-MM-DD");
    let arr = state[dateName] ? state[dateName] : [];
    arr.push(reminder+" "+time)
    return {
        type: 'ADD_REMINDER',
        date: dateName,
        reminder_array:arr,
    }
};

export function  Del_reminder (date,index,state) {
    let dateName = moment(date).format("YYYY-MM-DD");
    let arr = state[dateName] ? state[dateName] : [];
    arr.splice(index,1);
    return {
        type: 'DELETE_REMINDER',
        date: dateName,
        reminder_array:arr,

    }
};
