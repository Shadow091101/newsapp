
import React, { Component } from 'react'

const NewsItem = ({ title, description, imageurl, newsUrl, author, date, sources }) => {


  const shareNews = (title, text, url) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      })
        .then(() => {})
        .catch((error) => alert("Failed to share."))
    } else {
      alert("Sharing is not supported on this browser.")
    }

  }


  let Source = sources ? (sources.length >= 20 ? `${sources.slice(0, 20)}...` : sources) : 'Unknown Source';

  // React automatically serves files from the public folder, so you don't need to include public in the path. 
  const defaultImage = "/assets/images/logo.png";
  const validImageUrl = imageurl || defaultImage;
  return (
    <div className='newsitem-container my-2 mx-32'>
      <div className="card" style={{ width: "18rem", objectFit: "cover" }}>
        <img src={validImageUrl} className="card-img-top" alt="No News Image" height="200px" onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/assets/images/logo.png"; }} />
        <div className="card-body" >
          <h5 className="card-title" height="20px">{title}<h5><span class="badge text-bg-secondary">{Source}</span></h5></h5>
          <p className="card-text" height="50px">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author || 'Unknown'} on {new Date(date).toUTCString()}</small></p>
          <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-primary">Read More</a>
          <button className="btn btn-secondary mx-2" onClick={() => shareNews(title, description, newsUrl)}>
            <i className="bi bi-share"></i>
          </button>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
