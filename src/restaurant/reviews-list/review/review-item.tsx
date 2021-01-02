import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { Review } from '../../../models/review.model';
import { UserContext } from '../../../providers/user-provider';
import { longDateFormat } from '../../../shared/utils/date-formats';
import { apiInstance } from '../../../shared/utils/http-client';

export default function ReviewItem({
  review,
  onEditSuccess,
}: {
  review: Review;
  onEditSuccess: (edit: Review) => void;
}) {
  const authContext = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(review.content);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    apiInstance
      .put(
        `/reviews/${review._id}`,
        { content: edit },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        onEditSuccess(response.data);
        setError(false);
        handleClose();
      })
      .catch((err) => {
        setError(true);
      });
  };

  const useStyles = makeStyles(() => ({
    inline: {
      display: 'inline',
      width: '100%',
    },
    modalGrid: {
      backgroundColor: '#FFFF',
      width: 'fit-content',
    },
    paper: {
      padding: '6%',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButton: {
      marginTop: '5%',
    },
  }));

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{review.user.slice(0, 1)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography component="span" color="textPrimary">
                {`${review.user} - `}
              </Typography>
              <Typography component="span" color="textSecondary">
                {moment(review.updatedAt).format(longDateFormat)}
              </Typography>
            </Grid>
            <Grid item>
              {authContext.user && authContext.user._id === review.user && (
                <Tooltip title="Edit your comment!">
                  <EditOutlinedIcon onClick={handleOpen} />
                </Tooltip>
              )}
            </Grid>
          </Grid>
        }
        secondary={review.content}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Grid
            container
            className={classes.modalGrid}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Edit your comment here!
              </Typography>
              <form noValidate autoComplete="off">
                <TextareaAutosize
                  id="standard-basic"
                  placeholder="Edit the comment!"
                  value={edit}
                  onChange={(event) => setEdit(event.currentTarget.value)}
                />
              </form>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                onClick={handleSubmit}
              >
                Submit your edit
              </Button>
              {error && (
                <Alert severity="warning">
                  <AlertTitle>שגיאה</AlertTitle>
                  לצערנו, קרתה שגיאה בעריכת התגובה
                </Alert>
              )}
            </Paper>
          </Grid>
        </Fade>
      </Modal>
    </ListItem>
  );
}
