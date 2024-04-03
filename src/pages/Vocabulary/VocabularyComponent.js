import AddNewVocabularyForm from "./AddNewVocabularyForm";
import VocabulariesCheckComponent from "./VocabulariesCheckComponent";
import TodoListComponent from "./TodoListComponent";

export const VocabularyComponent = () => {
    return (
        <div className={'row me-1 ms-1'}>
            <div className={'col-md-6 col-sm-12'}>
                <VocabulariesCheckComponent/>
            </div>
            {/*<div className={'col-1 border-start'}>*/}
            {/*</div>*/}
            <div className={'col-md-6 col-sm-12'}>
                <AddNewVocabularyForm/>
                <TodoListComponent/>
            </div>
        </div>
    );
};