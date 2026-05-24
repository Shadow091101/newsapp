import React, { useCallback, useEffect, useState } from "react";
import bookmarkContext from "./bookmarkContext";

const BookmarkState = (props) => {
    const backendurl=process.env.REACT_APP_API_URL;
    const [bookmarks, setBookmarks] = useState([]);
    const getBookmarks = useCallback(async () => {
        try {
            const response = await fetch(`${backendurl}/api/v1/bookmark/getbookmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user details");
            const json = await response.json();
            // alert("Fetched Bookmarks",json[0]);
            setBookmarks(json);
        } catch (error) {
            console.error("Error fetching bookmarks : ", error);
        }
    }, []);

    const addBookmark=async(article)=>{
        const res=await fetch(`${backendurl}/api/v1/bookmark/postbookmarks`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token"),
            },
            body:JSON.stringify(article),
        });
        const saved=await res.json();
        setBookmarks([...bookmarks,saved])
    };

    const removeBookmark=async(id)=>{
        await fetch(`${backendurl}/api/v1/bookmark/deletebookmark/${id}`,{
            method:"DELETE",
            headers:{
                "auth-token":localStorage.getItem("token")
            }
        });
        setBookmarks(bookmarks.filter((b)=>b._id!==id));
    }

    useEffect(()=>{
        getBookmarks();
    },[getBookmarks])
    return (
        <bookmarkContext.Provider value={{ bookmarks, getBookmarks,addBookmark,removeBookmark }}>
            {props.children}
        </bookmarkContext.Provider>
    );
};

export default BookmarkState;