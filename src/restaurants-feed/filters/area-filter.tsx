import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import { Areas, areaToDisplayName } from '../../models/area.model';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
      justifyContent: 'center',
    },
  })
);

export default function AreaFilter({
  onAreaChange,
  value,
}: {
  onAreaChange: (area: Areas) => void;
  value: Areas;
}) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onAreaChange(event.target.value as Areas);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Area</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label="Age"
      >
        {Object.keys(Areas).map((area, index) => (
          // @ts-ignore
          <MenuItem key={index} value={Areas[area]}>
            {
              // @ts-ignore
              areaToDisplayName[Areas[area]]
            }
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
