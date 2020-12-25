export const GET_PERSONNEL = "GET_PERSONNEL"

export  const PersonnelStore = (state=null,action) => {
    switch (action.type) {
        case GET_PERSONNEL:
            return state.find(personne => personne.id === action.id)
        default:
            return state
    }
}