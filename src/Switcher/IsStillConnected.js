import { GET_TOKEN } from "../Authentification/ServiceToken";

export const isConnected = () => {
    const _user = GET_TOKEN()
    if(_user){
        return true
    }
    return  false;
}
