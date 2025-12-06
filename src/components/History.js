import React, { useEffect, useState } from "react";
// import "../history.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("newsHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const shareNews = (title, url) => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: "Hey!!! Check out this news!!!",
          url
        })
        .catch(() => alert("Failed to share."));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("newsHistory");
    setHistory([]);
  };

  const defaultImage = "/assets/images/logo.png";

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="d-flex justify-content-between mb-3" style={{ alignItems: "center" }}>
        <h2>Your History</h2>
        {history.length > 0 && (
          <button onClick={clearHistory} className="btn btn-danger ">
            Clear History
          </button>
        )}

      </div>
      {history.length === 0 && (
        <p style={{ color: "grey" }}>You haven't viewed any news yet.</p>
      )}

      <div className="row">
        {history.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>

            <div className="card h-100 shadow-sm">
              <img
                src={item.image || defaultImage}
                alt="News"
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.src = process.env.PUBLIC_URL + "/assets/images/logo.png";
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {item.title.length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </h5>

                <p className="card-text">
                  <small className="text-body-secondary">
                    Viewed on {new Date(item.date).toLocaleString()}
                  </small>
                </p>

                <div className="mt-auto d-flex">
                  <a
                    rel="noreferrer"
                    href={item.url}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => shareNews(item.title, item.url)}
                  >
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
