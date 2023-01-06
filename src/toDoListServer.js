import { httpClient } from "./httpClient";

class ToDoListServer { 
    constructor() {
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
      const { userName } = credentials;
  
      console.log("Adding task " + task + " to user " + userName);
      const response = await httpClient.post('http://localhost:3000/post', { userName, task })

      console.log("Response from server", response);
    }
  
    async getUserTasks(credentials) {
      console.log("Get user tasks");
  
      return this.userToTasks[credentials.userName];
    }
}
  
  export const toDoListServer = new ToDoListServer();  