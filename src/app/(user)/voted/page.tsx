import VotedPageTemplate from "@/components/templates/VotedPageTemplate/VotedPageTemplate";
import { VotedActivityInfo } from "@/types/activity";

const dummy: VotedActivityInfo[] = [
  {
    place_id: "1",
    place_name: "place_name",
    category: "category",
    platform: "naver",
    reasons: [
      "reason1",
      "reason2",
      "reason3",
      "reason4",
      "reason5",
      "reason6",
      "reason7",
      "reason8",
      "reason9",
      "reason10",
    ],
    voted_date: "2025-07-07",
  },
  {
    place_id: "2",
    place_name: "place_name2",
    category: "category2",
    platform: "naver",
    reasons: ["reason1", "reason2"],
    voted_date: "2025-07-07",
  },
  {
    place_id: "3",
    place_name: "place_name3",
    category: "category3",
    platform: "kakao",
    reasons: ["reason1", "reason2"],
    voted_date: "2025-07-07",
  },
];
export default async function VotedPage() {
  return <VotedPageTemplate items={dummy} />;
}
