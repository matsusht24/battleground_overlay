import React, {useEffect, useState} from 'react'
import Header from './ui/header';
import Home_Cards from './ui/Home_Cards';

function Index() {
  return (

    <div>
      <Header header_name=''/>
      <div className='flex justify-between'>
          <Home_Cards topic='Hero'/>
          <Home_Cards topic='Lesser'/>
          <Home_Cards topic='Greater'/>
          <Home_Cards topic='Composition'/>
      </div>
    </div>
  )
}

export default Index;