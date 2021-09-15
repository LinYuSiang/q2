import React, { useState, useEffect, useRef } from 'react'
import './home.scss'
import { useHistory } from 'react-router-dom';
import Store from '../../localStrage/Store'
import axios from "axios";
const Home = () => {
  const  [user, setUser] = useState("")
  useEffect(()=>{
    axios.get('https://l8-upgrade-apis.vercel.app/api/user',{
      headers:{
        "Authorization": `Bearer ${Store.readStorage("token")}`,
      }
    }).then((res)=>{
      setUser(res.data.data)
      console.log(res)
    })
  },[])
  console.log(user)
  return (
    <div className='home'>
      <div className='header'>
        <h1>LOGO</h1>
        <div className="user">
          {user.name && (
            <span className="user-name">({user.name})</span>
          )}
          <span className="user-username">{user.username}</span>
        </div>
      </div>
      <div className="sideBar">

      </div>
    </div>
  );
}

export default Home;
