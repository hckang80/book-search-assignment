import { useRef } from 'react';

const DetailSearch = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleButtonClick = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button onClick={handleButtonClick}>상세검색</button>

      <dialog ref={dialogRef}>내용</dialog>
    </>
  );
};

export default DetailSearch;
