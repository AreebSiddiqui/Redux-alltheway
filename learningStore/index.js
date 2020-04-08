//createStore is a function that we will download from NPM registry.
//createStore() is a factory function 
function createStore(reducer) {
    // 1. The State Tree.
    // 2. Get the state.
    // 3. listen for the changes in state and responding back.
    // 4. Update the state.

    //1.
    let state
    
    //array which stores all the call back functions passed in subscribe method when its invoked by the object 'store'.
    let listeners  = []

    //2.
    const getState = () => state
    
    //3.
    //pushing the callbacks in an array.
    const subscribe = (listener) => {
        listeners.push(listener)
        //returning a function, which unsubscribe the callback function from the listeners array. 
        return() => {
             listeners = listeners.filter((l) => l !== listener)
        }
    }
    //4.
    const dispatch = (action) => {
        state = reducer(state,action)
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}
//Reducer function 
const todos = (state = [], action) =>{
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }
    return state
}

//passing the object to createStore function
const store = createStore(todos)
store.subscribe(() => {
    console.log("The state is:",store.getState());
})

const action = {
    type: 'ADD_TODO',
    todo: {
        id:0,
        name: 'Learn Redux',
        complete: false,
    }
};

store.dispatch(action);
//State updated in the fashion demonstrated below.
//createStore() -> store -> dispatch(action) -> todos(state, action) -> state