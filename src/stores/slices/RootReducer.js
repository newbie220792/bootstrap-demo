import {combineReducers} from 'redux';
import LoadingSlice from './LoadingSlice';

const RootReducer = combineReducers({
    LoadingSlice: LoadingSlice,
});
export default RootReducer;