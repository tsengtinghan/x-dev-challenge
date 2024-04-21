'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import QuestionTweet from "@/components/ui/question-tweet";
import { PopoverDemo } from '@/components/ui/popup-create';
import React, { useState, useEffect } from "react";
import { type } from 'os';

interface QuoteMaterial {
  type: "quote";
  content: string;
  nextReviewTime: string;
  source?: string;
}

interface QuestionMaterial {
  type: "question";
  question: string;
  answer: string;
  nextReviewTime: string;
  displayAnswer?: boolean;
  source?: string;
}


const tweets = [
  { content: "hi", time: "11hr" },
  { content: "hello", time: "12hr" },
  { content: "hey", time: "13hr" },
];
export default function Console() {
  const [materials, setMaterials] = useState<Array<QuestionMaterial | QuoteMaterial>>([]);
  const searchParams = useSearchParams()
  const user_id = searchParams.get('user_id')
  if (!user_id) return <div>Invalid user id</div> 
  const fetchMaterials = async () => {
    try {
      const response = await fetch('https://your-backend-url.com/materials');
      const data: Array<QuestionMaterial | QuoteMaterial> = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center">
        <PopoverDemo onAddMaterial={fetchMaterials}></PopoverDemo>
      </div>
      <ScrollArea className="h-72 w-auto rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          
          <Separator className="my-2" />
          {tweets.map((tweet, index) => (
            <>
              <QuestionTweet
                key={index}
                content={tweet.content}
                time={tweet.time}
              />
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
