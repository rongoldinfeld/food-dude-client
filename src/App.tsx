import React from 'react';
import './App.css';
import Feed from './feed/feed';
import Navbar from './navbar/navbar';

function App() {
    return (
        <div id="root">
            <Navbar />
            <Feed />
        </div>
    );
}

export default App;
