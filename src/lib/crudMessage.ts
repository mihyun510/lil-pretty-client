import { CUDCommonResponse, CUDFailItem } from "@/api/interfaces/Common";

export function gfnGetCudResultMessage(
  result: CUDCommonResponse<CUDFailItem>
): string {
  if (result.failCount > 0 && result.data && result.data.length > 0) {
    return (
      `삭제 성공: ${result.successCount}건\n` +
      `삭제 실패: ${result.failCount}건\n\n` +
      result.data.map((v) => `${v.item} : ${v.reason}`).join("\n")
    );
  }

  if (result.message) {
    return result.message ?? "삭제 중 오류가 발생했습니다.";
  }

  return "작업을 완료하였습니다.";
}
