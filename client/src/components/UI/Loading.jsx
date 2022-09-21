import React from 'react'
import Lottie from "lottie-react";
import loading from "../../assets/98432-loading.json";

const options = {
    animationData: loading,
    autoplay: true,
    loop: false,
    style: {
        width: "20%"
    },
    duration: 500,
}

export default function Loading() {
  return (
  <div className='flex justify-center items-center h-screen '>
    <Lottie {...options}/>
  </div>)
}
