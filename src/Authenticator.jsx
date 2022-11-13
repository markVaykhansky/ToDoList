import { useState } from "react"

export function Authenticator(props) {
    const { onUserLogIn } = props;

    const [inputValue, setInputValue] = useState('');
    
    const onInputChangeMethod = (eventArgs) => {
        const currentInput = eventArgs.target.value;
        setInputValue(currentInput);
      }

    const onLogInButtonClicked = () => {
        onUserLogIn(inputValue);
    }

    return (
    <div>
        <span>Please Log In </span>
        <input value={inputValue} onChange={onInputChangeMethod} />
        <button onClick={onLogInButtonClicked}>Log In</button>
    </div>)
}