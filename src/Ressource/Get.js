import {GET_TOKEN} from "../Authentification/ServiceToken";

export const GET = async (URL,options) => {
    try{
        const request = await fetch(URL,{
            method:"GET",
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