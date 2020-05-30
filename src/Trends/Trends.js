/**
 * Christian Kleinvehn
 */

// React
import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

// Chart.js wrapper
import { Line } from 'react-chartjs-2';

import moment from 'moment';

// Ours
import trendsFetch from './TrendsFetch.js';


export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.topN = 5;
  }

  componentDidMount() {
    trendsFetch(this.topN)
      .then(labelsDatasets => {
        this.setState({
          data: {
            labels: labelsDatasets[0], // x-axis; e.g., Jan 2020
            datasets: labelsDatasets[1]
          }
        });
      });
  }


  render() {
    const options = this.state.data == null ? null : {
      title: {
        display: true,
        text: `Top ${this.topN} Keywords from ${moment(this.state.data.labels.slice(-1)[0]).format('M/YY')} and their Usage Overtime`,
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
          <Typography variant="h4" style={{margin: '1rem 0 3rem 0', fontVariant: 'small-caps', textTransform: 'lowercase'}}>
            The <b><i>New York Times</i></b> informs of us of every article it has published. Here are our insights.
          </Typography>
          { this.state.data ? <Line height={150} data={this.state.data} options={options} />  : <Skeleton variant="rect" height={600} width={1200} /> }
        </div>
      </main>
    );
  }
}
