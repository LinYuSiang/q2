import React, { useState, useEffect, useRef } from 'react'
import './login.scss'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Store from '../../localStrage/Store'

const Login = () => {
  const history = useHistory()
  var sta = true
  const [param, setParam] = useState({'username':'','password':''})

  const userName = (val) =>{ //帳號
    console.log(val.target.value)
    setParam({
      ...param,
      'username': val.target.value,
    })
  }

  const passWord = (val) =>{  //密碼
    console.log(val.target.value)
    setParam({
      ...param,
      'password': val.target.value,
    })
  }

  const confirmSubmit =  () =>{  //登入
    axios.post('https://l8-upgrade-apis.vercel.app/api/login', {
      username: param.username,
      password: param.password
    }).then((res)=>{
      console.log(res)
      Store.addStorage("token", res.data.token) //localStorage 集中管理
      if (res.status === 200)
        history.push('./home')
    })
  }

  const changeText = () =>{  //隱碼轉換
    const hide_pwd = '*'
    sta =! sta
    if (sta === true){
      document.getElementById('pwd').value = param.password
    }else{
      document.getElementById('pwd').value = hide_pwd.repeat(param.password.length)
    }
  }
  return (
    <div className='login'>
      <div className='title'>
        <span>登入</span>
      </div>

      <div className='body'>
        <div className='items'>
          <p>帳號:</p>
          <input onChange={val=>{userName(val)}} />
        </div>

        <div className='items'>
          <p>密碼:</p>
          <input onChange={val=>{passWord(val)}} id='pwd' />
          <div onClick={()=>{changeText()}}>icon</div>
        </div>

        <div className='button'>
          <button onClick={()=>{confirmSubmit()}} className='register-botton'>登入</button>
          <button className='register-goback' onClick={()=>{history.push('./register')}}>註冊</button>
        </div>
      </div>

    </div>
  );
}

export default Login;
