
import React, { Component, useContext, useEffect, useState } from 'react'
import bookmarkContext from '../context/Bookmark/bookmarkContext';
import '../newsitem.css'
import profileContext from '../context/Profile/profileContext';


const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, category }) => {

  const { user } = useContext(profileContext);
  const { getUser } = useContext(profileContext);

  // let realTitle = element.title == null ? "No Title" : element.title
  let Title = title.length >= 45 ? title.slice(0, 45) + '...' : title
  // let realDescription = element.description == null ? "No Description" : element.description
  let Description = description.length >= 88 ? description.slice(0, 88) + '...' : description

  let Author=author?.length>=50 ? author.slice(0,50) + '...' : author

  const [bookmarkChecked, setbookmarkChecked] = useState()
  const { bookmarks, removeBookmark, addBookmark } = useContext(bookmarkContext)
  const shareNews = (title, text, url) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      })
        .then(() => { })
        .catch((error) => alert("Failed to share."))
    } else {
      alert("Sharing is not supported on this browser.")
    }
  }
  const saveToHistory = async (e) => {

    e.preventDefault();

    if (!user?._id) return;
    console.log("Token:", localStorage.getItem("token"));

    const historyKey = `history_${user._id}`;
    // OR: history_${user.username}
    const existing = JSON.parse(localStorage.getItem(historyKey)) || [];

    const alreadyRead = existing.some(h => h.url === newsUrl);

    // 🔥 increment only if first time
    if (!alreadyRead) {
      await inc_art_read();
    }
    await categoryfav();
    await updateStreak();

    const item = {
      title,
      url: newsUrl,
      image: imageUrl,
      date: new Date().toISOString(),
    };

    // add at top (newest first)
    const filtered = existing.filter(h => h.url !== newsUrl);
    filtered.unshift(item);

    localStorage.setItem(historyKey, JSON.stringify(filtered));

    window.open(newsUrl, "_blank");
  };

  const inc_art_read = async () => {

    await fetch("http://localhost:3500/api/v1/user/addArticleReadCount", {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
  }

  const categoryfav = async () => {
    const safeCategory = category || "General";
    await fetch("http://localhost:3500/api/v1/user/read-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        category: safeCategory
      })
    });
    console.log("CATEGORY SENT:", safeCategory);
  }

  const updateStreak = async () => {
    await fetch("http://localhost:3500/api/v1/user/update-streak", {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    await getUser();
  }

  useEffect(() => {
    const isBookmarked = bookmarks.some(b => b.newsUrl === newsUrl);
    setbookmarkChecked(isBookmarked);
  }, [bookmarks, newsUrl])
  const postBookmark = () => {
    if (bookmarkChecked) {
      const bookmark = bookmarks.find(b => b.newsUrl === newsUrl);
      if (bookmark) removeBookmark(bookmark._id);
      setbookmarkChecked(false);
    } else {
      addBookmark({ title, description, imageUrl, newsUrl, Author, date, source })
      setbookmarkChecked(true)
    }
  }


  let Source = source ? (source.length >= 20 ? `${source.slice(0, 20)}...` : source) : 'Unknown Source';
  const defaultImage = "/assets/images/logo.png";
  const validImageUrl = imageUrl || defaultImage;
  return (
    <div className='newsitem-container my-2 mx-32 shadow-lg' >
      <div className="card" style={{ height: "100%" }}>
        <div className="image-wrapper">
          <img src={validImageUrl} className="card-img-top" alt="No News Image" height="200px" onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/assets/images/logo.png"; }} />
        </div>
        <div className="card-body" >
          <h5 className="card-title" height="20px">{Title}<h5><span class="badge text-bg-secondary">{Source}</span></h5></h5>
          <p className="card-text" height="50px">{Description}</p>
          <p className="card-text"><small className="text-body-secondary">By {Author || 'Unknown'} on {new Date(date).toUTCString()}</small></p>
          <div className="bottom">

            <a rel='noreferrer' onClick={saveToHistory} href={newsUrl} target='_blank' className="btn btn-outline-primary">Read More</a>
            <div className="twobtns">

              <button className="btn btn-outline-secondary mx-2" onClick={() => shareNews(title, description, newsUrl)}>
                <i className="bi bi-share"></i>
              </button>
              <button className="btn btn-outline-secondary mx-2 float-end " onClick={() => postBookmark(title, description, imageUrl, newsUrl, author, date, source)}>
                {
                  bookmarkChecked ? (<i className="bi bi-bookmark-check"></i>) : (<i className="bi bi-bookmark"></i>)
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )

}

export default NewsItem
