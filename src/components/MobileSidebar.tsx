"use client"
import React from 'react'
import { Button } from './ui/button'
import { AiOutlineMenu } from 'react-icons/ai'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from './Sidebar'

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }
  , [])
  if (!isMounted) return null;

  return (
    <Sheet>
        <SheetTrigger>
        <Button variant="ghost" size="icon" className='md:hidden'>
            <AiOutlineMenu className='text-2xl'/>
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className='p-0'>
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar