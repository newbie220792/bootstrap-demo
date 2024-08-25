import {createSlice} from '@reduxjs/toolkit';

export const VocabularySlice = createSlice({
    name: 'VocabularySlice',
    initialState: {
        numberOfRevise: 0
    },
    reducers: {
        updateNumberOfWord: (state, {payload}) => {
            state.numberOfRevise = payload;
        },
    },
});

export default VocabularySlice.reducer;