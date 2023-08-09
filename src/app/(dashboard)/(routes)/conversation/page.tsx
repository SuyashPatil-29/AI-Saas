"use client"
import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'

import axios from 'axios'

import * as z from 'zod'
import { formSchema } from './constants'
import {zodResolver} from '@hookform/resolvers/zod'

import {BiMessageDetail} from 'react-icons/bi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChatCompletionRequestMessage } from 'openai'


const ConversationPage = () => {

  const router = useRouter()

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error: any) {
      console.log(error);
      
    } finally {
      router.refresh();
    }
  }

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
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                  <FormField
                    name='prompt'
                    render={({field}) => (
                      <FormItem className='col-span-12 lg:col-span-10'>
                        <FormControl className='m-0 p-0'>
                          <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                            disabled={isLoading}
                            placeholder='How do I calculate the radius of a circle?'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                   />
                   <Button className='col-span-12 lg:col-span-2 w-full rounded-[8px]' disabled={isLoading}>
                     Generate
                   </Button>
              </form>
            </Form>
          </div>

          <div className='space-y-4 mt-4'>
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((message)=>(
                <div key={message.content} className={`flex items-center gap-x-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`rounded-full bg-violet-500 p-2 text-white ${message.role === "user" ? "ml-auto" : ""}`}>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ConversationPage