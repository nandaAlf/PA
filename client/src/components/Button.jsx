import React from 'react'
import "../css/basic.css"

export default function Button({prop,action}) {
  return (
    <>
       <input type="button" value={prop} onClick={action} />
    </>
  )
}
