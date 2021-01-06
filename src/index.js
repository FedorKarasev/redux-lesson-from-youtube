import {applyMiddleware, createStore} from 'redux';
import { increment, decrement, asyncIncrement, changeTheme } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import './styles.css';

const counterEl = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();
    counterEl.textContent = state.counter;
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled;
    });
})

store.dispatch({type: '__INIT__'});