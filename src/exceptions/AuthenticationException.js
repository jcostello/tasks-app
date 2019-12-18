class AuthenticationException extends Error {
   constructor(message) {
    super(message);

    this.name = 'AuthenticationException';
  }
}

module.exports = AuthenticationException