import './App.css';
import { useContext, useEffect, useState } from 'react';
import { toDoListServer } from './toDoListServer';
import { Authenticator } from './Authenticator';
import { TaskList, TaskPage } from './taskList';
import { createBrowserRouter, RouterProvider, Link, Navigate } from 'react-router-dom';
import { UserNameProvider } from './useNameProvider';
import { UserContext } from './userContext';

const NavigateToAuthenticator = () => <Navigate to={'/authenticate'} />;

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavigateToAuthenticator />
  },
  {
      path: "/authenticate",
      element: <Authenticator redirectTo={'/taskList'} />
  },
  {
      path: "/taskList",
      element: <TaskListContainer />,
      // errorElement: <ErrorPage />
    },
    {
      path: "/taskList/:id",
      element: <TaskPage />
    }
  ]);
  
function TaskListContainer() {
  const { user, onUserChanged } = useContext(UserContext);
  const [userCredentials, setUserCredentials] = useState(undefined);  
  const [preExistingUserTasks, setPreExistingUserTasks] = useState([]);

  useEffect(() => { 
    if(!user || !!userCredentials) return;

    const authenticateUser = async () => {
      const userCredentials = await toDoListServer.getUserAuthentication(user);
      console.log("Received a user credentials for " + user, userCredentials);
      setUserCredentials(userCredentials);
    }
    authenticateUser();
  }, [user]);

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

    if (!taskText || !user) return;

    toDoListServer.addUserTask(userCredentials, taskText);
  }

  const logOut = () => {
    UserNameProvider.deleteUserName();
    onUserChanged(undefined);
    setUserCredentials(undefined);
  };

  const inSync = !!userCredentials;

  if(!user) {
    return (<NavigateToAuthenticator />);
  }

  return (
    <div style={{ backgroundColor: '#0190FE', height: '100vh' }} className="App">
      <>
        <Link to="/">
          <button onClick={logOut} style={{marginTop: '10px' }}>LogOut</button>
        </Link>
        <TaskList 
        user={user}
        inSync={inSync}
        onItemAddedCallback={addTaskToServer} 
        preExistingUserTasks={preExistingUserTasks}
        />
      </>
    </div>);
}


function App() {
  const userKey = 'userName';
  const [user, setUser] = useState(localStorage.getItem(userKey));

  const onUserChanged = (newUser) => {
    if(newUser === undefined) {
      localStorage.removeItem(userKey)
    }

    localStorage.setItem(userKey, newUser);
    setUser(newUser);
  }

  return (
  <UserContext.Provider value={{ user , onUserChanged }}>
      <RouterProvider router={router} />
  </UserContext.Provider>);
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

