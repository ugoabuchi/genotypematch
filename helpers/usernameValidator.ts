export default function usernameValidator(username) {
    const re = /^\w[\w.]{3,18}\w$/
    if (!re.test(username)) return false;
    else
    return true;
  }
  