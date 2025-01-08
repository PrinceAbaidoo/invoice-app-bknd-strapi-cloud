import { users } from "../users"

const isValidEmail = (email) => { 
    return users.some(user => user.email === email)
}

const isValidPassword = (password) => { 
    return users.some(user => user.password === password)
}
module.exports = {
    isValidEmail,
    isValidPassword
}