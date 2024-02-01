// 🐨 you'll need to import react and createRoot from react-dom up here
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/logo';
// 🐨 you'll also need to import the Logo component from './components/logo'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
function App() {
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const loginClickHandler = () => {
        setIsDialogVisible(true);
    }

    const registerClickHandler = () => {
        setIsDialogVisible(true);
    }

    const closeDialog = () => {
        setIsDialogVisible(false);
    }

    return <div>
        <Logo />
        <h1>Bookshelf</h1>
        <div className='buttons'>
            <button onClick={loginClickHandler}>Login</button>
            <button onClick={registerClickHandler}>Register</button>
        </div>
        <Dialog isOpen={isDialogVisible} onDismiss={closeDialog}>
            <button className="close-button" onClick={closeDialog}>
                <span aria-hidden>×</span>
            </button>
            <p>Hello there. I am a dialog</p>
        </Dialog>
    </div>
}


// 🐨 use createRoot to render the <App /> to the root element
const domNode = document.getElementById('root');
const root = createRoot(domNode);

// 💰 find the root element with: document.getElementById('root')
root.render(<App />);
