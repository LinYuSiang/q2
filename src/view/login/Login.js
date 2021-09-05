import React, { useState, useEffect, useRef } from 'react'
// import './register.scss'/
import { useHistory } from 'react-router-dom';
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

  const confirmSubmit = async () =>{  //登入
      const aaa = await fetch('/api/login', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(param), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(((res)=>{
        console.log(res, 8888)
        if (res.status === 200)
          history.push('./home')
      }))
    console.log(aaa);
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
    <div className='register'>
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
