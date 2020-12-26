import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
      justifyContent: 'center',
    },
  })
);

enum Areas {
  Center = 'center',
  South = 'south',
  North = 'north',
}

const areaToDisplayName: { [key in Areas]: string } = {
  [Areas.Center]: 'מרכז',
  [Areas.South]: 'דרום',
  [Areas.North]: 'צפון',
};

export default function AreaFilter() {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Area</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={age}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
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
