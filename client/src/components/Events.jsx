import React, { useEffect } from 'react'
import EventCards from './UI/EventCards'
import Footer from './UI/Footer'
import Navbar from './UI/Navbar'
import { useState } from "react";
import {useSelector, useDispatch } from 'react-redux'
import {getAllEvents} from '../store/actions'
import { useNavigate } from "react-router-dom";


const Events = () => {
  const searchLive = useSelector((state) => state.searchLive)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const eventos = useSelector((state) => state.events)
  const categories = useSelector((state) => state.categories)
  const artists = useSelector((state) => state.artists)
  const place = useSelector((state) => state.places)
  const [filtered, setFiltered] = useState()
  const [filters, setFilters] = useState({category: "-", artist: "-", place: "-"})
  const [searchFilter, setSearchFilter] = useState()
  
 
 
  useEffect(() => {
      dispatch(getAllEvents())
      getFiltered()
      // searching()
  },[dispatch, filters])



  function filterArr(array, value) {
    for(let i = 0; i < array.length; i++){
      if(array[i] === value) return true
    }
  }


  function selectCategory(e) {
    if(e.target.value === "-"){
      setFilters({...filters, category: "-"})
    } else {
      setFilters({...filters, category: e.target.value})
    }
  }

  function selectArtist(e) {
    if(e.target.value === "-"){
      setFilters({...filters, artist: "-"})
    } else {
      setFilters({...filters, artist: e.target.value})
    }
  }

  function selectPlace(e){
    if(e.target.value === "-") {
      setFilters({...filters, place: "-"})
    } else {
      setFilters({...filters, place: e.target.value})
    }
  }

  // function filterIncludes(arr, value){
  //   for(let i = 0; i < arr.length; i++){
  //     if(arr[i].includes(value)) return true
  //   }
  // }

  // function searching(){
  //   if(filtered) {
  //     let searchIncludes = filtered.filter(el => filterIncludes(el.artist, value) || filterIncludes(el.category, value) || el.place.includes(searchLive))
  //     setSearchFilter(searchIncludes)
  //   } 
  //   if(!filtered) {
  //     let searchIncludes = eventos.filter(el => filterIncludes(el.artist, value) || filterIncludes(el.category, value) || el.place.includes(searchLive))
  //     setSearchFilter(searchIncludes)
  //   }
  // }

  function getFiltered() {
    const {category, artist, place} = filters
    if(category !== "-" && artist === "-" && place === "-"){
      let filtrado = eventos.filter(el => filterArr(el.category, category))
      setFiltered(filtrado)
    } 
    if(category !== "-" && artist === "-" && place !== "-"){
      let filtrado = eventos.filter(el => filterArr(el.category, category) && el.place === place)
      setFiltered(filtrado)
    }
    if(category !== "-" && artist !== "-" & place === "-"){
      let filtrado = eventos.filter(el => filterArr(el.category, category) && filterArr(el.artist, artist))
      setFiltered(filtrado)
    }
    if(category !== "-" && artist !== "-" & place !== "-"){
      let filtrado = eventos.filter(el => filterArr(el.category, category) && filterArr(el.artist, artist) && el.place === place)
      setFiltered(filtrado)
    } 
    if(category === "-" && artist === "-" && place !== "-"){
      let filtrado = eventos.filter(el => el.place === place)
      setFiltered(filtrado)
    }
    if(category === "-" && artist !== "-" && place === "-"){
      let filtrado = eventos.filter(el => filterArr(el.artist, artist))
     
      setFiltered(filtrado)
    }
    if(category === "-" && artist !== "-" && place !== "-"){
      let filtrado = eventos.filter(el => filterArr(el.artist, artist) && el.place === place)
      console.log("Dos filtrados ", filtrado)
      setFiltered(filtrado)
    }
    if(category === "-" && artist === "-" && place === "-") {
      setFiltered()
    }
  }

  return (
    <>
        <Navbar />
        <div className='flex flex-col p-0 w-376 h-328'>
          <div className=' pt-10 pl-1 pr-1 pb-10 '>
              <p className='pl-7 font-extrabold text-3xl' >Explorar</p>
              <p className='pl-7 font-light text-gray-500 pt-2'>Explora entre los proximos eventos</p>
              <p className='pl-7  font-light text-gray-500 pt-4'>Categorias</p>
              <div className='pl-7 pr-7 pt-3'>
              <select onChange={(e) => selectCategory(e)} className='w-full'>
                 <option value="-">-</option>
                { 
                  categories?.map((el) => {
                    return (
                      <option key={el} value={el}>{el}</option>
                    )
                  })
                } 
              </select>  
              </div>

              <p className='pl-7  font-light text-gray-500 pt-4'>Artistas</p>
              <div className='pl-7 pr-7 pt-3'>
              <select onChange={(e) => selectArtist(e)} className='w-full'>
                 <option value="-">-</option>
                { 
                  artists?.map((el) => {
                    return (
                      <option key={el} value={el}>{el}</option>
                    )
                  })
                } 
              </select>
              </div>

              <p className='pl-7  font-light text-gray-500 pt-4'>Lugar</p>
              <div className='pl-7 pr-7 pt-3'>
              <select onChange={(e) => selectPlace(e)} className='w-full'>
                 <option value="-">-</option>
                { 
                  place?.map((el) => {
                    return (
                      <option key={el} value={el}>{el}</option>
                    )
                  })
                } 
              </select>
                
              </div>
          </div>
        </div>
        
        { 
          filtered ? filtered.map((el) => {
          return (
            <div key={el.id}>
                  <EventCards key={el.id} description={el.description} id={el.id} price={el.price}  brand={el.brand} title={el.title} stock={el.stock}/>
                  </div>
          )
        }) :
          eventos?.map((el) => {
          return (
            <div key={el.id}>
                  <EventCards key={el.id} description={el.description} id={el.id} price={el.price}  brand={el.brand} title={el.title} stock={el.stock}/>
                  </div>
          )
        })
        }

        <Footer />
    </>
  )
}

export default Events