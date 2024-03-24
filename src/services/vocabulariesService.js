import {fetchGet, fetchPost} from "../common/fetchCommon";

export const VocabulariesService = {
    getList: () => fetchGet('/vocabularies/list', null),
    addVocabularies: (vocabularies) => fetchPost('/vocabularies/add-all', vocabularies),
    addVocabulary: (vocabularies) => fetchPost('/vocabularies/add', vocabularies),
    updateVocabularies: (vocabularyId) => fetchGet('/vocabularies/update?id=' + vocabularyId, null)
}