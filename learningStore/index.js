//createStore() is a factory function 
function createStore() {
    // 1. The State Tree.
    // 2. Get the state.
    // 3. listen for the changes in state and responding back.
    // 4. Update the state.

    //1.
    const state
    
    //array which stores all the call back functions passed in subscribe method when its invoked by the object 'store'.
    const listeners  = []

    //2.
    const getState = () => state

    //pushing the callbacks in an array.
    const subscribe = (listener) => {
        listeners.push(listener)
    }

    return {
        getState,
        subscribe
    }

}
// creating an object name 'store' 
const store = createStore()
// invoking subscribe method on the object and passing a call back function
store.subscribe(()=> {
    console.log("The new state is", store.getState)
})

// invoking subscribe method on the object and passing a call back function
store.subscribe(()=> {
    console.log("The state has been changed")
})