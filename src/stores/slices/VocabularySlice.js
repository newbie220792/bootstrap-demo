import {createSlice} from '@reduxjs/toolkit';

export const VocabularySlice = createSlice({
    name: 'VocabularySlice',
    initialState: {
        numberOfRevise: 0,
        numberOfNewWord: 0
    },
    reducers: {
        updateNumberOfWord: (state, {payload}) => {
            state.numberOfRevise = payload;
        },
        updateNumberOfNewWord: (state, {payload}) => {
            state.numberOfNewWord = payload;
        },
    },
});

export default VocabularySlice.reducer;