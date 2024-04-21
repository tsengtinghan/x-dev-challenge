'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import QuestionTweet from "@/components/ui/question-tweet";
import { PopoverDemo } from '@/components/ui/popup-create';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const tweets = [
  { content: "hi", time: "11hr" },
  { content: "hello", time: "12hr" },
  { content: "hey", time: "13hr" },
  { content: "hey hey", time: "13hr" },
  { content: "hellooo", time: "13hr" },
  { content: "hi", time: "13hr" },
  { content: "hey", time: "13hr" },
  { content: "hey", time: "13hr" },
];
export default function Console() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  if (!id) return <div>Invalid user id</div> 
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='max-w-screen-xl w-full mx-auto'>
        <div className='grid gap-6 m-8 justify-self-center'>
          <div className="flex justify-center">
            <Command className='mr-4'>
              <CommandInput placeholder="Type a command or search..." />
            </Command>
            <PopoverDemo></PopoverDemo>
          </div>
          <ScrollArea className="h-72 w-auto rounded-md border">
            <div className="p-4">
              <h1 className="mb-4 text-sm font-medium leading-none">Tags</h1>
              {/* {tags.map((tag) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </>
              ))} */}
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
      </div>
    </div>
  );  
}
