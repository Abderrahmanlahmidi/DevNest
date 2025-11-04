import jwt from "jsonwebtoken";



export const getUserFromToken = (token?:string) => {
    if(!token) return null;

    try{
        const decode = jwt.verify(token, process)
    }catch(e){
        return null;
    }
}