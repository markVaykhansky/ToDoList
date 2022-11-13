export class UserNameProvider {
    static userName = undefined
  
    static setUserName(userName) {
        UserNameProvider.userName = userName;
    }
  
    static getUserName() {
        return UserNameProvider.userName;
    }
  }
  