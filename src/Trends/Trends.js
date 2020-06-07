/**
 * Christian Kleinvehn
 * Rickey Serna
 */

// React
import React from "react";

// Material-UI
import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  withStyles,
  Switch,
  Typography,
  Box,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

// Chart.js wrapper
import { Line } from "react-chartjs-2";

import moment from "moment";

// Ours
import TopKeywords from "./TopKeywords/TopKeywords";
import TopSections from "./TopSections/TopSections";

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SectionsShowing: false, graphShown: <TopKeywords /> };
  }

  switchGraphs = (e) => {
    this.setState({ SectionsShowing: !this.state.SectionsShowing });
    if (this.state.SectionsShowing === true) {
      this.setState({ graphShown: <TopKeywords /> });
    } else {
      this.setState({ graphShown: <TopSections /> });
    }
  };

  render() {
    return (
      <main display="block">
        <Box style={{ margin: "0 0 5rem 0", textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ fontVariant: "small-caps", textTransform: "lowercase" }}
          >
            The{" "}
            <b>
              <i>New York Times</i>
            </b>{" "}
            informs of us of every article it has published
          </Typography>
          <Typography variant="h5">Here are our insights</Typography>
          <div>
            Top Keywords
            <Switch
              color="default"
              inputProps={{ "aria-label": "trends graph toggler" }}
              onChange={this.switchGraphs}
            />
            Top Sections
          </div>
        </Box>
        {this.state.graphShown}
      </main>
    );
  }
}
