/**
 * Christian Kleinvehn
 */

// React
import React from 'react';

// Material-UI
import {
  FormControl, Grid, InputLabel, MenuItem, Select, withStyles, Switch, Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

// Chart.js wrapper
import { Line } from 'react-chartjs-2';

import moment from 'moment';

// Ours
import trendsFetch from './TrendsFetch.js';


const BlueSwitch = withStyles({
  switchBase: {
    color: 'rgba(52, 105, 161, .5)',
    '&$checked': {
      color: 'rgba(52, 105, 161, 1)',
    },
    '&$checked + $track': {
      backgroundColor: 'rgba(52, 105, 161, .5)',
    },
  },
  checked: {},
  track: {},
})(Switch);


export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, topN: 5, filled: false };
  }

  componentDidMount() { this.fetchData(); }

  fetchData = () => {
    trendsFetch(this.state.topN, this.state.filled)
      .then(labelsDatasets => {
        this.setState({
          data: {
            labels: labelsDatasets[0], // x-axis; e.g., Jan 2020
            datasets: labelsDatasets[1]
          }
        });
      });
  }


  handleTopNChange = (e) => {
    this.setState({ topN: e.target.value }, this.fetchData);
  }


  handleSwitchChange = (e) => {
    // console.log(e.target.checked);
    this.setState({ filled: e.target.checked }, () => {
      this.state.data.datasets.forEach(dataset => {
        console.log(dataset.fill);
        dataset.fill = this.state.filled;
        console.log(dataset.fill);
      });
      this.setState( {data: this.state.data }) ;
    });
  };


  render() {
    const options = this.state.data == null ? null : {
      title: {
        display: true,
        text: `Top ${this.state.topN} Keywords from ${moment(this.state.data.labels.slice(-1)[0], 'MMM YYYY').format('M/YY')} and their Usage Overtime`,
        fontFamily: 'Roboto, sans-serif',
        fontSize: 24
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of Occurrences',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16
          }
        }]
      }
    };

    return (
      <main style={{minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 5rem'}}>
        <div style={{textAlign: 'center'}}>
          <Typography variant="h4" style={{margin: '1rem 0 5rem 0', fontVariant: 'small-caps', textTransform: 'lowercase'}}>
            The <b><i>New York Times</i></b> informs of us of every article it has published. Here are our insights.
          </Typography>
          {
            this.state.data === null ?
              <Skeleton variant="rect" height={600} width={1200} />
              :
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', left: 0, top: '-1rem'}}>
                  <FormControl>
                    <InputLabel id="label">Keywords</InputLabel>
                    <Select
                      labelId="label"
                      value={this.state.topN}
                      onChange={this.handleTopNChange}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{position: 'absolute', right: 0}}>
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>No Fill</Grid>
                      <Grid item>
                    <BlueSwitch checked={this.state.filled} onChange={this.handleSwitchChange} />
                    </Grid>
                    <Grid item>Fill</Grid>
                    </Grid>
                  </Typography>
                </div>
              <Line height={150} data={this.state.data} options={options} />
              </div>
          }
        </div>
      </main>
    );
  }
}
