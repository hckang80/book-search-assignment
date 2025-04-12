import ICON_BOOK from './icon_book.svg';
import { noData, noDataIcon } from './NoData.css';

export const NoData = ({ message = '검색된 결과가 없습니다.' }: { message?: string }) => {
  return (
    <div className={noData}>
      <img className={noDataIcon} src={ICON_BOOK} alt="" />
      <p className="text-secondary caption">{message}</p>
    </div>
  );
};
