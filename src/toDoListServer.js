import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { fireStoreInstance } from './firebase-init';

class ToDoListServer { 
    constructor() {
      this.tasksCollection = collection(fireStoreInstance, 'TasksCollection');

      this.userToCredentials = {};
      this.userToTasks = {
        'Mark': [
          { title: 'Buy Milk', 'id': '1' },
        ],
        'Mark2': [
          { title: 'Fix car', 'id': '2' }
        ]
      }
    }
  
    async getUserAuthentication(user) {
      if(!user) {
        throw new Error("User is undefined");
      }

      function generateUserToken() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
  
      if(this.userToCredentials[user] !== undefined) {
        return this.userToCredentials[user];
      }
  
      const userAuth = generateUserToken();
      const credentials = {
        userAuth,
        userName: user
      }

      this.userToCredentials[user] = credentials;
      return credentials;
    }
  
    async addUserTask(credentials, task) {
      this._validateCredentials(credentials);
      const { userName } = credentials;
  
      console.log("Adding task " + task + " to user " + userName);
      const dbObject = { id: task.id, user: credentials.userName, title: task.title }
      console.log(dbObject);

      const docRef = await  addDoc(this.tasksCollection, dbObject);
      console.log("Created new document for task with id " + docRef.id)
    }
  
    async getUserTasks(credentials) {
      console.log("Get user tasks");
      this._validateCredentials(credentials);
  
      const tasksSnapshot = await getDocs(this.tasksCollection);
      const tasksList = tasksSnapshot.docs.map(doc => doc.data());

      return tasksList.filter(task => task.user === credentials.userName);
    }
  
    _validateCredentials(credentials) {
      const { userName, userAuth } = credentials;
   
      if(this.userToCredentials[userName].userAuth !== userAuth) {
        throw new Error("User is not authenticated");
      }
    }
}
  
  export const toDoListServer = new ToDoListServer();  