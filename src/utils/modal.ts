/**
 * 스크롤을 방지하고 현재 위치를 반환한다.
 * @returns {number} 현재 스크롤 위치
 */
export const preventScroll = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost" &&
    window.parent !== window
  ) {
    return 0;
  }
  const currentScrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
  document.body.style.overflowY = "scroll";
  return currentScrollY;
};

/**
 * 스크롤을 허용하고, 스크롤 방지 함수에서 반환된 위치로 이동한다.
 * @param prevScrollY 스크롤 방지 함수에서 반환된 스크롤 위치
 */
export const allowScroll = (prevScrollY: number) => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost" &&
    window.parent !== window
  ) {
    return;
  }
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  document.body.style.overflowY = "";
  window.scrollTo(0, prevScrollY);
};
