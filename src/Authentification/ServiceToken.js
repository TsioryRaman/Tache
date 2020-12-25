export const USER_SESSION = "user"
export const TOKEN_SESSION ="token"

export const GET_TOKEN = () => sessionStorage.getItem(TOKEN_SESSION)

export const regenerateToken = () => {
    
}
export const SET_SESSION = (NAME,DATA) => {
    sessionStorage.setItem(NAME,JSON.stringify(DATA))
}
export const GET_SESSION = (NAME) => {
    return JSON.parse(sessionStorage.getItem(NAME))
}