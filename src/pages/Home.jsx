import React from 'react'
import TypingBox from '../components/TypingBox'
import Navbar from '../components/Navbar'
// import ShowResult from '../components/ShowResult'

const Home = () => {
  return (
    <div className=' h-screen'>
        <Navbar />
        <TypingBox />
    </div>
  )
}

export default Home