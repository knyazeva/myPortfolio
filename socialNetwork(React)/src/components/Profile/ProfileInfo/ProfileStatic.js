import React from "react";

const ProfileStatic = (props) => {

    return (
        <>
        {props.isMyProfile && <div className="edit-btn" title="Edit profile" onClick={props.activationEditMode}> </div>}
        <div className="title item">{props.userProfile.fullName}</div>
        <div className="item"><b>Status:</b><div>{props.userProfile.status}</div></div>
        <div className="item"><b>Date of Birth:</b><div>{props.userProfile.dateOfBirth}</div></div>
        <div className="item"><b>Location:</b><div>{props.userProfile.location.country}, {props.userProfile.location.city}</div></div>
        <div className="item"><b>Education:</b><div>{props.userProfile.education}</div></div>
        <div className="item"><b>Description:</b><div>{props.userProfile.description}</div></div>
        </>
    )
};

export default ProfileStatic;