const GET_COUNT = "GET_COUNT"
export const PaginationReducer = (state = 1,action) => {
    switch (action.type) {
        case GET_COUNT:
            return state
        default:
            return state
    }
}