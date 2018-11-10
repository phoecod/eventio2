import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20
  },
  spacing: {
    unit: 20
  },
  textField: {
    width: 350
  },
});

const DatePickers = class DatePickers extends PureComponent {
  
  render () {
    
    const selectedDate = this.props.eventDate !== undefined ? this.props.eventDate : moment("YYYY-DD-MM");
    const { classes } = this.props;
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          name="date"
          defaultValue={selectedDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    )
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
