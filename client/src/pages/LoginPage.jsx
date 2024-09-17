import React from 'react'
import UserForm from '../components/UserForm'
import { refreshAccessToken } from '../services/api'
import {toastSuccess} from "../util/Notification"



const refresh= ()=>{
     refreshAccessToken()
}

export default function LoginPage({changeUser}) {
  return (
    <>
      <UserForm changeUser={changeUser}/>
    </>
  )
}
