import { useReducer } from "react";
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

function reducer(state, action) {
    switch(action.type) {
        case 'user-input': 
            return {
                ...state,
                [action.field]: action.value
            }
        case 'password-input': 
            return {
                ...state,
                [action.field]: action.value
            }
        case 'log-in':
            return {
                ...state,
                isLoggingIn: true
            }
        case 'error':
            return {
                ...state,
                [action.field]: action.value
            }
        case 'success':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedInIn: true
            }
    }
}

export function Authenticator({ redirectAddress }) {
    const {
        userName,
        onUserNameChanged
      } = useContext(UserNameContext);    
    
    const [state, dispatch] = useReducer(reducer, {
        userNameInputValue: '',
        passwordInputValue: '',
        isLoggingIn: false
    });
    
    const { userNameInputValue,
        setPasswordInputValue,
        errorString,
        isLoggedInIn
    } = state; 

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
        <button disabled={isLoggingIn} onClick={dispatch('log-in')}>
            {isLoggingIn ? 'Logging in...' : 'Log In'}
        </button>
    </div>)
}