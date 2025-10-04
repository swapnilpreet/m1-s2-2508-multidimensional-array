export const saveAuth = (data) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
}
export const getUser = () => JSON.parse(localStorage.getItem('user'))
export const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user') }