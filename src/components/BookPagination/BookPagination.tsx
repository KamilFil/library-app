import { PagesBox } from './PagesBox/PagesBox';
import { RecordsBox } from './RecordsBox/RecordsBox';
import { StyledBookPaginationBox } from './BookPagination.styled';

export interface BookPaginationProps {
  prev: number | null;
  next: number | null;
}

export const BookPagination = ({ prev, next }: BookPaginationProps) => {
  return (
    <StyledBookPaginationBox>
      <RecordsBox />
      <PagesBox prev={prev} next={next} />
    </StyledBookPaginationBox>
  );
};
