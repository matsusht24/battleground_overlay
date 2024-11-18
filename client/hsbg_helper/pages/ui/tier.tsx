import React from "react";

type TierTypes = 'S'|'A'|'B'|'C'|'D'|'F';
const color_dict = {
    'S': 'bg-tierColor-S',
    'A': 'bg-tierColor-A',
    'B': 'bg-tierColor-B',
    'C': 'bg-tierColor-C',
    'D': 'bg-tierColor-D',
    'F': 'bg-tierColor-F',

}

export default function Tier({tier}: {tier:TierTypes}){
    
    return <p className={`p-4 w-1/3 text-center rounded-sm border-black border-2 ml-auto mr-auto mb-2 ${color_dict[tier]} `}> {tier} </p>; 
}