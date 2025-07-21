import { getBookmarkedGroups } from "@/apis/activity";
import SavedPageTemplate from "@/components/templates/SavedPageTemplate/SavedPageTemplate";

export default async function SavedPage() {
  const data = await getBookmarkedGroups();
  return (
    <SavedPageTemplate total={data?.total ?? 0} groups={data?.groups ?? []} />
  );
}
