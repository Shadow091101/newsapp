import React, { useContext, useEffect } from "react";
import "../editprofilepanel.css"
import profileContext from "../context/Profile/profileContext";
import bookmarkContext from "../context/Bookmark/bookmarkContext";


function StatsPanel() {

  const { user, getUser } = useContext(profileContext)
  const { bookmarks, getBookmarks } = useContext(bookmarkContext);

  const no_of_articles = user?.articlesRead ?? 0

  const count_of_bookmarks = bookmarks.length

  const fav_category = user?.favouriteCategory

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="editprofilemainContainer">
      <div className="editprofileSubContainer">
        <h1>Statistics</h1>
        <div className="editrows">
          <div className="change_uname" >
            <div className="change_uname_left_side">
              <i className="bi bi-person-square"></i>
            </div>
            <div className="change_uname_right_side">
              <span className="username1">No. of Articles Read</span>
              <span className="username2">{no_of_articles}</span>
            </div>
          </div>

          <div className="email" >
            <div className="email_left_side">
              <i className="bi bi-envelope"></i>
            </div>
            <div className="email_right_side">
              <span className="email1">No. of Bookmarks</span>
              <span className="email2">{count_of_bookmarks}</span>
            </div>
          </div>
          <div className="bio" >
            <div className="bio_left"><i className="bi bi-file-person"></i></div>
            <div className="bio_right">
              <span className="bio1">Favourite category</span>
              <span style={{ color: "black" }}>
                {fav_category
                  ? fav_category.charAt(0).toUpperCase() + fav_category.slice(1)
                  : "None"}
              </span>
            </div>
          </div>
          <div className="bio" >
            <div className="bio_left"><i className="bi bi-file-person"></i></div>
            <div className="bio_right">
              <span className="bio1"> 🔥 Reading Streak</span>
              <span>{user.readingStreak}</span>
            </div>
          </div>
          <div className="bio" >
            <div className="bio_left"><i className="bi bi-file-person"></i></div>
            <div className="bio_right">
              <span className="bio1"> 🏆 Longest Streak</span>
              <span>{user.longestStreak}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default StatsPanel;
