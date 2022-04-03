import axios from "axios"

const API_URL_REGISTER = "/api/user/register"
const API_URL_LOGIN = "/api/user/login"

//? Register User

const register = async (user) => {
  const response = await axios.post(API_URL_REGISTER, user)
  if (response.data) localStorage.setItem("user", JSON.stringify(response.data))
  return response.data
}

//? login user

const login = async (user) => {
  const response = await axios.post(API_URL_LOGIN, user)
  if (response.data) localStorage.setItem("user", JSON.stringify(response.data))
  return response.data
}

//? logout user
const logout = async () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  logout,
  login,
}
export default authService
