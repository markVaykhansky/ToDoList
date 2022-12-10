import { useState, useContext } from "react"
import { Navigate } from 'react-router-dom';
import { UserNameContext } from "./userNameContext";

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const userNameToPassword = {
    'Mark': '1234',
    'Mark2': '6789'
};

export function Authenticator({ redirectAddress }) {
    const {
        userName,
        onUserNameChanged
    } = useContext(UserNameContext);    
    
    const [userNameInputValue, setUserNameInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [errorString, setErrorString] = useState();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const onLogInButtonClicked = async () => {
        setIsLoggingIn(true);
        await sleep(2000);

        if(!userNameInputValue) {
            setErrorString('No user name entered');
            setIsLoggingIn(false);
            return;
        }

        if(!passwordInputValue) {
            setErrorString('No password entered');
            setIsLoggingIn(false);
            return;
        }

        if(!Object.keys(userNameToPassword).includes(userNameInputValue)) {
            setErrorString('Username does not exist');
            setIsLoggingIn(false);
            return;
        }

        if(userNameToPassword[userNameInputValue] !== passwordInputValue) {
            setErrorString("Password doesn't match");
            setIsLoggingIn(false);
            return;
        }

        onUserNameChanged(userNameInputValue);
    }

    if(userName) {
        return (<Navigate to={redirectAddress} />)
    }

    return (
    <div style={{paddingLeft: '50px'}}>
        <h1>Please Log In </h1>
        {errorString && <h2 style={{ color: 'red' }}>Error: {errorString}</h2>}
        <div>
            <div>User Name:</div>
            <input value={userNameInputValue} onChange={eventArgs => setUserNameInputValue(eventArgs.target.value)} />

            <div>Password:</div>
            <input value={passwordInputValue} onChange={eventArgs => setPasswordInputValue(eventArgs.target.value)} />
        </div>
        <button disabled={isLoggingIn} onClick={onLogInButtonClicked}>
            {isLoggingIn ? 'Logging in...' : 'Log In'}
        </button>
    </div>)
}