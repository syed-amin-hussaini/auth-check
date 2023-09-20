import React from 'react'

const Footer = ({className=""}) => {
  return (
    <small className={`text-white fw_r text-center ${className}`} style={{fontSize: "0.75em"}}>
      &copy; {new Date().getFullYear()} Oreo Pakistan Instance - All rights reserved
    </small>
  )
}

export default Footer