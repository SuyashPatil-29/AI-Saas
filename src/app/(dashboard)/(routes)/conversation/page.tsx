"use client"
import Heading from '@/components/Heading'
import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'

import {BiMessageDetail} from 'react-icons/bi'


const ConversationPage = () => {

  const form = useForm({
    defaultValues: {
      prompt: ""
    }
  })


  return (
    <div>
        <Heading 
        title='Conversation'
        description='Our Most Advanced Conversation Model'
        icon={BiMessageDetail}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
        />
        <div className='px-4 lg:px-8'>

        </div>
    </div>
  )
}

export default ConversationPage