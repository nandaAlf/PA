import React from 'react'
import UserForm from '../components/UserForm'
import { refreshAccessToken } from '../services/api'
import {toastSuccess} from "../util/Notification"



const refresh= ()=>{
     refreshAccessToken()
}

export default function LoginPage() {
  return (
    <>
     <button onClick={()=>toastSuccess("agua")}>KKK</button>
      <button onClick={refresh}>Refresh</button>
      <UserForm/>
     
      {/* {toastSuccess("¡Operación exitosa!")} */}
    </>
  )
}
