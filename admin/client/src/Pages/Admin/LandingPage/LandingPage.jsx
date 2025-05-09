import React from 'react'
import './LandingPage.css'
import banner from '../../../assets/landing_banner.jpg'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../../Components/Admin/NavBar/NavBar'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
   <>
    <NavBar/>
    <div className='eb-landing-container'>
     
      <div>
      <motion.div 
        className='eb-landing-content'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className='eb-landing-content-left'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            Edu - Bridge
          </motion.span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2 }}
          >
            Welcome to Edu - Bridge! This platform connects students and staff for easy communication, collaboration, and support. Stay updated and engaged effortlessly!<br />
            This portal will bridge the gap between students and staff, enabling smooth interaction.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/register')} >
            Register your department to make better communication <i className='bx bx-right-arrow-alt'></i>
          </motion.button>
        </motion.div>
        
        <motion.div
          className='eb-landing-content-right'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.img
            src={banner}
            alt=""
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      </motion.div>

      </div>
    </div>
    </>
  )
}

export default LandingPage
