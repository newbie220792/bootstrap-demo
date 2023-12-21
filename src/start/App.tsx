import ContentComponent from '../components/ContentComponent';
import Footer from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

const App = () => {
    return (
        <div className="d-flex flex-column">
            <HeaderComponent className="g-light" />
            <ContentComponent className="bg-success">
                <h1>This is content</h1>
            </ContentComponent>
            <Footer className="bg-info footer" />
        </div>
    );
};

export default App;
