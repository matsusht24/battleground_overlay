import React, {useState, Suspense, useEffect}from 'react'
import SearchBar from './search_bar'
import Image from "next/image";
import Tier from './tier';
type HeroCardProps = {
  position: number; // or '1' | '2' | '3' | '4' if it's a fixed set of positions
  heroData: Record<string, string>; // Hero name => hero tier
  onSelect: ( hero:string) => void
};


  export default function HeroCard({position, heroData, onSelect}: HeroCardProps) {
  if (!heroData) {
    return <p>No hero data available.</p>; // Fallback for undefined heroData
  }
  const [heroName, setHeroName] = useState("A_F_KAY")
  const [tier, setTier] = useState("F");
  const handleHeroSelect = (selectedHero: string) => {
    const formattedHeroName = selectedHero.replace(/[\s',.]+/g, '_');
    setHeroName(formattedHeroName);
    setTier(heroData[selectedHero]);
    onSelect(selectedHero);
  };

  return (
    <div className='flex-col justify-center items-center'>
      <div className='w-full flex justify-center items-center'>
        <strong className='text-xl text-center'>{"Hero #" + position}</strong>
      </div>
      
       
       
       <div>
        <Image src={`/hero_portraits/${heroName}_Portrait.png`}
            width={350}
            height={371}
            alt="hero portrait" />
        <Tier tier={tier}/>
       </div>
        <div><SearchBar onHeroSelect={handleHeroSelect} heroData={heroData}/></div>
      
    </div>
   
   
  )
}

