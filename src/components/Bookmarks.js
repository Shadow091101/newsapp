import React, { Component, useContext, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import NoArticle from './NoArticle';
import bookmarkContext from '../context/Bookmark/bookmarkContext';
import "../news.css"
import "../bookmark.css"



const Bookmarks = (props) => {
    const { bookmarks, getBookmarks } = useContext(bookmarkContext);

    const [sortOrder, setSortOrder] = useState("desc"); // "desc" = latest first

    

    const sortBookmarks = () => {
        // const sortOrder="desc"
        bookmarks.sort((a, b) => {
            if (sortOrder === "asc") {
                return new Date(a.BookmarkDate) - new Date(b.BookmarkDate); // Oldest → Newest
            }
            return new Date(b.BookmarkDate) - new Date(a.BookmarkDate); // Newest → Oldest
        });
    };

    useEffect(() => {
        getBookmarks();
        sortBookmarks("desc")
        // updateNews();
    }, [])//effect will run when page or query or category changes

    useEffect(() => {
        
        if (bookmarks) {
            sortBookmarks();
        }
    }, [bookmarks, sortOrder]);

    return (
        <div className='bookmark-container my-3 mx-2' >
            <div className="header d-flex mt-5 justify-content-between" style={{ alignItems: "center" }}>
                <h2 className='mx-5 mt-4' style={{ marginTop: '70px', alignItems: "center" }}>Bookmarks</h2>
                <button className='btn btn-outline-primary me-5 mt-4' style={{ height: "fit-content" }} onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>Sort by Date: {sortOrder === "asc" ? "Oldest → Newest" : "Newest → Oldest"}</button>
            </div>
            <div className="row">
                {bookmarks && bookmarks.length > 0 ? (
                    bookmarks.map((element) => {
                        const Title = element.title?.length > 45 ? element.title.slice(0, 45) + "..." : element.title;
                        const Description = element.description?.length > 88 ? element.description.slice(0, 88) + "..." : element.description;
                        const imageUrl = element.imageUrl || "/assets/images/logo.png"; // camelCase
                        const newsUrl = element.newsUrl;                                  // camelCase
                        const source = element.source || "Unknown Source";               // camelCase

                        return (
                            <div className="news-card-column" key={element._id}>
                                <NewsItem
                                    title={Title}
                                    description={Description}
                                    imageUrl={imageUrl}
                                    newsUrl={newsUrl}
                                    author={element.author}
                                    date={element.date}
                                    source={source}
                                />
                            </div>
                        );
                    })
                ) : (<NoArticle />)
                }
            </div>
        </div >
    );
}

export default Bookmarks

