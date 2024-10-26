import React from 'react'
import NoArticleimage from './NoArticleImage.png'

export default function NoArticle() {
  return (
    <div>
      <div className='text-center'>
        <img src={NoArticleimage} alt="Loading" style={{height:"50%" ,width:"70%"}} />
      </div>
    </div>
  )
}
