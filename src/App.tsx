import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import ColorModeProvider from './components/ColorModeContext';

const App = () => {
    return (
        <div className="App"
             style={{
                 display: 'flex',
                 flexDirection: 'column',
                 height: '100vh',
                 overflow: 'hidden',
             }}>
            <ColorModeProvider>
                <ResponsiveAppBar />
                <Outlet />
                <Footer />
            </ColorModeProvider>
        </div>
    );
}

export default App;