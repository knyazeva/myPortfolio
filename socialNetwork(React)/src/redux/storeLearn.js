import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";

let store = {
    _state: {
        messagePage: {
            dialogsData: [
                {id: 1, img: "../assets/img/img5.jpg", name: "Maxim"},
                {id: 2, img: "../assets/img/img6.jpg", name: "Artem"},
                {id: 3, img: "../assets/img/img3.jpg", name: "Anna"}
            ],
            messagesData: [
                {id: 1, img: "../assets/img/img5.jpg", message: "Hi!"},
                {id: 2, img: "../assets/img/img2.png", message: "Hello!", me: "me-yes"}
            ],
            textMessage: ""
        },
        profilePage: {
            postsData: [
                {id: 1, message: "Hello!!!", likes: "5"},
                {id: 2, message: "It is my first post =)", likes: "3"}
            ],
            textPost: ""
        }
    },
    getState() {
        return this._state;
    },
    _rerender() {},

    subscriber(observer) {
        this._rerender = observer;
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = messagesReducer(this._state.messagePage, action);
        this._rerender(this._state);
    }
};

export default store;
