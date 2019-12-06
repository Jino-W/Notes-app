import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import notesReducer from "../reducers/notes"
import categoriesReducer from '../reducers/categories'
import noteReducer from "../reducers/note"
import categoryReducer from '../reducers/category'


const configureStore = ()=>{
    const store= createStore(combineReducers({
        notes: notesReducer,
        note: noteReducer,
        categories: categoriesReducer,
        category: categoryReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore