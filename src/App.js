import './App.css';
import { useEffect, useState } from 'react';
import { toDoListServer } from './toDoListServer';
import { Route } from 'react-router-dom';
import { Authenticator } from './Authenticator';

// 6/11/22
// 1. Create a username inside the App component
// 2. Authenticate the user through the App component
//  2.1. Once authenticated let the ToDo list component know 
//  2.2. Print a "sync" logo that means that the to-do list is syncing
// 3. After an item is added sync it to the server through a callback
// -------------------------------------
// 13/11/22
// Go other the code we already wrote
// Create a user login
// Create a route  
//    -- All todo items
//    -- SingleToDoItemPage
//    -- Settings

function ToDoListItem (props) {
  const { itemText, onDeleteItemHandler } = props;
  const [isItemChecked, setIsItemChecked] = useState(false);

  const onCheckboxChanged = () => {
    setIsItemChecked(!isItemChecked);
  }
  const checkboxStyle = isItemChecked ? { textDecoration: 'line-through' } : {}

  return (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={checkboxStyle}>{itemText}</div>
    <input type="checkbox" onChange={onCheckboxChanged}></input>
    <button onClick={() => onDeleteItemHandler(itemText)}>Delete</button>
  </div>
  );
}

function TaskList(props) {
  const { inSync, user, onItemAddedCallback, preExistingUserTasks } = props;

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const onAddItemClicked = () => {
    onItemAddedCallback(input);
    setTasks([...tasks, input]);
    setInput('');
  }

  useEffect(() => { 
    if(!preExistingUserTasks) return; 

    setTasks([...tasks, ...preExistingUserTasks]);
  }, [preExistingUserTasks]);

  const onInputChangeMethod = (eventArgs) => {
    const currentInput = eventArgs.target.value;
    setInput(currentInput);
  }

  const onDeleteItem = (itemIndex) => {
    const toDoItemsDuplicate = [...tasks]
    toDoItemsDuplicate.splice(itemIndex, 1);
    setTasks(toDoItemsDuplicate);
  }

  const isEmptyToDoList = tasks.length === 0;
  

  return (<div>
    <h1>{user}'s ToDo List</h1>
    <h2 style={{color: inSync ? "green" : "orange"}}>{inSync ? "Connected" : "Is syncing..."}</h2>
    <input id="my-input" onChange={onInputChangeMethod} value={input} />
    <button onClick={onAddItemClicked}>Add Task</button>
    <div id="Items">
      {isEmptyToDoList ? <div>No Tasks</div> :
       tasks.map((item, index) => (
        <ToDoListItem 
          key={index} 
          itemText={item} 
          onDeleteItemHandler={onDeleteItem} />
      ))}
    </div>
  </div>)
}

function App() {
  const [userName, setUserName] = useState();
  const [userCredentials, setUserCredentials] = useState(undefined);  
  const [preExistingUserTasks, setPreExistingUserTasks] = useState([]);

  useEffect(() => { 
    if(!userName || !!userCredentials) return;

    const authenticateUser = async () => {
      const userCredentials = await toDoListServer.getUserAuthentication(userName);
      console.log("Received a user credentials for " + userName, userCredentials);
      setUserCredentials(userCredentials);
    }
    authenticateUser();
  }, [userName]);

  useEffect(() => {
    if(!userCredentials) return;

    console.log(userCredentials);

    const fetchUserTasksFromServer = async () => {
        const userTasks = await toDoListServer.getUserTasks(userCredentials);
        setPreExistingUserTasks(userTasks);
    };
    fetchUserTasksFromServer();
  }, [userCredentials]);

  const addTaskToServer = (taskText) => {
    if(userCredentials === undefined) 
      throw new Error("A user is not logged in but tried to add a task");

    if (taskText === undefined)
      return;

    if (userName === undefined)
      return;

    toDoListServer.addUserTask(userCredentials, taskText);
  }

  const onUserLoggedIn = (userName) => {
    console.log(userName + " just logged in!");
    setUserName(userName);
  }

  const inSync = !!userCredentials;

  return (
    <div style={{ backgroundColor: '#0190FE', height: '100vh' }} className="App">
      {!!userName ? (<TaskList 
        user={userName}
        inSync={inSync}
        onItemAddedCallback={addTaskToServer} 
        preExistingUserTasks={preExistingUserTasks}
        />) : <Authenticator onUserLogIn={onUserLoggedIn} />}
    </div>)
}

export default App;

