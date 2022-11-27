import { useState } from "react"
import { Link, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./userContext";

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const userToPassword = {
    'Mark': '1234',
    'Mark2': '5678'
}

export function Authenticator({ redirectTo }) {
    const { user, onUserChanged } = useContext(UserContext);

    const [userInputValue, setUserInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if(user) return (<Navigate to={redirectTo} />);

    const onUserInputChange = (eventArgs) => setUserInputValue(eventArgs.target.value)
    const onPasswordInputChange = (eventArgs) => setPasswordInputValue(eventArgs.target.value)

    const onLogInButtonClicked = async () => {
        setLoggingIn(true);
        sleep(3000);

        if(passwordInputValue === '') {
            setErrorMessage('Empty password')
        }

        if(password)

        onUserChanged(userInputValue);

    }

    return (
    <div style={{ paddingLeft: '50px' }}>
        <h1>Please Log In </h1>
        {errorMessage && <h2 style={{color: 'red'}}>{'Error: ' + errorMessage}</h2>}
        <div>User name: </div>
        <input value={userInputValue} onChange={onUserInputChange} />
        <div>Password</div>
        <input type={'password'} value={passwordInputValue} onChange={onPasswordInputChange} />
        <button onClick={onLogInButtonClicked}>{loggingIn ? 'Logging in...' :  'Log In'}</button>
    </div>)
}