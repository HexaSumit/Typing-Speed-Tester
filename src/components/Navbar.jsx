import React, { useContext } from 'react'
import { CiKeyboard } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2"
import { TypingContext } from '../context/TypingContext';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const timings = [30, 45, 60, 120];
    const { setTime, hasStarted } = useContext(TypingContext)
    return (
        <div className=' flex items-center p-6  gap-12 bg-gray-900 shadow-md'>
            <Link to='/'>
                <div className=' flex items-center gap-3 text-yellow-500'>
                    <FaKeyboard size={30} className=' text-yellow-400' />
                    <h2 className=' text-3xl font-bold text-gray-200 '>Type_Master</h2>
                </div>
            </Link>
            <div className=' flex items-center gap-8'>
                <div className=' flex items-center gap-2'>
                    <CiKeyboard size={32} className=' text-gray-300 hover:text-yellow-400' />
                    <span className=' text-gray-200 hover:text-yellow-300'>Change Text</span>
                </div>
                <Link to='/leaderboard'>
                    <div className=' flex items-center gap-2'>
                        <FaCrown size={28} className=' text-gray-300 hover:text-yellow-400' />
                        <span className=' text-gray-200 hover:text-yellow-300'>Leaderboard</span>
                    </div>
                </Link>
                <div className=' flex items-center gap-2'>
                    <IoMdTime size={22} className=' text-gray-300 hover:text-yellow-400' />
                    <span className=' text-gray-200 hover:text-yellow-300'>time</span>
                </div>
                <div></div>
            </div>
            <div className=' bg-gray-700 px-8 py-0.5 flex items-center gap-6 rounded-lg cursor-pointer'>
                {timings.map((time, index) => {
                    return <span key={index} onClick={() => {
                        if (!hasStarted) setTime(time); // prevent changing time after start
                    }}
                        className={`text-gray-400 hover:text-gray-200 ${hasStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>{time}</span>
                })}
                <span><HiMiniWrenchScrewdriver className=' text-gray-400 hover:text-gray-200' /></span>
            </div>
        </div>
    )
}

export default Navbar