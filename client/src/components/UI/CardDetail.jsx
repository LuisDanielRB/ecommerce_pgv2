import React from 'react'
import Footer from './Footer'
import { useSelector, useDispatch } from 'react-redux'
import { getEventDetail } from '../../store/actions'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'


const CardDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const eventDetail = useSelector((state) => state.eventsDetail)

  useEffect(() => {
    dispatch(getEventDetail(id))
  }, [dispatch, id])

  return (
    <>
      <div className="m-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"}>
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
        <section className=' flex flex-col align-middle w-auto h-96 mb-52 bg-black '>
          <p className=' flex pt-20 pl-10 text-white font-extrabold text-3xl'>ARTISTA: {eventDetail && eventDetail.artist}</p>
          <br />
          <div className='bg-white w-4/6 self-center rounded-t-lg rounded-b-lg '>
            <div className='ml-7 pt-7'>
              <p className='font-extrabold text-xl m-3'>Description: {eventDetail && eventDetail.description}</p>
              <p className='font-extrabold text-xl m-3'>Place: {eventDetail && eventDetail.place}</p>
              <p className='font-extrabold text-xl m-3'>Date: {eventDetail && eventDetail.date}</p>
              <p className='font-extrabold text-xl m-3'>Price: {"$" + eventDetail.price}</p>
              <p className='font-extrabold text-xl m-3'>Stock: {eventDetail && eventDetail.stock}</p>
            </div>
            <Link to="/private/cart">
              <button className='bg-gray-200 w-full pl-8 mt-60 text-left h-10 rounded-b-lg'>Comprar tu boleto</button>
            </Link>
          </div>
        </section>
        <div className="p-20">
          <Footer />
        </div>
    </>
  )
}

export default CardDetail