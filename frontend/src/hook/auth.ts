import { useUser } from "../components/Context";




export const login = async(email:string, password:string ) =>{

    const res = await fetch('http://localhost:3000/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

        if(!res.ok){
            const errorData = await res.json()
            throw new Error(errorData.message || "Login Failed")
        }
        
        return await res.json()


}

export const signup = async(
    firstName:string, 
    lastName:string, 
    email:string, 
    password:string, 
    passwordAgain:string, 
    navigate:any
    ) =>{

    const res = await fetch('http://localhost:3000/auth/signin', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, passwordAgain}),
        credentials: 'include',
    });

    const data = await res.json()

    console.log(data);
    

     navigate("/");

}

export const signout = async() => {
    // console.log("in sign out call");

        const res = await fetch('http://localhost:3000/auth/signout', {
            method: 'POST',
            credentials: 'include',
        })
            
          if(!res.ok){
            const errorData = await res.json()
            throw new Error(errorData.message || "Login Failed")
        }

        return res
        
    



}