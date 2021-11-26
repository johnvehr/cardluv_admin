class Error {

  static setErrorMessage = (error) => {
    console.log(error)
    const errorObj = {
      401: 'Not Authorized, please re check your login credentials'
    }

    return errorObj[error]
  }
}

export default Error
