import { useState } from "react"
import { UserNameProvider } from './useNameProvider';
import { Link } from 'react-router-dom';
import { setItem, getItem } from 'localforage';


export function Authenticator() {
    const [inputValue, setInputValue] = useState('');
    
    const onInputChangeMethod = (eventArgs) => {
        const currentInput = eventArgs.target.value;
        setInputValue(currentInput);
      }

    const onLogInButtonClicked = () => {
        UserNameProvider.setUserName(inputValue);
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