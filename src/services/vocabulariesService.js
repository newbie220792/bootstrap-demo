import {fetchGet, fetchPost} from "../common/fetchCommon";

const VocabulariesService = {
  getList : () => fetchGet('', null),
  addNewVocabularies : (vocabularies) => fetchPost('', vocabularies)
}