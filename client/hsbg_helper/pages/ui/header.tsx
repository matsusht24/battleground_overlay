import React from 'react'
import Nav_bar from './nav_bar'
import Link from 'next/link';

type HeaderProps = {
    header_name: string;
};
function Header({header_name}: HeaderProps) {
  return (
    <div>
        <div className='flex justify-between'>
            <Link href='/' className='font-bold text-4xl pb-8'>Hearthstone BG Helper</Link>
            <Nav_bar/>
        </div>
        {header_name && <header className='text-center font-bold text-3xl pb-8'>{header_name}</header>}
        
    </div>
    
  )
}

export default Header