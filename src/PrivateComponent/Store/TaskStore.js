
const initialTache = [
    {
        id:1,
        Title:"Organisation de projet",
        Description:"The coal-black cloud quirky drinks the rum.Ahoy, warm mate. go to isla de sangria.",
        personnel:[
            {
                id:45,
                username:"Tsiory",
                email:"rtsior4@gmail.com"

            },
            {
                id:44,
                username:"Cyah",
                email:"Cyahs@gmail.com"

            }
        ]
    },
    {
        id:2,
        Title:"Organisation de projet",
        Description:"The coal-black cloud quirky drinks the rum.Ahoy, warm mate. go to isla de sangria.",
        personnel:[
            {
                id:45,
                username:"Tsiory",
                email:"rtsior4@gmail.com"
            }
        ]
    },
    {
        id:3,
        Title:"Organisation de projet",
        Description:"The coal-black cloud quirky drinks the rum.Ahoy, warm mate. go to isla de sangria.",
        personnel:[
            {
                id:45,
                username:"Tsiory",
                email:"rtsior4@gmail.com"

            }
        ]
    },
    {
        id:4,
        Title:"Organisation de projet",
        Description:"The coal-black cloud quirky drinks the rum.Ahoy, warm mate. go to isla de sangria.",
        personnel:[
            {
                id:45,
                username:"Tsiory",
                email:"rtsior4@gmail.com"

            }
        ]
    }
]

export const GET_TASK = "GET_TASK"
export const SET_TASK = "SET_TASK"
export const ADD_TASK = "ADD_TASK"

export const TaskReducer = (state = [],action) => {
    switch (action.type) {
        case SET_TASK:
            return [...state,...action.data]
        case GET_TASK:
            return state.find(x=>x.id === action.id)
        case ADD_TASK:
            return [...state,{...action.payload.task}]
        default:
            return state;
    }
}