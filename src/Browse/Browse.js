// React
import React from 'react';

// Material UI
import { Button, TextField, Typography } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';

// Chart.js wrapper
import { Bar } from 'react-chartjs-2';

// Moment.js
import moment from 'moment';

// Ours
import browseFetch from './BrowseFetch.js';
import QueryList from './QueryList';


export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      query: '',   // not yet submitted
      queries: [], // those submitted
      beginValue: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      endValue: moment().format('YYYY-MM-DD'),
      errors: [],
      doNotDisplay: true
    };
  }


  setError = (msg) => {
    this.setState({ errors: this.state.errors.concat(msg) }, () => {
        setTimeout(() => {
          this.setState({ errors: this.state.errors.slice(1) });
        }, 7500);
    });
  }


  handleQueryChange = (query) => {
    this.setState({ query: query });
  }


  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.state.queries.length >= 10) {
        this.setError('You may only process 10 queries at once.');
        return;
      }

      this.setState({
        queries: this.state.queries.concat(this.state.query), // concat so it's a new array 
        query: ''
       });
    }
  }


  handleDelete = (i) => {
    this.setState({ queries: this.state.queries.slice(0, i).concat(this.state.queries.slice(i + 1)) }, () => {
      if (this.state.queries.length === 0) this.setState({ doNotDisplay: true });
    })
  }


  handleDeleteAll = () => {
    this.setState({ queries: [], doNotDisplay: true });
  }


  handleDateChange = (date, isStartDate) => {
    const dateVal = moment(date);
    if (!dateVal.isValid()) return;

    if (isStartDate && dateVal.isBefore(this.state.endValue))
      this.setState({ beginValue: dateVal });
    else if (!isStartDate && dateVal.isAfter(this.state.startValue))
      this.setState({ endValue: dateVal });
    else
      this.setError('The start date may not come after the end date.');
  }


  handleSubmit = () => {
    browseFetch(this.state.queries.map(query => encodeURIComponent(query)), this.state.beginValue, this.state.endValue)
      .then(hits => {
        this.setState({
          doNotDisplay: false,
          data: {
            labels: this.state.queries, // x-axis; various search queries
            datasets: [
              {
                label: `${this.state.beginValue} — ${this.state.endValue}`, // top of graph
                data: hits,
                backgroundColor: colors.map(color => `rgba(${color}, .5)`),
                borderColor: colors.map(color => `rgba(${color}, .7)`)
              }
            ]
          }
        });
      });
  }


  render() {
    // yeah... I realize all the styling is a nightmare

    const half = {
      display: 'flex',
      height: '80vh',
      width: '50%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const label = {
      display: 'block',
      margin: '2rem 0'
    };

    const labelSpan = {
      display: 'block',
      margin: '.25rem 0'
    }

    const options = this.state.data == null ? null : {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Page Hits from ${this.state.beginValue} to ${this.state.endValue}`,
        fontFamily: 'Roboto, sans-serif',
        fontSize: 20
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Hits per Query',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16
          }
        }]
      }
    };

    return (
      <main style={{position: 'relative'}}>
        <div style={Object.assign({ left: 0, flexDirection: 'column'}, half)}>
          {this.state.errors.map((error, i) => <Alert style={{marginBottom: '1rem'}} severity="error" key={i}>{error}</Alert>)}
          <div style={{marginBottom: '5rem'}}>
            <QueryList queries={this.state.queries} handleDelete={this.handleDelete} handleDeleteAll={this.handleDeleteAll} />
          </div>
          <div>
            <TextField
              label="Enter a search term"
              variant="outlined"
              value={this.state.query}
              size="small"
              onChange={event => { this.handleQueryChange(event.target.value); }}
              onKeyDown={this.handleKeyDown}
            />
            
            <label style={label}>
              <span style={labelSpan}>Start Date:</span>
              <input type="date" value={this.state.beginValue} onChange={(event) => { this.handleDateChange(event.target.value, true); }} />
            </label>

            <label style={label}>
              <span style={labelSpan}>End Date:</span>
              <input type="date" value={this.state.endValue} onChange={(event) => { this.handleDateChange(event.target.value, false); }} />
            </label>

            <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
        <div style={Object.assign({ right: 0 }, half)}>
          
            <div style={{position: 'relative', right: 125, width: '45vw'}}>
              {
                this.state.doNotDisplay ?
                  (
                    <>
                      <Skeleton variant="rect" height={400} width={800} />
                      <div style={{position: 'absolute', top: '40%', left: '21.5%'}}>
                        <Typography variant="h5" align="center">You can perform up to 10 queries at once.<br />Hit enter to lock in your choice.</Typography>
                      </div>
                    </>
                  )
                  :
                  <Bar data={this.state.data} options={options} />
              }
            </div>
          
        </div>
      </main>
    );
  }
}


const colors = ['57, 106, 177',
                '218, 124, 48',
                '62, 150, 81',
                '204, 37, 41',
                '83, 81, 84',
                '107, 76, 154',
                '146, 36, 40',
                '148, 139, 61'];
