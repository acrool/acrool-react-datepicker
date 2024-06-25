import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';
import {GridThemeProvider} from '@acrool/react-grid';



function App() {


    const renderHeader = () => {

        const repositoryUrl = 'https://github.com/acrool/acrool-react-datepicker';
        const name = 'Acrool React Datepicker';

        return <>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div className="banner-wrapper">
                <img src="/logo.svg" alt={name}/>
                <h1>{name}</h1>
            </div>
        </>;
    };


    return (
        <GridThemeProvider>
            <div className="App">
                {renderHeader()}

                <Example/>
            </div>
        </GridThemeProvider>
    );
}

export default App;


