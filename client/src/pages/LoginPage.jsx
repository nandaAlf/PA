import React from 'react'
import UserForm from '../components/forms/UserForm'
import { refreshAccessToken } from '../services/api'



// const refresh= ()=>{
//      refreshAccessToken()
// }

export default function LoginPage({changeUser}) {
  return (
    <>
      <UserForm changeUser={changeUser}/>
    </>
  )
}
