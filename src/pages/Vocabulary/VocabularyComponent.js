import AddNewVocabularyForm from "./AddNewVocabularyForm";
import VocabulariesCheckComponent from "./VocabulariesCheckComponent";

export const VocabularyComponent = () => {
    return (
        <div className={'row'}>
            <div className={'col-7'}>
                <VocabulariesCheckComponent/>
            </div>
            <div className={'col-4'}>
                <AddNewVocabularyForm/>
            </div>
        </div>
    );
};