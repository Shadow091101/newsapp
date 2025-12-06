import React, { Component, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import NoArticle from './NoArticle';


const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0);

    const getDates = () => {
        const date = new Date();
        let full_year = date.getFullYear();
        let curr_date = date.getDate();
        let curr_month = date.getMonth();
        let from_curr_month;

        if (curr_month >= 0 && curr_date != 1) {
            from_curr_month = curr_month + 1
        }


        if (curr_month == 0 && curr_date == 1) {
            full_year = full_year - 1;
            curr_date = 31;
            from_curr_month = 12

        }
        else if (curr_month == 1 && curr_date == 1) {//feb
            curr_date = 28
            from_curr_month = 1//jan
        }
        else if (curr_month == 2 && curr_date == 1) {//mar
            curr_date = 28
            from_curr_month = 2//feb
        }
        else if (curr_month == 3 && curr_date == 1) {//apr
            curr_date = 28
            from_curr_month = 3//mar
        }
        else if (curr_month == 4 && curr_date == 1) {//may
            curr_date = 28
            from_curr_month = 4//apr
        }
        else if (curr_month == 5 && curr_date == 1) {//jun
            curr_date = 28
            from_curr_month = 5//may
        }
        else if (curr_month == 6 && curr_date == 1) {//july
            curr_date = 28
            from_curr_month = 6//jun
        }
        else if (curr_month == 7 && curr_date == 1) {//aug
            curr_date = 28
            from_curr_month = 7//july
        }
        else if (curr_month == 8 && curr_date == 1) {//sep
            curr_date = 28
            from_curr_month = 8//aug
        }
        else if (curr_month == 9 && curr_date == 1) {//oct
            curr_date = 28
            from_curr_month = 9//sep
        }
        else if (curr_month == 10 && curr_date == 1) {//november
            curr_date = 28
            from_curr_month = 10//oct
        }
        else if (curr_month == 11 && curr_date == 1) {//december
            curr_date = 28
            from_curr_month = 11//november
        }
        console.log(full_year);
        console.log(from_curr_month);
        console.log(curr_month);
        console.log(curr_month + 1);
        console.log(curr_date);
        console.log(curr_date - 1);

        return {
            full_year,
            from_curr_month,
            curr_date,
            curr_month,
        }
    }

    const updateNews = async () => {
        props.updateProgress(10)
        // let parsedQuery = props.query ? `&q=${props.query.split(' ').join('+')}` : '';
        console.log('Search text 3 = ', props.query);

        const { full_year, from_curr_month, curr_month, curr_date } = getDates();
        props.updateDropDownTitle(props.category.charAt(0).toUpperCase() + props.category.slice(1));
        let searchQuery = typeof props.query === 'string' && props.query.trim() !== ''
            ? `&q=${props.query.split(' ').join('+')}`
            : '';
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}${searchQuery}&category=${props.category}&pageSize=20&page=${page}&from=${full_year}-${from_curr_month}-${curr_date - 1}&to=${full_year}-${curr_month + 1}-${curr_date}&apiKey=${props.apiKey}`
        // let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=science&page=1&apiKey=ea2d177abf4b46eba102a2bd760ee125`

        setLoading(true);
        props.updateProgress(30);

        try {
            const data = await fetch(url);
            props.updateProgress(50);
            const parsedData = await data.json();
            props.updateProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
            props.updateProgress(100);
           
        }
    }

    useEffect(() => {
        updateNews();
    }, [page, props.query, props.category])//effect will run when page or query or category changes

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [articles]);

    const handlepreviousclick = async () => {
        setPage(page - 1);
    }

    const handlenextclick = async () => {
        setPage(page + 1)
    }
    return (
        <div className='news-container   my-3 mx-2' >
            <h2 className='mx-5' style={{ marginTop: '70px' }}>{props.title}</h2>
            {/* <h5>{props.searchQuery}</h5> */}
            <h5 className='mx-5'>
                {props.query && props.query !== '[object Object]' ? `Searching for ${props.query}` : ''}
            </h5>
            {loading ? <Spinner /> : null}
            {/* if loading is true then put spinner */}
            <div className="row">
                {articles && articles.length > 0 ? (
                    articles.map((element) => {

                        let realTitle = element.title == null ? "No Title" : element.title
                        let Title = realTitle.length >= 45 ? realTitle.slice(0, 45) + '...' : realTitle

                        let realDescription = element.description == null ? "No Description" : element.description
                        let Description = realDescription.length >= 88 ? realDescription.slice(0, 88) + '...' : realDescription


                        return <div className="col cols-md-3" key={element.url}>
                            <NewsItem title={Title} description={Description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })


                ) : (!loading && <NoArticle />)
                }
                <div className="container d-flex  justify-content-between my-3">
                    <button disabled={page <= 1} type="button" className="btn btn-info" onClick={handlepreviousclick}> &larr; Previous</button>
                    <span className="badge bg-primary text-light px-2 py-2" style={{
                        height: '27px', position: "relative",
                        top: "18%"
                    }}>
                        Page No: {totalResults >= 100 ? `${page}/${Math.ceil(100 / 20)}` : `${page}/${(Math.ceil(totalResults / 20) === 0 ? '1' : Math.ceil(totalResults / 20))}`}
                    </span>

                    <button
                        disabled={totalResults >= 100 ? page >= Math.ceil(100 / 20) : page >= Math.ceil(totalResults / 20)}
                        type="button"
                        className="btn btn-info"
                        onClick={handlenextclick}
                    >
                        Next &rarr;
                    </button>

                </div>
            </div>
        </div>
    )

}

News.defaultProps = {
    country: '',
    category: 'general',
    query: '',
};

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    query: PropTypes.string,
    updateProgress: PropTypes.func.isRequired,
    updateDropDownTitle: PropTypes.func.isRequired,
    apiKey: PropTypes.string.isRequired,
};

export default News
// my newsapi key
