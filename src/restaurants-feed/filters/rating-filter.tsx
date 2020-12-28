import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';

const labels: { [index: string]: string } = {
  0: 'Ugly',
  1: 'Bad',
  2: 'Fine',
  3: 'Ok',
  4: 'Good',
  5: 'Super',
};

export default function RatingFilter({
  onRatingChange,
  value,
}: {
  onRatingChange: (rating: number) => void;
  value: number;
}) {
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          onRatingChange(newValue!);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}
