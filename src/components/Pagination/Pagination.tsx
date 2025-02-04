import { PagesBox } from './PagesBox/PagesBox';
import { RecordsBox } from './RecordsBox/RecordsBox';
import { StyledPaginationBox } from './Pagination.styled.tsx';

export interface PaginationProps {
  prev: number | null;
  next: number | null;
}
export const Pagination = ({ prev, next }: PaginationProps) => {
  return (
    <StyledPaginationBox>
      <RecordsBox />
      <PagesBox prev={prev} next={next} />
    </StyledPaginationBox>
  );
};
