import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function QuestionTweet({
  content,
  time,
}: {
  content: string;
  time: string;
}) {
  return (
    <div className="flex">
      <h1 className="grow">{content}</h1>
      <div className="flex justify-between">
        <div>Next Appear: {time}</div>
        <FaRegEdit />
        <MdDelete />
      </div>
    </div>
  );
}
