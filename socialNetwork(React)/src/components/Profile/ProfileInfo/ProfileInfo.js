import React, {useState} from "react";
import "./ProfileInfo.scss";
import ProfileStatic from "./ProfileStatic";
import ProfileEdit from "./ProfileEdit";
import ProfileBannerIMG from 'assets/img/img1.jpg';
import UnknownIMG from 'assets/img/unknown.jpg';
import ButtonFollow from "../../Common/ButtonFollow";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const activationEditMode = () => {setEditMode(true)};
    const deactivationEditMode = () => {setEditMode(false)};

    const savePhoto = (e) => {  // перед отправкой на сервер конвертируем фото в base64 (т.к. у нас json-server)
        let fileToLoad = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            props.saveMyPhotoTC({...props.infoProfile, photo: fileLoadedEvent.target.result});
        };
        fileReader.readAsDataURL(fileToLoad);
    };

    return (
        <>
        <div className="info-profile">

            <div className="img-change">
                <div className="img-container">
                    <img
                        src={props.infoProfile.photo ? props.infoProfile.photo : UnknownIMG}
                        title={props.infoProfile.fullName}
                        alt={props.infoProfile.fullName}/>
                </div>
                {props.isMyProfile &&
                <div className="input-file">
                    <input id="file-load1" type="file" onChange={savePhoto}/>
                    <label htmlFor="file-load1" title="Download photo"> </label>
                </div>
                }
                {!props.isMyProfile &&
                <ButtonFollow user={props.infoProfile} unFollowTC={props.unFollowTC} followTC={props.followTC}/>
                }
            </div>

            <div className="text-profile">
                {editMode && <ProfileEdit infoProfile={props.infoProfile} deactivationEditMode={deactivationEditMode} saveMyProfileTC={props.saveMyProfileTC} />}
                {!editMode && <ProfileStatic infoProfile={props.infoProfile} isMyProfile={props.isMyProfile} activationEditMode={activationEditMode} />}
            </div>

        </div>
        </>
    )
};

export default ProfileInfo;