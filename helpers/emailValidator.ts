export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!re.test(email)) return false
  else
    return true;
}
