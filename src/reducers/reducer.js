import moment from "moment";
const intial_state ={};
intial_state.date = moment().format("YYYY-MM-DD");

export const reducer = (state = intial_state, action) => {
    switch (action.type) {
        case 'SELECT_DATE': {
            return {...state, date: action.date};
        }

        case 'ADD_REMINDER': {           
            return {...state, [action.date]: action.reminder_array};     
        }

        case 'DELETE_REMINDER': {
           return {...state, [action.date]: action.reminder_array};
        }
        case 'EDIT_MODAL':{
            return {...state, index: action.index,isEditModalOpen:action.isOpen};
        }
        case 'EDIT_REMINDER': {
            return {...state, [action.date]: action.reminder_array};
        }
          
        default:
            return state;
    }
};
