import {fetchGet, fetchPost} from '../common/fetchCommon';

export const VocabulariesService = {
    getList: () => fetchGet('/vocabularies/list', null),
    addVocabularies: (vocabularies) => fetchPost('/vocabularies/add-all', vocabularies),
    addVocabulary: (vocabularies) => fetchPost('/vocabularies/add', vocabularies),
    updateVocabularies: (data) => fetchGet('/vocabularies/update', data),
    getReport: () => fetchGet('/vocabularies/report', null),
    updateReportToday: (lesson) => fetchGet('/vocabularies/report/lesson/' + lesson, null),
    getReportToday: () => fetchGet('/vocabularies/report/today', null),
    login: (data) => fetchPost('/vocabularies/report/today', data)
};