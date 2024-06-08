import {fetchGet, fetchPost} from '../common/fetchCommon';

export const VocabulariesService = {
    getList: () => fetchGet('/vocabulary/list', null),
    addVocabularies: (vocabularies) => fetchPost('/vocabulary/add-all', vocabularies),
    addVocabulary: (vocabularies) => fetchPost('/vocabulary/add', vocabularies),
    updateVocabularies: (data) => fetchGet('/vocabulary/update', data),
    getReport: () => fetchGet('/vocabulary/report', null),
    updateReportToday: (lesson) => fetchGet('/vocabulary/report/lesson/' + lesson, null),
    getReportToday: () => fetchGet('/vocabulary/report/today', null),
    login: (data) => fetchPost('/auth/login', data),
    logout: (data) => fetchPost('/auth/logout', data)
};