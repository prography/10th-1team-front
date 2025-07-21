import SavedGroupDetailTemplate from "@/components/templates/SavedGroupDetailTemplate/SavedGroupDetailTemplate";
import { getBookmarkedGroups, getBookmarkedPlaces } from "@/apis/activity";

export default async function SavedGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getBookmarkedPlaces(id);
  const groups = await getBookmarkedGroups();

  return (
    <SavedGroupDetailTemplate
      items={data?.places ?? []}
      groups={groups?.groups ?? []}
      groupId={data?.group_id ?? ""}
      groupName={data?.group_name ?? ""}
      groupIcon={data?.icon ?? ""}
      total={data?.total ?? 0}
      // onDeleteClick={() => {}}
      // onMoveClick={() => {}}
    />
  );
}
