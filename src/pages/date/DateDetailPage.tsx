import { DateDetailForm } from "@/components";
import { useParams } from "react-router-dom";

export default function DateDetailPage() {
  const { dmCd } = useParams<{ dmCd: string }>();

  return (
    <div>
      <DateDetailForm dmCd={dmCd} />
    </div>
  );
}
