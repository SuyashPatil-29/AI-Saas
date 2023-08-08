"use client"

import {BiMessageDetail} from 'react-icons/bi'
import {BsCardImage} from 'react-icons/bs'
import {FaVideo, FaCode} from 'react-icons/fa'
import {ImMusic} from 'react-icons/im'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

const tools = [
  {
    label: 'Conversation',
    icon: BiMessageDetail,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    icon: ImMusic,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    icon: BsCardImage,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: FaVideo,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: FaCode,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
];

export default function DashboardPage() {

  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Choose the tool that best fits your needs and get started now.
        </p>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool)=>{
            return(
              <Card onClick={()=>router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-xl shadow-md hover:scale-105 transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <AiOutlineArrowRight className="w-5 h-5" />
            </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
