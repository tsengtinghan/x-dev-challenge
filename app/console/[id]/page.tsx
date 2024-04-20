import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import QuestionTweet from "@/components/ui/question-tweet";
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
export default function Console({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="flex">
        <h1 className="grow">User: {params.id}</h1>
        <div className="flex">
          <Button variant="default" size="default">
            Import
          </Button>
          <Button variant="default" size="default">
            New
          </Button>
        </div>
      </div>
      <ScrollArea className="h-72 w-auto rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <>
              <div key={tag} className="text-sm">
                {tag}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
      <QuestionTweet content = "hi" time="11hr"></QuestionTweet>
    </div>
  );
}
