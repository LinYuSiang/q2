import React, {useState, useEffect, useRef} from 'react'
import './register.scss'
import {useHistory} from 'react-router-dom';

const Register = () => {
  const history = useHistory()
  var pwdSta = true
  var confirmSta = true
  const [param, setParam] = useState({'username': '', 'password': '',"name":''})
  const [psd, setPsd] = useState('')
  const [errorWord, setErrorWord] = useState('')
  const dot = <span className='dot'>*</span>


  const userName = (val) => { //帳號
    console.log(val.target.value)
    setParam({
      ...param,
      'username': val.target.value,
    })
  }
  const Name = (val) => { //帳號
    console.log(val.target.value)
    setParam({
      ...param,
      'username': val.target.value,
    })
  }
  const passWord = (val) => {  //密碼
    console.log(val.target.value)
    setParam({
      ...param,
      'password': val.target.value,
    })
  }
  const confirmPassWord = (val) => { //確認密碼
    console.log(val.target.value)
    setPsd(val.target.value,)
  }
  const confirmSubmit = async () => {  //
    const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const pwd = /[a-zA-Z]{1,}\d*[a-zA-Z]{1,}/
    const patten = param.password.length < 4 || param.password.length > 9
    if (!email.test(param.username)) {
      return setErrorWord("必須是信箱")
    }
    if (patten || !pwd.test(param.password)) {
      return setErrorWord("4-8字元；首尾必須是英文；中間必須是數字")
    }
    if (patten || !pwd.test(psd)) {
      return setErrorWord("4-8字元；首尾必須是英文；中間必須是數字")
    }

    if (param.password === psd && psd !== undefined) {
      await fetch('https://l8-upgrade-apis.vercel.app/api/register', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(param), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((res) => {
        if (res.status) {
          history.push('./login')
        }
      })

    } else {
      setErrorWord("密碼與確認密碼不相符")
    }
  }

  const changeText = (val) => {
    const hide_pwd = '*'

    if (val === "pwd") {
      pwdSta = !pwdSta
      if (pwdSta === true) {
        document.getElementById('pwd').value = param.password
      } else {
        document.getElementById('pwd').value = hide_pwd.repeat(param.password.length)
      }
    } else {
      confirmSta = !confirmSta
      if (confirmSta === true) {
        document.getElementById('confirmPwd').value = psd
      } else {
        document.getElementById('confirmPwd').value = hide_pwd.repeat(psd.length)
      }
    }
  }

  return (
    <div className='register'>
      <div className='title'>
        <span>註冊</span>
      </div>
      <div className='body'>
        <div className='items'>
          <p>{dot}帳號:</p>
          <input
            placeholder={"必須是信箱"}
            onChange={val => {
              userName(val)
            }}/>
        </div>

          <div className='items'>
            <p> 使用者名稱:</p>
            <input
              placeholder={"對其他用戶顯示"}
              onChange={val => {
                Name(val)
              }}/>
          </div>

        <div className='items'>
          <p>{dot}密碼:</p>
          <input
            onChange={val => {
              passWord(val)
            }}
            id='pwd'
            placeholder={"4-8字元；首尾必須是英文；中間必須是數字"}
          />
          <div onClick={() => {
            changeText("pwd")
          }}>icon
          </div>
        </div>

        <div className='items'>
          <p>{dot}確認密碼:</p>
          <input
            onChange={val => {
              confirmPassWord(val)
            }}
            id='confirmPwd'
            placeholder={"4-8字元；首尾必須是英文；中間必須是數字"}
          />
          <div onClick={() => {
            changeText("confirmPwd")
          }}>icon
          </div>
        </div>

        <div className='error-word'>{errorWord}</div>
        <div className='button'>
          <button onClick={() => {
            confirmSubmit()
          }} className='register-botton'>註冊
          </button>
          <button className='register-goback' onClick={() => history.push('./login')}>返回</button>
        </div>

      </div>
    </div>
  );
}

export default Register;
