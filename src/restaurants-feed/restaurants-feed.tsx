import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { identity, pickBy } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FilterFields, getInitialFilters } from '../models/filters.model';
import { Restaurant } from '../models/restaurant.model';
import { useFetch } from '../shared/utils/fetch-hook';
import { apiInstance } from '../shared/utils/http-client';
import Filters from './filters/filters';
import RestaurantFeedItem from './restaurant-feed-item/restaurant-feed-item';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    feed: {
        width: '90%',
        margin: '0 auto',
    },
    filters: {
        marginTop: '2%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function RestaurantsFeed() {
    const classes = useStyles();
    const [filters, setFilters] = useState<FilterFields>(getInitialFilters());

    const fetchRestaurants = async (queryFilters: FilterFields): Promise<Restaurant[]> => {
        const response = await apiInstance.get('/restaurants/search', {
            params: pickBy(queryFilters, identity),
        });
        return response.data;
    };

    const fetchRestaurantCallback = useCallback(async () => await fetchRestaurants(filters), [
        filters,
    ]);

    const [{data, isLoading, isError}] = useFetch<Restaurant[]>({
        initialData: [],
        request: fetchRestaurantCallback,
    });

    const changeFilter = (change: Partial<FilterFields>) => setFilters({...filters, ...change});

    return (
        <div className={classes.feed}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {isError ? (
                <Alert severity="warning">
                    <AlertTitle>אזהרה</AlertTitle>
                    לא הצלחנו לטעון את רשימת המסעדות
                </Alert>
            ) : !isLoading && (
                <Grid container direction="column" spacing={2}>
                    <Grid item className={classes.filters}>
                        <Filters value={filters} changeFilter={changeFilter}/>
                    </Grid>
                    <Grid item container>
                        <FixedSizeGrid columnCount={8}
                                       columnWidth={200}
                                       height={700}
                                       rowCount={Math.floor(data.length / 8) + 1}
                                       rowHeight={400}
                                       width={1750}>
                            {renderRow}
                        </FixedSizeGrid>
                    </Grid>
                </Grid>
            )}
        </div>
    );

    function renderRow(props: GridChildComponentProps) {
        const index = props.rowIndex + props.columnIndex;
        return (data[index] ? <ListItem style={props.style} key={index}>
            <RestaurantFeedItem restaurant={data[index]} key={index}/>
        </ListItem> : <p/>)
    }
}
