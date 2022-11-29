import {  createStore,  applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootStore from './reducer/index';



const middlewares = [thunk];
export default createStore(rootStore,composeWithDevTools(applyMiddleware(...middlewares)));