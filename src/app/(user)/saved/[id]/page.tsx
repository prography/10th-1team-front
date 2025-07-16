import SavedGroupDetailTemplate from "@/components/templates/SavedGroupDetailTemplate/SavedGroupDetailTemplate";
import { SavedPlacesInfo } from "@/types/activity";

const dummy: SavedPlacesInfo[] = [
  {
    group_id: "1",
    place_id: "1",
    place_name: "place1",
    road_address: "address1",
    category: "category1",
    legal: 1,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "2",
    place_name: "place2",
    road_address: "address2",
    category: "category2",
    legal: 2,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "3",
    place_name: "place3",
    road_address: "address3",
    category: "category3",
    legal: 3,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "4",
    place_name: "place4",
    road_address: "address4",
    category: "category4",
    legal: 4,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "5",
    place_name: "place5",
    road_address: "address5",
    category: "category5",
    legal: 5,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "6",
    place_name: "place6",
    road_address: "address6",
    category: "category6",
    legal: 6,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "7",
    place_name: "place7",
    road_address: "address7",
    category: "category7",
    legal: 7,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "8",
    place_name: "place8",
    road_address: "address8",
    category: "category8",
    legal: 8,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
  {
    group_id: "1",
    place_id: "9",
    place_name: "place9",
    road_address: "address9",
    category: "category9",
    legal: 9,
    saved_at: "2025-07-15T07:36:21.696Z",
  },
];

export default function SavedGroupDetailPage() {
  return (
    <SavedGroupDetailTemplate
      items={dummy}
      groupName="점심 메뉴"
      numberOfBookmark={999}
    />
  );
}
