import React from "react";
import DefaultAvatar from "../../images/default_avatar.jpg";

const AvatarView = ({avatar, className}) => {
  const src = avatar ? avatar.image : DefaultAvatar;
  return (
    <img className={className} src={src} alt={DefaultAvatar}>
    </img>
  );
};

export default AvatarView;
