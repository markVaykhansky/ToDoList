export class UserNameProvider {
    static useNameKey = 'userName';

    static setUserName(userName) {
        localStorage.setItem(UserNameProvider.useNameKey, userName);
    }

    static deleteUserName() {
        localStorage.removeItem(UserNameProvider.useNameKey);
    }
  
    static getUserName() {
        return localStorage.getItem(UserNameProvider.useNameKey);
    }
  }
  