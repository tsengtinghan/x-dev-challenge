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
    <div className="flex anim">
      <h1 className="grow">{content}</h1>
      <div className="flex justify-between space-x-5">
        <div>Next Appear: {time}</div>
        <FaRegEdit />
        <MdDelete />
      </div>
    </div>
  );
}
