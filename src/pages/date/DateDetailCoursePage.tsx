import { DateDetailCourseForm } from "@/components";
import { useParams } from "react-router-dom";
export default function DateDetailCoursePage() {
  const { ddCd, dmCd } = useParams<{ ddCd: string; dmCd: string }>();
  return (
    <div>
      <DateDetailCourseForm ddCd={ddCd} dmCd={dmCd} />
    </div>
  );
}
