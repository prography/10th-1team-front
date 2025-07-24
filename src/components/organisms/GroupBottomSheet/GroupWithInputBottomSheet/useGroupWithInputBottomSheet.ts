import { useCallback, useState } from "react";

export function useGroupWithInputBottomSheet() {
  const [groupName, setGroupName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const resetGroupInput = useCallback(() => {
    setGroupName("");
    setSelectedIcon("");
  }, []);

  return {
    groupName,
    setGroupName,
    selectedIcon,
    setSelectedIcon,
    resetGroupInput,
  };
}
