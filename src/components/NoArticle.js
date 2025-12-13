import React from 'react'
// import NoArticleimage from './NoArticleImage.png'
import NoArticleFound from './NoArticlesFound.mp4'

export default function NoArticle() {
  return (
    <div>
      <div className='text-center'>
        <video
          src={NoArticleFound}    // your video file path
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            border: "none",
            outline: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  )
}
