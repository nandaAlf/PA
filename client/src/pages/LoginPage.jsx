import React from 'react'
import UserForm from '../components/UserForm'
import { refreshAccessToken } from '../services/api'

const refresh= ()=>{
     refreshAccessToken()
}

export default function LoginPage() {
  return (
    <>
      <button onClick={refresh}>Refresh</button>
      <UserForm/>
    </>
  )
}
