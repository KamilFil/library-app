import { useEffect, useState } from 'react';
import { RentalWithBookEntity } from '../../../../types/rental';
import { filterByYearAndMonth } from '../../../../utils/filterByYearAndMonth';
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { StyledFormControl } from './BookInMonth.styled';

interface BookInMonthProps {
  data: RentalWithBookEntity[];
}

export const BookInMonth = ({ data }: BookInMonthProps) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [inMonthBooks, setInMonthsBook] = useState(0);

  useEffect(() => {
    const filteredData = filterByYearAndMonth(data, year, month);
    setInMonthsBook(filteredData.length);
  }, [data, year, month]);

  return (
    <>
      <StyledFormControl variant="standard">
        <InputLabel id="year-input">Year</InputLabel>
        <Select
          labelId="year-select"
          id="year-select"
          value={year}
          onChange={(e: SelectChangeEvent) => setYear(e.target.value)}
          label="Year"
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2026">2026</MenuItem>
          <MenuItem value="2027">2027</MenuItem>
          <MenuItem value="2028">2028</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl variant="standard">
        <InputLabel id="month-input">Month</InputLabel>
        <Select
          labelId="month-select"
          id="month-select"
          value={month}
          onChange={(e: SelectChangeEvent) => setMonth(e.target.value)}
          label="Month"
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          <MenuItem value="1">January</MenuItem>
          <MenuItem value="2">February</MenuItem>
          <MenuItem value="3">March</MenuItem>
          <MenuItem value="4">April</MenuItem>
          <MenuItem value="5">May</MenuItem>
          <MenuItem value="6">June</MenuItem>
          <MenuItem value="7">July</MenuItem>
          <MenuItem value="8">August</MenuItem>
          <MenuItem value="9">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </Select>
      </StyledFormControl>
      <Typography variant="h6">
        Rented books in selected year and month: <strong>{inMonthBooks}</strong>
      </Typography>
    </>
  );
};
