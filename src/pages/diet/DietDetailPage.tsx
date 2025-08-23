import { DietDetailForm } from "@/components";
import { useParams } from "react-router-dom";

export default function DietDetailPage() {
  const { mmCd } = useParams<{ mmCd: string }>();

  return (
    <div>
      <DietDetailForm mmCd={mmCd} />
    </div>
  );
}
