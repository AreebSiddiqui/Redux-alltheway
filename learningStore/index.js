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

//APP CODE -> that the we as a developer will write

//Actions
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'




//Action creators 
const addTodoAction = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const RemoveTodoAction = (id) => {
    return {
        type: REMOVE_TODO,
        id
    }
}
const toggleTodoAction = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    }
}


const addGoalAction = (goal) => {
    return {
        type: ADD_GOAL,
        goal
    }
}

const removeGoalAction = (id) => {
    return {
        type: REMOVE_GOAL,
        id
    }
}

//Reducer function to maintain update todos state
const todos = (state = [], action) =>{
    switch(action.type){
        case  'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id )
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({},todo, {complete: !todo.complete})
            )
        default:
            state
    }
}
//Reducer function to maintain update goals state
const goals = (state = [], action) =>{
    switch(action.type){
        case  'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id )
        default:
            state
    }
}

// app() return both the function when invoked / we have to make this function as we can only pass
// one parameter to the createStore(param) function, so we make a function which contain all 
// our reducer functions and passed it as parameter to createStore() 
const app = (state = {}, action) => {
    return {
        todos: todos(state.todos,action),
        goals: goals(state.goals,action)

    }
}


//passing the object to createStore function
const store = createStore(app)
store.subscribe(() => {
    console.log("The state is:",store.getState());
})


store.dispatch(addTodoAction({
        id:1,
        name: 'learn Redux',
        complete: false
    }))

store.dispatch(toggleTodoAction(1))

//State updated in the fashion demonstrated below.
//createStore() -> store -> dispatch(action) -> todos(state, action) -> state
