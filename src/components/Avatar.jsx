import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";

export default function UserAvatar() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    role: "",
    profilePicture: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  const profPicSrc = "http://localhost:8000/profile-picture/";

  useEffect(() => {
    // Function to capitalize the first letter of each word
    const capitalizeWords = (text) => {
      return text
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    // Decode the token when the component mounts or when the token changes
    const decodedToken = jwt(token);
    setUserProfile({
      name: capitalizeWords(decodedToken.name || ""),
      role: capitalizeWords(decodedToken.role || ""),
      profilePicture: decodedToken.profilePicture || "",
    });
  }, [token]);

  const defaultAvatarURL =
    "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png";
  const avatarURL = userProfile.profilePicture
    ? `${profPicSrc}/${userProfile.profilePicture}`
    : defaultAvatarURL;

  return (
    <div className="flex items-center gap-x-2">
      <img
        className="h-[60px] w-[60px] rounded-full object-cover"
        src={avatarURL}
        alt={userProfile.name}
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{userProfile.name}</span>
        <span className="text-xs">{userProfile.role}</span>
      </div>
    </div>
  );
}
