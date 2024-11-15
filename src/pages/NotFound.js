import React from 'react'
import notfound from '../images/notfound.png'
import '../main/home.css'
export default function NotFound() {
  return (
    <div style={{display:"flex",margin:"0 auto"}}>
      <img src={notfound} alt='notfound' style={{maxWidth:"800px",maxHeight:"800px"}}/>
    </div>
  )
}
