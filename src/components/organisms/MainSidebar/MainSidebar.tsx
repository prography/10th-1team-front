import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import Footer from "@/components/molecules/Footer/Footer";
import Divider from "@/components/atoms/Divider/Divider";
import Button from "@/components/atoms/Button/Button";
import LevelCard from "@/components/molecules/LevelCard";
import { useEffect } from "react";
import { allowScroll, preventScroll } from "@/utils/modal";
import type { UserInfo } from "@/types/user";
import Link from "next/link";
import { useVoteCountQuery } from "@/hooks/queries";
import { usePortal, useSheetState } from "@/hooks";
import { AlertModal } from "@/components/molecules/Modal";

interface MainSidebarProps {
  onClose: () => void;
  onStart: () => void;
  onLogout: () => void;
  user: UserInfo | null;
}

export default function MainSidebar({
  onClose,
  onStart,
  onLogout,
  user,
}: MainSidebarProps) {
  const createPortal = usePortal();
  const { sheet, open, close } = useSheetState<"logout">();

  const { data: voteCount = 0, isLoading: isVoteCountLoading } =
    useVoteCountQuery(!!user);

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-start">
      <div className="w-full max-w-[600px] h-full overflow-y-auto flex flex-col bg-surface-normal-bg01">
        <div className="flex justify-end border-b border-border-normal-lowemp pt-[24px] pb-[16px] px-[16px]">
          <IconButton
            startIcon={<Icon icon="Exit" size={24} />}
            onClick={onClose}
          />
        </div>
        {/* 사이드바 내부 콘텐츠들 */}
        <div className="flex flex-col flex-1 border-b border-border-normal-lowemp">
          {user ? (
            <div className="flex flex-col gap-[12px] px-[16px] py-[20px]">
              <p className="body-l-semibold text-texticon-onnormal-highestemp">
                <span className="text-texticon-onnormal-main-500">
                  {user.nickname}
                </span>
                님,
                <br />
                다음 레벨 달성까지 얼마 안남았어요!
              </p>
              <LevelCard voteCount={voteCount} isLoading={isVoteCountLoading} />
            </div>
          ) : (
            <>
              <p className="body-l-semibold text-texticon-onnormal-highestemp px-[16px] py-[20px]">
                리뷰:매치에서
                <br />더 다양한 가게의 리뷰를 매치해보세요
              </p>
              <div className="px-[16px] py-[14px]">
                <Button
                  variant="primary"
                  fullWidth
                  className="py-[16px]"
                  onClick={onStart}
                >
                  시작하기
                </Button>
              </div>
            </>
          )}

          {user && (
            <>
              <Divider />
              <section className="flex flex-col justify-between px-[16px] py-[24px] gap-[120px]">
                <div className="flex flex-col gap-[48px]">
                  <div className="flex flex-col gap-[16px]">
                    <h6 className="body-l-semibold text-texticon-onnormal-highestemp">
                      활동 데이터
                    </h6>
                    <div className="flex flex-col items-start gap-[12px] text-texticon-onnormal-lowemp body-s-semibold">
                      <Link href="/saved">저장한 가게</Link>
                      <Link href="/voted">투표한 가게</Link>
                    </div>
                  </div>
                  {/* <div className="flex flex-col gap-[16px]">
                    <h6 className="body-l-semibold text-texticon-onnormal-highestemp">
                      알림
                    </h6>
                    <div className="flex flex-col items-start gap-[12px] text-texticon-onnormal-lowemp body-s-semibold">
                      <Link href="/alerts">알림 내역</Link>
                      <Link href="/alerts/settings">알림 설정</Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <h6 className="body-l-semibold text-texticon-onnormal-highestemp">
                      문의
                    </h6>
                    <div className="flex flex-col items-start gap-[12px] text-texticon-onnormal-lowemp body-s-semibold">
                      <Link href="/faqs">자주 묻는 질문</Link>
                      <Link href="/inquiries">1:1 문의하기</Link>
                    </div>
                  </div> */}
                  <div className="flex flex-col gap-[16px]">
                    <h6 className="body-l-semibold text-texticon-onnormal-highestemp">
                      약관 및 정책
                    </h6>
                    <div className="flex flex-col items-start gap-[12px] text-texticon-onnormal-lowemp body-s-semibold">
                      <Link href="/privacy">개인정보 처리 방침</Link>
                      <Link href="/terms">이용약관</Link>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center gap-[28px]">
                  <Button
                    variant="text"
                    className="text-texticon-onnormal-lowemp caption-m-regular"
                    onClick={() => open("logout")}
                  >
                    로그아웃
                  </Button>
                  <Button
                    variant="text"
                    className="text-texticon-onnormal-lowemp caption-m-regular"
                  >
                    회원탈퇴
                  </Button>
                </div>
              </section>
            </>
          )}
        </div>

        <Footer />

        {sheet === "logout" &&
          createPortal(
            <AlertModal
              isOpen={sheet === "logout"}
              onClose={close}
              title="로그아웃"
              description={`정말로 로그아웃 하시겠어요?`}
              leftButtonText="취소"
              rightButtonText="로그아웃"
              onLeftButtonClick={close}
              onRightButtonClick={async () => {
                onLogout();
                close();
              }}
            />
          )}
      </div>
    </div>
  );
}
