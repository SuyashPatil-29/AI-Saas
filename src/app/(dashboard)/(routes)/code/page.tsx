"use client"
import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'

import axios from 'axios'

import ReactMarkdown from 'react-markdown'

import * as z from 'zod'
import { formSchema } from './constants'
import {zodResolver} from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChatCompletionRequestMessage } from 'openai'
import Empty from '@/components/Empty'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/UserAvatar'
import { BotAvatar } from '@/components/BotAvatar'
import { FaCode } from 'react-icons/fa'


const CodePage = () => {

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
      
      const response = await axios.post('/api/code', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error: any) {
      console.log(error);
      
    } finally {
      router.refresh();
    }
  }

  return (
    <div className='pb-20'>
        <Heading 
        title='Code Generation'
        description='Generate Code using GPT-3.5 Turbo'
        icon={FaCode}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
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
                          <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-6'
                            disabled={isLoading}
                            autoComplete='off'
                            placeholder='Binary Search on a 2D sorted array'
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
            {messages.length === 0 && !isLoading && (
              <Empty label='No conversation started'/>
            )}
            <div className="flex flex-col gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn("w-full flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn('flex max-w-full items-start gap-x-8 border rounded-xl pl-4 p-6', message.role === "user" ? "border-green-700 md:border-black/10" : "border-red-700 md:border-black/10")}>
                <div className={"md:block hidden"}>
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                </div>
                <ReactMarkdown components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-slate-800 text-white p-4 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-slate-800 text-white md:p-2 p-1 rounded-lg" {...props} />
                  )
                }} className="text-sm overflow-hidden leading-7">
                  {message.content || ""}
                </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default CodePage