import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userData } from '../../app/slices/userSlice';
import tattoo from '../../images/tiendaTattoo.jpg';
import "./Home.css";



export const Home = () => {
  const userLogued = useSelector(userData).decodificado
  const userToken = useSelector(userData).token

  return (
    <>

      <div className='homeDesign'>
        <img src={tattoo} alt="tatuando" />
      </div>
    </>
  )
}











