
class VerifyAuthentication {
  constructor() {
    this.JWT = localStorage.getItem("JWT")

    this.fecthCurrentUser = this.fecthCurrentUser.bind(this)
  }

  fecthCurrentUser() {
    const query = { query: "{ me {    email    firtName    lastName  } }", variables: null }

    return fetch("/graphql/", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.JWT}`
        },
        method: "POST",
        body: JSON.stringify(query)
      })
      .then(response => response.json())
  }

  verifyJWT() {
    return new Promise((resolve, reject) => {
      if (this.JWT) {
        resolve("chat")
      } else {
        reject(new Error('No existe un JWT en el localStorage'))
      }
    })
  }

  getApp() {
    return new Promise((resolve, reject) => {
      this.verifyJWT()
        .then(app => {
          resolve(app)
        })
        .catch(error => {
          // limpiamos la cache
          localStorage.clear()
          reject(error)
        })
    })
  }
}

export default VerifyAuthentication
