import React from "react";
import "./PopUp.css";
import {connect} from "react-redux";
import {setDataPopupAC} from "../../../redux/appReducer";


const PopUp = (props) => {

    const closePopUp = () => {
        props.setDataPopupAC({
            isActive: false,
            title: "",
            body: ""
        });
    };

    return (
        <div className={`popUp-overlay ${props.dataPopUp.isActive && "active"}`}>
            <div className="popUp-window">
                <div className="popUp-title">
                    {props.dataPopUp.title}
                    <div className="cancel" onClick={closePopUp}> </div>
                </div>
                <div className={`popUp-body ${props.dataPopUp.isSuccessSend ? "success" : ""}`}>
                    <span> </span>
                    {props.dataPopUp.body}
                </div>
            </div>
        </div>
    )

};

const mapStateToProps = (state) => ({
    dataPopUp: state.app.dataPopUp
});


export default connect(mapStateToProps, {setDataPopupAC})(PopUp);