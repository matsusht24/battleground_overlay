import React from 'react'
import Header from '../ui/header'
import NextButton from '../ui/NextButton'

//Composition page to display the comps you can play
export default function Page() {
  return (
    <div>
      <Header header_name='Composition Selection'/>
      <NextButton next_link='/'/>
    </div>
    
  )
}
