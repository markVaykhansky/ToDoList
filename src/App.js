import './App.css';
import { useEffect, useState } from 'react';
import { toDoListServer } from './toDoListServer';
import { Authenticator } from './Authenticator';
import { TaskList, TaskPage } from './taskList';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { UserNameProvider } from './useNameProvider';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Authenticator />
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
  const userName = UserNameProvider.getUserName();
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
    //setUserName(userName);
  }

  const logOut = () => {
    UserNameProvider.setUserName(undefined);
    setUserCredentials(undefined);
  };

  const inSync = !!userCredentials;

  if(!userName) {
    return (<div>You can not access todo list without logging in</div>)
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
  return (<RouterProvider router={router} />);
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

