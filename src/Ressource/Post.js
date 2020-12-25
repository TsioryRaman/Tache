import {GET_TOKEN} from "../Authentification/ServiceToken";

export const POST =async (URL,data,options) => {
    try{
        const request = await fetch(URL,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Authorization": "Bearer "+ JSON.parse(GET_TOKEN()),
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                ...options
            }
        })
        const response = await request.json()
        return response
    }catch (e) {
        throw e
    }
}