import React, { useCallback, useState } from "react";
import profileContext from "./profileContext";

const ProfileState = (props) => {
    const backendurl = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState({});
    const getUser = useCallback(async () => {
        try {
            const response = await fetch(`${backendurl}/api/v1/auth/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user details");
            const json = await response.json();
            console.log("Fetched user details:");
            console.log("Fetched user details:", json);
            setUser(json);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, []);

    return (
        <profileContext.Provider value={{ user, getUser }}>
            {props.children}
        </profileContext.Provider>
    );
};

export default ProfileState;