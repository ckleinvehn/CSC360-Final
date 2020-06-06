//** Frank Lenoci */

import React from "react";
import { Pie } from "react-chartjs-2";
import "./TopSections.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import sectionFetch from "./TopSectionsFetch";

var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

class Static extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: null,
      data: {},
    };
    this.chartReference = React.createRef();
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    sectionFetch().then((data) => {
      this.setState({ sections: data });

      this.sectionCount();
    });
  };

  sectionCount() {
    var occurences = {};

    for (var i = 0; i < this.state.sections.length; i++) {
      if (this.state.sections[i].section in occurences) {
        occurences[this.state.sections[i].section] += 1;
      } else {
        occurences[this.state.sections[i].section] = 1;
      }
    }
    //add aria-labels to the child canvas DOM component
    this.chartReference.current.chartInstance.canvas.ariaLabel =
      "Top Trending New York Times Sections Pie Chart, Measured in Number of Articles. ";
    for (var section in occurences) {
      this.chartReference.current.chartInstance.canvas.ariaLabel +=
        section + ": " + occurences[section] + ", ";
    }
    console.log(this.chartReference.current.chartInstance.canvas.ariaLabel);

    this.setState({ data: occurences });
  }
  render() {
    var coloR = [];
    Object.keys(this.state.data).forEach((element) => {
      coloR.push(dynamicColors());
    });
    const data = {
      labels: Object.keys(this.state.data),
      datasets: [
        {
          data: Object.values(this.state.data),
          backgroundColor: coloR,
        },
      ],
    };
    const options = {
      title: {
        display: true,
        text: "Top Trending News Sections in the World",
        fontFamily: "Roboto, sans-serif",
        fontSize: 24,
      },
    };
    return (
      <div id="top-sections">
        {this.state.sections === null ? (
          <div id="piechart">
            <div id="progress">
              <CircularProgress size={400} />
            </div>
          </div>
        ) : (
          <div id="piechart">
            <Pie ref={this.chartReference} data={data} options={options} />
          </div>
        )}
      </div>
    );
  }
}

export default Static;
