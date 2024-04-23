'use client'
import { useSearchParams } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import QuestionTweet from "@/components/ui/question-tweet";
import { PopoverDemo } from '@/components/ui/popup-create';
import {
  Command,
  CommandInput,
} from "@/components/ui/command"


import React, { useState, useEffect } from "react";

interface QuoteMaterial {
  type: "quote";
  content: string;
  next_review_time: string;
  source?: string;
}

interface QuestionMaterial {
  type: "question";
  question: string;
  answer: string;
  next_review_time: string;
  displayAnswer?: boolean;
  source?: string;
}
const subtractTime = (dateString:string) => {
  const specifiedDate = new Date(dateString);
  if (isNaN(specifiedDate.getTime())) {
    return "Invalid date"; // Return an error message if the date is not valid.
  }
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - specifiedDate.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  return differenceInHours.toFixed(2).toString()+'hr';
};


export default function Console() {
  const [materials, setMaterials] = useState<Array<QuestionMaterial | QuoteMaterial>>([]);
  const searchParams = useSearchParams()
  const user_id = searchParams.get('user_id')
  const fetchMaterials = async () => {
    try {
      const response = await fetch('https://xlearn-rnuz.onrender.com/materials?user_id=' + user_id);
      const data = await response.json();
      setMaterials(data);
      console.log(data)
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    }
  };
  useEffect(() => {
    fetchMaterials();
  }, []);
  if (!user_id) return <div>Invalid user id</div> 

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='max-w-screen-xl w-full mx-auto'>
        <div className='grid gap-6 m-8 justify-self-center'>
          <div className="flex justify-center">
            <Command className='mr-4'>
              <CommandInput placeholder="Type a command or search..." />
            </Command>
            <PopoverDemo onAddMaterial={fetchMaterials} user_id={user_id} ></PopoverDemo>
          </div>
          <ScrollArea className="h-72 w-auto rounded-md border">
            <div className="p-4">
              <h1 className="mb-4 text-sm font-medium leading-none">Tags</h1>
              <Separator className="my-2" />
              {materials.map((tweet, index) => (
                <>
                  <QuestionTweet
                    key={index}
                    content={tweet.type === 'quote' ? tweet.content : tweet.question}
                    time={subtractTime(tweet.next_review_time).toString()}
                  />
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );  
}
