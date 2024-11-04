import React, {useState, Suspense, useEffect}from 'react'
import SearchBar from './search_bar'
import Image from "next/image";

export default function HeroCard({position}: string, heroData: object) {
  if (!heroData) {
    return <p>No hero data available.</p>; // Fallback for undefined heroData
  }
  const [heroName, setHeroName] = useState("A_F_KAY")
  const handleHeroSelect = (selectedHero: string) => {
    const formattedHeroName = selectedHero.replace(/[\s'.]+/g, '_');
    setHeroName(formattedHeroName);
    console.log(formattedHeroName);
  };
  return (
    <div className='flex-col justify-center'>
      <strong className='text-center text-xl'>{"Hero #" + position}</strong>
       
       
       <div>
        <Image src={`/${heroName}_Portrait.png`}
            width={350}
            height={371}
            alt="hero portrait" />
       </div>
        <div><SearchBar onHeroSelect={handleHeroSelect} heroData={heroData}/></div>
      
    </div>
   
   
  )
}

