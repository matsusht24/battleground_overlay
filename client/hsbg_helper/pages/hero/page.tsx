import React from 'react'
import HeroCard from '../ui/hero_card'
function Page() {
  return (
    <div className='flex grid-row'>
        Hero Selection
        <div className='flex grid-col'>
            <HeroCard/>
            <HeroCard/>
            <HeroCard/>
            <HeroCard/>
        </div>

    </div>
  )
}

export default Page;