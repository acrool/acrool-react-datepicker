import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';
import {GridThemeProvider} from '@acrool/react-grid';



function App() {


    return (
        <GridThemeProvider>
            <div className="App">
                <a href="https://github.com/acrool/acrool-react-datepicker" target="_blank" rel="noopener noreferrer">
                    <Github width={40} height={40}/>
                </a>

                <div className="banner-wrapper">
                    <img src="/logo.svg" alt="Acrool React Locale"/>
                    <h1>Acrool React Datepicker</h1>
                </div>

                <Example/>

            </div>
        </GridThemeProvider>
    );
}

export default App;


