import SavedGroupDetailTemplate from "@/components/templates/SavedGroupDetailTemplate/SavedGroupDetailTemplate";
import { getBookmarkedPlaces } from "@/apis/activity";

export default async function SavedGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getBookmarkedPlaces(id);

  return (
    <SavedGroupDetailTemplate
      items={data?.places ?? []}
      groupName={data?.group_name ?? ""}
      groupIcon={data?.icon ?? ""}
      total={data?.total ?? 0}
    />
  );
}
