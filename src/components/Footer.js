import React from 'react'

const Footer = ({className=""}) => {
  return (
    <small className={`text-white fw_r text-center ${className}`}>
      &copy; {new Date().getFullYear()} Oreo Pakistan Instance - All rights reserved
    </small>
  )
}

export default Footer