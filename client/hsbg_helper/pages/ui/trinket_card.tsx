import React, {useState, Suspense, useEffect}from 'react'
import SearchBar from './search_bar'
import Image from "next/image";
import Tier from './tier';
type TrinketCardProps = {
  position: number; // or '1' | '2' | '3' | '4' if it's a fixed set of positions
  trinketData: Record<string, string>; // Hero name => hero tier
  onSelect: ( trinket:string) => void
};


  export default function TrinketCard({position, trinketData, onSelect}: TrinketCardProps) {
  if (!trinketData) {
    return <p>No trinket data available.</p>; // Fallback for undefined trinketData
  }
  const [trinketName, setTrinketName] = useState("Alliance_Keychain")
  const [tier, setTier] = useState("F");
  const handleTrinketSelect = (selectedTrinket: string) => {
    const formattedTrinketName = selectedTrinket.replace(/[\s':.]+/g, '_');
    setTrinketName(formattedTrinketName);
    setTier(trinketData[selectedTrinket]);
    onSelect(selectedTrinket);
  };

  return (
    <div className='flex-col justify-center'>
      <div className='w-full flex justify-center items-center'>
        <strong className='text-center text-xl'>{"Trinket #" + position}</strong>
      </div>
      
       
       
       <div className="pl-3 pr-3">
        <Image src={`/trinket_portraits/${trinketName}.jpg`}
            width={350}
            height={371}
            alt="trinket portrait" />
        <Tier tier={tier}/>
        <SearchBar onHeroSelect={handleTrinketSelect} heroData={trinketData}/>
       </div>      
    </div>
   
   
  )
}

