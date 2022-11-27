import './App.css';
import { useContext, useEffect, useState } from 'react';
import { toDoListServer } from './toDoListServer';
import { Authenticator } from './Authenticator';
import { TaskList, TaskPage } from './taskList';
import { createBrowserRouter, RouterProvider, Link, Navigate } from 'react-router-dom';
import { UserNameContext } from './userNameContext';

const NavigateToAuthenticator = () => <Navigate to={'/authenticate'} />;

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavigateToAuthenticator />
  },
  {
      path: "/authenticate",
      element: <Authenticator redirectAddress={'/taskList'} />
  },
  {
      path: "/taskList",
      element: <TaskListContainer />
    },
    {
      path: "/taskList/:id",
      element: <TaskPage />
    }
  ]);
  

function TaskListContainer() {
  const { userName, onUserNameChanged } = useContext(UserNameContext);
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

    if (!taskText || !userName) return;

    toDoListServer.addUserTask(userCredentials, taskText);
  }

  const logOut = () => {
    onUserNameChanged(undefined);
    setUserCredentials(undefined);
  };

  const inSync = !!userCredentials;

  if(!userName) {
    return (<NavigateToAuthenticator />);
  }

  return (
    <div style={{ backgroundColor: '#0190FE', height: '100vh' }} className="App">
      <>
        <Link to="/">
          <button onClick={logOut} style={{marginTop: '10px' }}>LogOut</button>
        </Link>
        <TaskList 
        user={userName}
        inSync={inSync}
        onItemAddedCallback={addTaskToServer} 
        preExistingUserTasks={preExistingUserTasks}
        />
      </>
    </div>);
}

function App() {
  const userNameKey = 'userName';
  const [userName, setUserName] = useState(localStorage.getItem(userNameKey));

  const onUserNameChanged = (newUserName) => {
    setUserName(newUserName);

    if(newUserName)
      localStorage.setItem(userNameKey, newUserName);
    else  
      localStorage.removeItem(userNameKey);
  }

  const userNameContextValue = {
    userName,
    onUserNameChanged
  }

  return (
    <UserNameContext.Provider value={userNameContextValue}>
      <RouterProvider router={router} />
    </UserNameContext.Provider>
  );
}

export default App;

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

