/**
 * Christian Kleinvehn
 */

// React
import React from 'react';

// Material-UI
import {
  FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, withStyles, Switch, Typography, Box
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

// Chart.js wrapper
import { Line } from 'react-chartjs-2';

import moment from 'moment';

// Ours
import trendsFetch from './TrendsFetch.js';
import TopSections from './TopSections/TopSections';


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
      <main display='block'>
        <Box style={{margin: '0 0 5rem 0', textAlign: 'center', }}>
            <Typography variant="h4" style={{fontVariant: 'small-caps', textTransform: 'lowercase'}}>
              The <b><i>New York Times</i></b> informs of us of every article it has published
            </Typography>
            <Typography variant='h6'>
              Here are our insights
            </Typography>
          </Box>
        <div style={{display: 'inline', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '74rem',}}>
          {
            this.state.data === null ?
              <div id="loading-skeleton" style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center',}}>
                <LinearProgress />
                <br></br>
                <Skeleton position='relative' variant="rect" height='35rem' animation='wave' component='div'/>
              </ div>
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
              <Line data={this.state.data} options={options} />
              </div>
          }
        </div>
        <br>{/*Temporary fix*/}</br>
        <br></br>
        <br></br>
        <br></br>
        <TopSections />
      </main>
    );
  }
}
