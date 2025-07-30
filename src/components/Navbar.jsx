import React from 'react'
import { CiKeyboard } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2"
const Navbar = () => {
    const timings=[15,30,60,120];
  return (
    <div className=' flex items-center p-6 gap-12 bg-gray-900 shadow-md'>
        <div className=' flex items-center gap-3 text-yellow-500'>
            <FaKeyboard size={30} className=' text-yellow-400'/>
            <h2 className=' text-3xl font-bold text-gray-200 '>Type_Master</h2>
        </div>
        <div className=' flex items-center gap-8'>
            <div className=' flex items-center gap-2'>
                <CiKeyboard size={32} className=' text-gray-300 hover:text-yellow-400'/>
                <span className=' text-gray-200 hover:text-yellow-300'>Change Text</span>
            </div>
            <div className=' flex items-center gap-2'>
                <FaCrown size={28} className=' text-gray-300 hover:text-yellow-400'/>
                <span className=' text-gray-200 hover:text-yellow-300'>Leaderboard</span> 
            </div>
            <div className=' flex items-center gap-2'>
                <IoMdTime size={22} className=' text-gray-300 hover:text-yellow-400'/>
                <span className=' text-gray-200 hover:text-yellow-300'>time</span> 
            </div>
            <div></div>
        </div>
        <div className=' bg-gray-700 px-8 flex items-center gap-6 rounded-md'>
            {timings.map((time,index)=>{
                return <span key={index} className=' text-gray-400'>{time}</span>
            })}
            <span><HiMiniWrenchScrewdriver className=' text-gray-400 hover:text-gray-200'/></span>
        </div>
    </div>
  )
}

export default Navbar