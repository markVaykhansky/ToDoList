import { useState } from "react"
import { UserNameProvider } from './useNameProvider';
import { Link, useParams } from 'react-router-dom';

export function Authenticator() {
    const { someParam2 } = useParams();

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
        <div>{someParam2}</div>
        <span>Please Log In </span>
        <input value={inputValue} onChange={onInputChangeMethod} />
        <button onClick={onLogInButtonClicked}>
            <Link to={'/taskList'}>
                Log In
            </Link>
        </button>
    </div>)
}