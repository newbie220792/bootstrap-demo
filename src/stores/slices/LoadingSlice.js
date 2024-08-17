import {createSlice} from '@reduxjs/toolkit';

export const LoadingSlice = createSlice({
    name: 'LoadingSlice',
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, {payload}) => {
            state.isLoading = payload;
        },
    },
});

export default LoadingSlice.reducer;