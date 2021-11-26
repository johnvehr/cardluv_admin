class Auth {

  /*
    static  authenticateToken(token){
      sessionStorage.setItem('token', token)
    }

    static isUserAuthenticated(){
      return sessionStorage.getItem('token') !== null
    }

    static deauthenticateUser(){
      sessionStorage.removeItem('token')
    }

    static getToken(){
      return sessionStorage.getItem('token')
    }
  */



  static authenticateToken(ptth_cred){
    for(var http of ptth_cred.headers.entries()){
      sessionStorage.setItem(`${http[0]}`, `${http[1]}`)
    }
  }

  static isUserAuthenticated(){
    return sessionStorage.getItem('access-token') !== null
  }

  static deauthenticateUser(){
    const header_store = ['uid','access-token','client','content-type']
    header_store.map((a) =>{
      sessionStorage.removeItem(a)
    })
  }

  static setCurrentWriter(wid){
    sessionStorage.setItem('current_writer', wid)
  }

  static getCurrentWriter(){
   return sessionStorage.getItem('current_writer')
  }

  static fetchToken(){
    let client_ptth_cred = {}
    client_ptth_cred['Accept'] = 'application/json'
    client_ptth_cred['Content-Type'] = 'application/json'
    //getToken and isUserAuth is honestly doing the same thing we should evaluate this
    for (let [key, value] of Object.entries(sessionStorage)) {
      client_ptth_cred[`${key}`] = `${value}`;
    }
    return client_ptth_cred
  }

  static updateUserToken (ers) {
    for(var http of ers.headers.entries()){
      sessionStorage.setItem(`${http[0]}`, `${http[1]}`)
    }
  }

  static processHead(ers,action) {
    switch(action){
      case 'SIGN_UP':
      case 'SIGN_IN':
       this.authenticateToken(ers)
      break;
      case 'SIGN_OUT':
       this.deauthenticateUser()
      break;
      case 'UPDATE_USER_ACCOUNT':
        this.updateUserToken(ers)
      break;
    }
  }


}

export default Auth
