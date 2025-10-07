import { DateDetailCourseForm } from "@/components";
import { useParams } from "react-router-dom";
export default function DateDetailCoursePage() {
  const { ddCd } = useParams<{ ddCd: string }>();
  return (
    <div>
      <DateDetailCourseForm ddCd={ddCd} />
    </div>
  );
}
