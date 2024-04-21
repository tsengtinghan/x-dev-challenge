'use client'
import { useSearchParams } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import QuestionTweet from "@/components/ui/question-tweet";
import { PopoverDemo } from '@/components/ui/popup-create';
import React, { useState, useEffect } from "react";

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



export default function Console() {
  const [materials, setMaterials] = useState<Array<QuestionMaterial | QuoteMaterial>>([]);
  const searchParams = useSearchParams()
  const user_id = searchParams.get('user_id')
  useEffect(() => {
    fetchMaterials();
  }, []);
  if (!user_id) return <div>Invalid user id</div> 
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

  return (
    <div>
      <div className="flex items-center justify-center">
        <PopoverDemo onAddMaterial={fetchMaterials} user_id={user_id}></PopoverDemo>
      </div>
      <ScrollArea className="h-72 w-auto rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          
          <Separator className="my-2" />
          {materials.map((tweet, index) => (
            <>
              <QuestionTweet
                key={index}
                content={tweet.type === 'quote' ? tweet.content : tweet.question}
                time={tweet.nextReviewTime}
              />
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
