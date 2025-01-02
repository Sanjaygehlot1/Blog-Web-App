import React from 'react'

function Button(
   { type ="button",
    classname = "",
    children,
    bgColor = "bg-blue-600",
    textColor = "text-white",
    onclick=()=>{}}



) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${classname} ${bgColor} ${textColor}` } onClick={onclick}>
        {children}
 
    </button>
  )
}

export default Button
