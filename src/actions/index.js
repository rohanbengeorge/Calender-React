import moment from "moment";
export function select_date(date){
  return{  type: 'SELECT_DATE',
    date: date,
    } 
};


export function openEditModal(index,isOpen){
    return{  type: 'EDIT_MODAL',
        index: index,
        isOpen:isOpen,
    }
};


export function  Add_reminder(date,reminder,time,state){
    let dateName = moment(date).format("YYYY-MM-DD");
    let arr = state[dateName] ? state[dateName] : [];
    if (reminder===null || typeof(reminder)==="undefined" || reminder==="")
        reminder="(No Title)"
    arr.push(reminder+" "+time);
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


export function  Edit_reminder (date,index,reminder,state) {
    let dateName = moment(date).format("YYYY-MM-DD");
    let arr = state[dateName] ? state[dateName] : [];
    if (reminder===null || typeof(reminder)==="undefined" || reminder==="")
        reminder="(No Title)"
    arr.splice(index,1,reminder);
    return {
        type: 'EDIT_REMINDER',
        date: dateName,
        reminder_array:arr,

    }
};
