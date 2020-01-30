import React from "react";

const ProfileStatic = (props) => {

    return (
        <>
        {props.isMyProfile && <div className="edit-btn" title="Edit profile" onClick={props.activationEditMode}> </div>}

        <div className="title item">{props.infoProfile.fullName}</div>

        {
            props.infoProfile.status &&
            <div className="item"><b>Status:</b><div>{props.infoProfile.status}</div></div>
        }
        {
            props.infoProfile.dateOfBirth &&
            <div className="item"><b>Date of Birth:</b><div>{props.infoProfile.dateOfBirth}</div></div>
        }
        {
            props.infoProfile.location &&
            <div className="item"><b>Location:</b><div>{props.infoProfile.location.country}, {props.infoProfile.location.city}</div></div>
        }
        {
            props.infoProfile.education &&
            <div className="item"><b>Education:</b><div>{props.infoProfile.education}</div></div>
        }
        {
            props.infoProfile.description &&
            <div className="item"><b>Description:</b><div>{props.infoProfile.description}</div></div>
        }

        </>
    )
};

export default ProfileStatic;