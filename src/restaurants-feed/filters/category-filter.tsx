// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { apiInstance } from '../../shared/utils/http-client';

interface Category {
  _id: string;
  name: string;
  description: string;
}

export default function CategoryFilter({
  onCategoryChange,
  value,
}: {
  onCategoryChange: (category: string) => void;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Category[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await apiInstance.get('/categories');
      const categories = response.data;

      if (active) {
        setOptions(categories);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      style={{ width: '100%' }}
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => onCategoryChange(value ? value.name : '')}
      getOptionSelected={(option) => option.name === value}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
