export function createStore(rootReducer, initialState) {

    let state = rootReducer(initialState, {type: '__INIT__'});
    const subscribers = [];

    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subscribers.map(subscriber => {
                subscriber();
            });
        },
        subscribe(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        }
    }
}