import './App.css';
import Example from './views/Example';
import {GridThemeProvider} from '@acrool/react-grid';
import Banner from './components/Banner';


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <Example/>
            </div>
        </GridThemeProvider>
    );
}

export default App;


