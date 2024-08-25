import {combineReducers} from 'redux';
import LoadingSlice from './LoadingSlice';
import VocabularySlice from "./VocabularySlice";

const RootReducer = combineReducers({
    LoadingSlice: LoadingSlice,
    VocabularySlice: VocabularySlice,
});
export default RootReducer;