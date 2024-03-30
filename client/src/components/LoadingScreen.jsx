import React from 'react'
import loadIcon from "../images/Animation.gif";
const LoadingScreen = () => {
  return (
    <div className='flex justify-center items-center flex-1'>
    <img src={loadIcon} className='h-72'/>
    </div>
  )
}

export default LoadingScreen