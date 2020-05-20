import React from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeColors } from './styles/themes';

function App() {
    return (
        <div className="App" style={{ backgroundColor: ThemeColors.black }}>
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>

                    <Route path="/test">
                        <Test />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}

const Test: React.FC = () => {
    return (
        <>
            <h1>Hello this is a test</h1>
        </>
    );
};

export default App;
