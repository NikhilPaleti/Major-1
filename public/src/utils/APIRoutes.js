export const host = "http://localhost:5000"; 
// For local usage
// export const host = "http://192.168.20.1:5000"; 
// For running on the same network

export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/sendmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;