import {fetchGet, fetchPost} from '../common/fetchCommon';

export const VocabulariesService = {
    getList: () => fetchGet('/vocabulary/list', null, true),
    addVocabularies: (vocabularies) => fetchPost('/vocabulary/add-all', vocabularies, null, true),
    addVocabulary: (vocabularies) => fetchPost('/vocabulary/add', vocabularies, null, true),
    updateVocabularies: (data) => fetchGet('/vocabulary/update', data, false),
    getReport: () => fetchGet('/vocabulary/report', null, true),
    updateReportToday: (lesson) => fetchGet('/vocabulary/report/lesson/' + lesson, null, true),
    getReportToday: () => fetchGet('/vocabulary/report/today', null, true),
    login: (data) => fetchPost('/auth/login', data, null, true),
    logout: (data) => fetchPost('/auth/logout', data, null, true)
};