import React, { Component } from 'react'
import loading from './Fidget-spinner.gif'

const Spinner =()=> {
  
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading" />
      </div>
    )
  
}

export default Spinner
