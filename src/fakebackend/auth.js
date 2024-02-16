import { login, isuserloggedin } from "./backend_helper";

const userlogin = async (data, navigate) => {
    try {
        const response = await login(data);
        if(response){
            localStorage.setItem('token', JSON.stringify(response.token));
            let authData = {
                "id": response.id,
                "username": response.username,
                "email": response.email,
                "image": response.image,
            }
            localStorage.setItem('authUser', JSON.stringify(authData));
        }
        navigate('/');
    } catch (error) {
        console.log("USER_LOGIN_ERROR", error);
        return false;
    }
}



const logoutUser = async () => {
        const userStatus = await isuserloggedin();
        if(userStatus === 'Authentication Problem') {
            localStorage.removeItem('token');
            localStorage.removeItem('authUser');
        }
};
export {userlogin, logoutUser};