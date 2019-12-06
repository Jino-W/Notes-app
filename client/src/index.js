import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {startGetCategories} from '../../actions/categories'
import {startGetNotes} from "../../actions/notes"



const store = configureStore()

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(startGetNotes())
store.dispatch(startGetCategories())

const ele = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));
