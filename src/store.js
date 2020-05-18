import React, {createContext, useReducer} from 'react';

const initialState = {
    data:[]
};

export const store = createContext();
const { Provider } = store;

export const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
        case 'assign':
            return {
                data: action.item
            };
        case 'add':
            
            console.log(state);
            return {
                ...state, 
                val: state.val + action.item
            };
        
        default:
            throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
