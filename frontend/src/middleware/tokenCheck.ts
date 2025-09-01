import { axiosInstance } from "../hook/axios"


export const tokenCheck = async() => {

    

    try {
        
        const res = await axiosInstance.get('/auth/checkAuth')
        console.log("Frontend response: ",res.data);
        // console.log(res.status ===200);
        
        
        // setAuthUser(true)
        return true
        
    } catch (error) {
        // console.log('Error in checkAuth no login token');
        // console.log(error);
        
        // setAuthUser(false)
        return false

    }

}