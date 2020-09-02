import React from 'react';

import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import PatientsList from "./components/PatientsList/PatientsList";
import AddPatient from "./components/AddPatient/AddPatient";
import EditPatient from "./components/EditPatient/EditPatient";
import SearchPatient from "./components/SearchPatient/SearchPatient"
import logoMain from "./logo-main.png"

function App() {
    return (
        <div className='app'>
            <nav className='top-menu'>
                <div className='container'>
                    <img className='top-menu-logo' src={logoMain} width="160" height="40"/>
                    <div className='top-menu-item'>
                        <a href='/' className="top-menu-item-a list"></a>
                    </div>
                    <div className='top-menu-item'>
                        <a href='/search' className="top-menu-item-a search"></a>
                    </div>
                    <div className='top-menu-item'>
                        <a href='/add' className="top-menu-item-a add"></a>
                    </div>
                </div>
            </nav>

            <Router>
                <Switch>
                    <Route exact path='/' component={PatientsList}/>
                    <Route path='/add' component={AddPatient}/>
                    <Route path='/edit/:id' component={EditPatient}/>
                    <Route path='/search' component={SearchPatient}/>
                </Switch>
            </Router>

        </div>
);
}

export default App;
