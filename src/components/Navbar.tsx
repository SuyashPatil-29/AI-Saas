import React from 'react'
import { Button } from './ui/button'
import {AiOutlineMenu} from 'react-icons/ai'
import { UserButton } from '@clerk/nextjs'

function Navbar() {
  return (
    <div className='flex items-center p-4'>
        <Button variant="ghost" size="icon" className='md:hidden'>
            <AiOutlineMenu className='text-2xl'/>
        </Button>
        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </div>
  )
}

export default Navbar