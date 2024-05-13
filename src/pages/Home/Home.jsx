import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userData } from '../../app/slices/userSlice';
import "./Home.css";



export const Home = () => {
  const userLogued = useSelector(userData).decodificado
  const userToken = useSelector(userData).token

  console.log(userLogued)
  return (
    <>
      
      <div className='homeDesign'>
           <h1>Home</h1>       
          {userLogued.firstName?(
            <>
            <h2>{userLogued.firstName}</h2>
            </>
          ):(
             <p>NACHO TATTO</p> 
          )}   
          </div>
    </>
  )
}











