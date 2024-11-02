import React from 'react'
import HeroCard from '../ui/hero_card'


function Page() {
  return (
        <main className='m-10'>
          <header className='text-center font-bold text-4xl p-12'>Hero Selection</header>
          <div className='flex justify-between'>
              <HeroCard position='1'/>
              <HeroCard position='2'/>
              <HeroCard position='3'/>
              <HeroCard position='4'/>
          </div>  
        </main>
        
  )
}

export default Page;