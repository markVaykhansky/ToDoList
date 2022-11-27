import { useState } from "react"
import { UserNameProvider } from './useNameProvider';
import { Link, Navigate } from 'react-router-dom';
import { setItem, getItem } from 'localforage';
import { useContext } from "react";
import { UserContext } from "./userContext";


export function Authenticator({ redirectTo }) {
    console.log("Auth");
    const x = useContext(UserContext);
    console.log(x);

    const { user, onUserChanged } = x;

    const [inputValue, setInputValue] = useState('');
    
    const onInputChangeMethod = (eventArgs) => {
        const currentInput = eventArgs.target.value;
        setInputValue(currentInput);
      }

    const onLogInButtonClicked = () => {
        onUserChanged(inputValue);
    }

    if(user) {
        return (<Navigate to={redirectTo} />);
    }

    return (
    <div>
        <span>Please Log In </span>
        <input value={inputValue} onChange={onInputChangeMethod} />
        <button onClick={onLogInButtonClicked}>
            <Link to={'/taskList'}>
                Log In
            </Link>
        </button>
    </div>)
}