import { useState, useContext } from "react"
import { Navigate } from 'react-router-dom';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import { UserNameContext } from "./userNameContext";

export function SignUpForm({ onUserCreated }) {
    console.log('*')

    const [errorString, setErrorString] = useState();
    const [userNameInputValue, setUserNameInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');

    const onSignUpClicked = async () => {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, userNameInputValue, passwordInputValue);
            console.log(JSON.stringify(userCredential));
            const { user } = userCredential;
            const { email } = user;
            onUserCreated(email);
        } catch (error) {
            setErrorString(error.code + ' | ' + error.message);
            console.error("An error has occured signing up")
        }
    }

    const areValidInputs = !passwordInputValue || !userNameInputValue || passwordInputValue === '' || userNameInputValue === '';

    return (
        <div style={{paddingLeft: '50px'}}>
            <h1>Please Sign Up</h1>
            {errorString && <h2 style={{ color: 'red' }}>Error: {errorString}</h2>}
            <div>
                <div>User Name:</div>
                <input value={userNameInputValue} onChange={eventArgs => setUserNameInputValue(eventArgs.target.value)} />
    
                <div>Password:</div>
                <input value={passwordInputValue} onChange={eventArgs => setPasswordInputValue(eventArgs.target.value)} />
            </div>
            <button
                disabled={areValidInputs}
                onClick={onSignUpClicked}>
                Sign Up
            </button>
        </div>)
}

function SignInForm({ redirectAddress }) {
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

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, userNameInputValue, passwordInputValue);
            const { user } = userCredential;
            const { email } = user;
            onUserNameChanged(email);

        } catch(error) {
            setErrorString(error.code + " | " + error.message);
        }
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

export function LogInForm({ redirectAddress }) {
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [newSignedUpUser, setNewSignedUpUser] = useState();

    const onUserCreated = (user) => {
        setIsSignUpForm(false);
        setNewSignedUpUser(user);
    }

    return (
    <div>
        {!!newSignedUpUser && <div>New user {newSignedUpUser} signed-up</div>}
        <button onClick={() => setIsSignUpForm(!isSignUpForm)}>{isSignUpForm ? 'To SignIn' : 'To SignUp'}</button>
        {isSignUpForm ? <SignUpForm onUserCreated={onUserCreated} /> : <SignInForm redirectAddress={redirectAddress} />}
    </div>);
} 