import React from 'react'
import TypingBox from '../components/TypingBox'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className=' bg-gray-800  min-h-screen'>
        <Navbar />
        <TypingBox />
    </div>
  )
}

export default Home