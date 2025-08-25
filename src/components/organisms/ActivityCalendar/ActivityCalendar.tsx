import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";
import type { VotedActivityInfo } from "@/types/activity";
import { cn } from "@/utils/cn";
import { parseKoreanDateInfo } from "@/utils/date";

interface ActivityCalendarProps {
  year: number;
  month: number;
  votes: VotedActivityInfo[];
  selectedDate: string | null;
  onChangeMonth: (year: number, month: number) => void;
  onDateClick: (date: string) => void;
}

export default function ActivityCalendar({
  year,
  month,
  votes,
  selectedDate,
  onChangeMonth,
  onDateClick,
}: ActivityCalendarProps) {
  const monthForDate = month - 1;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const isPrevDisabled = year === 2025 && month === 7;
  const isNextDisabled = year === currentYear && month >= currentMonth;

  const firstDayOfMonth = new Date(year, monthForDate, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  const lastDayOfMonth = new Date(year, monthForDate + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const groupDatesByWeek = (startDay: Date, endDay: Date) => {
    const weeks = [];
    let currentWeek = [];
    const currentDate = new Date(startDay);

    while (currentDate <= endDay) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7 || currentDate.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;

    if (month === 1) {
      onChangeMonth(year - 1, 12);
    } else {
      onChangeMonth(year, month - 1);
    }
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;

    if (month === 12) {
      onChangeMonth(year + 1, 1);
    } else {
      onChangeMonth(year, month + 1);
    }
  };

  const weeks = groupDatesByWeek(startDay, endDay);

  return (
    <div className="flex flex-col gap-4 mt-[32px] mb-[24px] px-[16px]">
      {/* 월 변경 헤더 */}
      <div className="flex items-center justify-center gap-2 mb-[24px]">
        <IconButton
          startIcon={<Icon icon="ChevronRight" size={20} />}
          onClick={handlePrevMonth}
          disabled={isPrevDisabled}
          className={cn("rotate-180", isPrevDisabled && "disabled:opacity-50")}
        />

        <h2 className="w-[90px] text-center body-m-regular text-texticon-onnormal-highestemp">
          {year}년 {String(month).padStart(2)}월
        </h2>
        <IconButton
          endIcon={<Icon icon="ChevronRight" size={20} />}
          onClick={handleNextMonth}
          disabled={isNextDisabled}
          className={cn(isNextDisabled && "disabled:opacity-50")}
        />
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 text-center caption-m-semibold text-texticon-onnormal-lowemp mb-[8px]">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-0 rounded-lg overflow-hidden">
        {weeks.flat().map((date, index) => {
          const isCurrentMonth = date.getMonth() === monthForDate;

          const isToday =
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth - 1 &&
            date.getDate() === currentDate.getDate();

          const hasActivity = votes.filter((vote) => {
            const voteDateInfo = parseKoreanDateInfo(vote.voted_date);

            return (
              voteDateInfo.year === date.getFullYear() &&
              voteDateInfo.month === date.getMonth() + 1 &&
              voteDateInfo.date === date.getDate()
            );
          });

          return (
            <div
              key={date.toISOString()}
              className={cn(
                "aspect-square flex flex-col items-center justify-start body-s-semibold relative px-[4px] pt-[12px] pb-[8px]",
                index >= 7 && "border-t-[0.5px] border-border-normal-lowestemp",
                isCurrentMonth
                  ? "text-texticon-onnormal-highestemp"
                  : "text-texticon-onnormal-lowestemp",
                isToday && "text-texticon-onnormal-main-500"
              )}
              onClick={
                hasActivity.length > 0
                  ? () => onDateClick(date.toISOString())
                  : undefined
              }
            >
              <span
                className={cn(
                  "w-[22px] h-[22px] flex items-center justify-center",
                  selectedDate === date.toISOString() &&
                    "text-texticon-onnormal-white bg-texticon-onnormal-highestemp rounded-[4px]"
                )}
              >
                {date.getDate()}
              </span>

              <div className="grid grid-cols-3 gap-[4px] py-[4px] justify-items-center min-h-[26px]">
                {Array.from({ length: Math.min(hasActivity.length, 9) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-[6px] h-[6px] rounded-full",
                        isToday
                          ? "bg-brand-primary-main"
                          : selectedDate === date.toISOString()
                            ? "bg-texticon-onnormal-highestemp"
                            : "bg-texticon-onnormal-lowestemp"
                      )}
                    />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
