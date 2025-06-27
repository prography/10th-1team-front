import React from 'react';

interface ReviewCardProps {
  author: string;
  registered_at: string;
  contents: string;
}


export default function ReviewCard({
  author,
  registered_at,
  contents,
}: ReviewCardProps) {
  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 이름 마스킹 처리 (앞글자 한 글자 제외하고 별표로) 
  const maskAuthorName = (name: string) => {
    if (name.length <= 1) return name;
    return name.charAt(0) + '*'.repeat(name.length - 1);
  };

  return (
    <div className="p-[16px] w-[280px] h-[148px] bg-surface-normal-bg10 rounded-lg flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[8px]">
        <span className="body-s-semibold">{maskAuthorName(author)}</span>
        <div className="flex">
          <div className="flex items-end">
            <span className="caption-s-regular text-texticon-onnormal-midemp">{formatDate(registered_at)}</span>
          </div>
        </div>
      </div>
      <p className="body-s-regular text-texticon-onnormal-highemp line-clamp-3">
        {contents}
      </p>
    </div>
  );
} 