import React, { Component, useContext, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import NoArticle from './NoArticle';
import bookmarkContext from '../context/Bookmark/bookmarkContext';
import "../news.css"


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



    // alert(bookmarks)
    //const [loading, setLoading] = useState(false);
    //const [page, setPage] = useState(1)
    //const [totalResults, setTotalResults] = useState(0);

    // const getDates = () => {
    //     const date = new Date();
    //     let full_year = date.getFullYear();
    //     let curr_date = date.getDate();
    //     let curr_month = date.getMonth();
    //     let from_curr_month;

    //     if (curr_month >= 0 && curr_date != 1) {
    //         from_curr_month = curr_month + 1
    //     }


    //     if (curr_month == 0 && curr_date == 1) {
    //         full_year = full_year - 1;
    //         curr_date = 31;
    //         from_curr_month = 12

    //     }
    //     else if (curr_month == 1 && curr_date == 1) {//feb
    //         curr_date = 28
    //         from_curr_month = 1//jan
    //     }
    //     else if (curr_month == 2 && curr_date == 1) {//mar
    //         curr_date = 28
    //         from_curr_month = 2//feb
    //     }
    //     else if (curr_month == 3 && curr_date == 1) {//apr
    //         curr_date = 28
    //         from_curr_month = 3//mar
    //     }
    //     else if (curr_month == 4 && curr_date == 1) {//may
    //         curr_date = 28
    //         from_curr_month = 4//apr
    //     }
    //     else if (curr_month == 5 && curr_date == 1) {//jun
    //         curr_date = 28
    //         from_curr_month = 5//may
    //     }
    //     else if (curr_month == 6 && curr_date == 1) {//july
    //         curr_date = 28
    //         from_curr_month = 6//jun
    //     }
    //     else if (curr_month == 7 && curr_date == 1) {//aug
    //         curr_date = 28
    //         from_curr_month = 7//july
    //     }
    //     else if (curr_month == 8 && curr_date == 1) {//sep
    //         curr_date = 28
    //         from_curr_month = 8//aug
    //     }
    //     else if (curr_month == 9 && curr_date == 1) {//oct
    //         curr_date = 28
    //         from_curr_month = 9//sep
    //     }
    //     else if (curr_month == 10 && curr_date == 1) {//november
    //         curr_date = 28
    //         from_curr_month = 10//oct
    //     }
    //     else if (curr_month == 11 && curr_date == 1) {//december
    //         curr_date = 28
    //         from_curr_month = 11//november
    //     }
    //     console.log(full_year);
    //     console.log(from_curr_month);
    //     console.log(curr_month);
    //     console.log(curr_month + 1);
    //     console.log(curr_date);
    //     console.log(curr_date - 1);

    //     return {
    //         full_year,
    //         from_curr_month,
    //         curr_date,
    //         curr_month,
    //     }
    // }

    // const updateNews = async () => {
    //     props.updateProgress(10)
    //     // let parsedQuery = props.query ? `&q=${props.query.split(' ').join('+')}` : '';
    //     console.log('Search text 3 = ', props.query);

    //     const { full_year, from_curr_month, curr_month, curr_date } = getDates();
    //     props.updateDropDownTitle(props.category.charAt(0).toUpperCase() + props.category.slice(1));
    //     let searchQuery = typeof props.query === 'string' && props.query.trim() !== ''
    //         ? `&q=${props.query.split(' ').join('+')}`
    //         : '';
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}${searchQuery}&category=${props.category}&pageSize=20&page=${page}&from=${full_year}-${from_curr_month}-${curr_date - 1}&to=${full_year}-${curr_month + 1}-${curr_date}&apiKey=${props.apiKey}`
    //     // let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=science&page=1&apiKey=ea2d177abf4b46eba102a2bd760ee125`

    //     setLoading(true);
    //     props.updateProgress(30);

    //     try {
    //         const data = await fetch(url);
    //         props.updateProgress(50);
    //         const parsedData = await data.json();
    //         props.updateProgress(70);
    //         setbookmarks(parsedData.bookmarks);
    //         setTotalResults(parsedData.totalResults);
    //     } catch (error) {
    //         console.error("Error fetching news:", error);
    //     } finally {
    //         setLoading(false);
    //         props.updateProgress(100);
    //     }
    // }

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

    // const handlepreviousclick = async () => {
    //     setPage(page - 1);
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });

    // }

    // const handlenextclick = async () => {
    //     setPage(page + 1)
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });

    // }
    return (
        <div className='bookmark-container my-3 mx-2' >
            <div className="header d-flex mt-5 justify-content-between" style={{ alignItems: "center" }}>
                <h2 className='mx-5 mt-3' style={{ marginTop: '70px', alignItems: "center" }}>Bookmarks</h2>
                <button className='btn btn-outline-primary me-5 mt-3' style={{ height: "fit-content" }} onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>Sort by Date: {sortOrder === "asc" ? "Oldest → Newest" : "Newest → Oldest"}</button>
            </div>

            {/* <h5>{props.searchQuery}</h5> */}
            {/* <h5 className='mx-5'>
                {props.query && props.query !== '[object Object]' ? `Searching for ${props.query}` : ''}
            </h5> */}
            {/* {loading ? <Spinner /> : null} */}
            {/* if loading is true then put spinner */}
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
                {/* <div className="container d-flex  justify-content-between my-3">
                    <button disabled={page <= 1} type="button" className="btn btn-info" onClick={handlepreviousclick}> &larr; Previous</button>
                    <span className="badge bg-primary text-light px-2 py-2" style={{
                        height: '27px', position: "relative",
                        top: "18%"
                    }}>
                        Page No: {totalResults >= 100 ? `${page}/${Math.ceil(100 / 20)}` : `${page}/${(Math.ceil(totalResults / 20)==0?'1':Math.ceil(totalResults / 20))}`}
                    </span>

                    <button
                        disabled={totalResults >= 100 ? page >= Math.ceil(100 / 20) : page >= Math.ceil(totalResults / 20)}
                        type="button"
                        className="btn btn-info"
                        onClick={handlenextclick}
                    >
                        Next &rarr;
                    </button>

                </div> */}
            </div>
        </div >
    );

}

// Bookmarks.defaultProps = {
//     country: '',
//     category: 'general',
//     query: '',
// };

// Bookmarks.propTypes = {
//     // country: PropTypes.string,
//     // category: PropTypes.string,
//     // title: PropTypes.string,
//     // query: PropTypes.string,
//     // updateProgress: PropTypes.func.isRequired,
//     // updateDropDownTitle: PropTypes.func.isRequired,
//     // apiKey: PropTypes.string.isRequired,
// };

export default Bookmarks
// my newsapi key
