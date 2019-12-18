const saveJWT = (token) => {
  window.localStorage.setItem('jwt', token);
}

const removeJWT = () => {
  window.localStorage.removeItem('jwt');
}

const userAuthenticated = () => {
  return window.localStorage.getItem('jwt') !== null;
}

module.exports = {
  saveJWT,
  removeJWT,
  userAuthenticated
}