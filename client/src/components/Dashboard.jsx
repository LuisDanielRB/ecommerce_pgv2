import React from 'react'
import EventCards from './UI/EventCards'
import Footer from './UI/Footer'
import Navbar from './UI/Navbar'
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
import {getAllEvents} from '../store/actions'




const Dashboard = () => {
    
    const dispatch = useDispatch()
    const eventos = useSelector((state) => state.events)
    
    useEffect(() => {
      dispatch(getAllEvents())
  },[dispatch])


  return (
    <>
        <Navbar />
        <EventCards/>
        <Footer />
    </>
  )
}

export default Dashboard