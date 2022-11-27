async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
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

      sleep(2000);
      
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
  
      if(this.userToTasks[userName] === undefined) {
        this.userToTasks[userName] = [];
      }
  
      this.userToTasks[userName].push(task);
    }
  
    async getUserTasks(credentials) {
      console.log("Get user tasks");
      this._validateCredentials(credentials);
  
      return this.userToTasks[credentials.userName];
    }
  
    _validateCredentials(credentials) {
      const { userName, userAuth } = credentials;
   
      sleep(2000);
  
      if(this.userToCredentials[userName].userAuth !== userAuth) {
        throw new Error("User is not authenticated");
      }
    }
}
  
  export const toDoListServer = new ToDoListServer();  