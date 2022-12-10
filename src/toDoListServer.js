import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore/lite';
import { firebaseApp } from './firebase';
class ToDoListServer { 
    constructor() {
      const fireStoreInstance = getFirestore(firebaseApp);
      this.tasksCollection = collection(fireStoreInstance, 'tasks');

      this.userToCredentials = {};
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
      const { userName } = credentials;
  
      console.log("Adding task " + task + " to user " + userName);
      const databaseTask = { title: task, user: credentials.userName }

      try {
        const documentReference = await addDoc(this.tasksCollection, databaseTask)
        console.log("Create task with id " + documentReference.id);
      } catch(error) { 
        console.error("An error has occurred in adding a task to firestore", JSON.stringify(error));
      }
    }
  
    async getUserTasks(credentials) {
      console.log("Get user tasks");
  
      const { docs } = await getDocs(this.tasksCollection);
      const tasksList = docs.map(doc => doc.data());

      return tasksList.filter(task => task.user === credentials.userName);
    }
}
  
  export const toDoListServer = new ToDoListServer();  