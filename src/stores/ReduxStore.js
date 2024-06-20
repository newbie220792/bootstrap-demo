import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './slices/RootReducer';


export default configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});
