const SEND_MESSAGE = 'messages/SEND_MESSAGE';
import PhotoIMG2 from "assets/img/img2.png"
import PhotoIMG5 from "assets/img/img5.jpg"
import PhotoIMG6 from "assets/img/img6.jpg"

let initialState = {
    dialogsData: [
        {id: 1, img: PhotoIMG5, name: "Maxim"},
        {id: 2, img: PhotoIMG6, name: "Artem"}
    ],
    messagesData: [
        {id: 1, img: PhotoIMG5, message: "Hi!"},
        {id: 2, img: PhotoIMG2, message: "Hello!", me: "me-yes"}
    ]
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {id: 3, img: "../assets/img/img2.png", message: action.dataForm, me: "me-yes"};
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
};

export const sendMessageAC = (dataForm) => ({type: SEND_MESSAGE, dataForm});

export default messagesReducer;