// d3 chart
// create SVG element and group
var svgWidth = 960;
var svgHeight = 800;

var margin = {
  top: 50,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg1 = d3.select("#scatter2")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg1.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial axis:
var year = '2020'
var yvar = 'turnout'
var chosenXAxis = "dem_percent_2020";
var chosenYAxis = `${yvar}_${year}`;


function xScale(chartData,chosenXaxis){
    var xLinearScale = d3.scaleLinear()
      //.domain([d3.min(chartData, d => d[chosenXaxis])*.9,d3.max(chartData, d => d[chosenXaxis])*1.1])
      //.range([0, width]);
      .domain([0,100])
      .range([0, width]);
    return xLinearScale;
}

function yScale(chartData,chosenYaxis){
    var yLinearScale = d3.scaleLinear()
          .domain([d3.min(chartData, d => d[chosenYaxis])*.7,d3.max(chartData, d => d[chosenYaxis])*1.0])
          
          .range([height, 0]);
        return yLinearScale;

}

function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}

function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXAxis,newYScale,chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]))
      
      
  
    return circlesGroup;
}

function renderCirclesy(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]))
      
  
    return circlesGroup;
}

function renderLables(label, xLinearScale, chosenXAxis,yLinearScale, chosenYAxis) {

     label.transition()
         .duration(1000)
         .attr("x", d => xLinearScale(d[chosenXAxis]))
         .attr("y", d => yLinearScale(d[chosenYAxis]))
         
     return label;
}
function renderLablesy(label, yLinearScale, chosenYAxis) {

    label.transition()
        .duration(1000)
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        
    return label;
}

//d3.csv("assets/data/data.csv").then(function(chartData1) {
// Import Data
d3.csv("assets/js/data.csv").then(function(chartData) {
    console.log(chartData);
    //cast data 
    chartData.forEach(function(data) {
        data.vep_2016 = +data.vep_2016;
        data.vep_2020 = +data.vep_2020;
        data.turnout_2016 =+data.turnout_2016;
        data.turnout_2020=+data.turnout_2020;
        data.dem_percent_2016=+data.dem_percent_2016;
        data.dem_percent_2020=+data.dem_percent_2020;
        
    });
    console.log(chartData.vep_2016);
    var xLinearScale=xScale(chartData, chosenXAxis);
    var yLinearScale=yScale(chartData, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .classed("stateCircle",true)
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "15")
       
    // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var label_2020 = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "2020") // value to grab for event listener
        .classed("active", true)
        .text("2020 Results (%voting democrat)");

    var label_2016 = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "2016") // value to grab for event listener
        .classed("inactive", true)
        .text("2016 Results (%voting democrat)");

    // Create group for two Y-axis labels
    var labelsGroup2 = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var label_turnout = labelsGroup2.append("text")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("value", "turnout") // value to grab for event listener
        .classed("active", true)
        .text("Turnout");

    var label_vep = labelsGroup2.append("text")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("value", "vep") // value to grab for event listener
        .classed("inactive", true)
        .text("Voting Eligible Population");

    // updateToolTip function above csv import
    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

     
    var label = chartGroup.append("g")      
      .selectAll("text")
      .data(chartData)
      .join("text")
      .classed("stateText",true)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]))      
      .text(d => d.state_id);

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${0-30})`)
      .attr("class", "aText")
      .text("Bonus Chart");

    
    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (`dem_percent_${value}` !== chosenXAxis) {

            // replaces chosenXAxis with value
            chosenXAxis = `dem_percent_${value}`;
            year = value
            console.log(chosenXAxis)
            chosenYAxis = `${yvar}_${year}`;
            console.log(chosenYAxis)


            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(chartData, chosenXAxis);
            

            // updates x axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);
            

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis,yLinearScale, chosenYAxis);
            

            // updates tooltips with new info
            // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
            label = renderLables(label, xLinearScale, chosenXAxis,yLinearScale, chosenYAxis);
            
            
            
        // changes classes to change bold text
            if (chosenXAxis === "dem_percent_2020") {
                label_2020
                .classed("active", true)
                .classed("inactive", false);
                label_2016
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
                label_2020
                .classed("active", false)
                .classed("inactive", true);
                label_2016
                .classed("active", true)
                .classed("inactive", false);
            }
        }
    });

    // y axis labels event listener
    labelsGroup2.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value1 = d3.select(this).attr("value");
        if (`${value1}_${year}`!== chosenYAxis) {
            yvar=value1
            // replaces chosenXAxis with value
            chosenYAxis = `${yvar}_${year}`;

            console.log(chosenYAxis)

            // functions here found above csv import
            // updates x scale for new data
            yLinearScale = yScale(chartData, chosenYAxis);
            

            // updates x axis with transition
            yAxis = renderYAxes(yLinearScale, yAxis);
            

            // updates circles with new x values
            circlesGroup = renderCirclesy(circlesGroup, yLinearScale, chosenYAxis);
            
            // updates tooltips with new info
            // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
            // label = renderLables(label, ylinearScale, chosenYAxis)
            label = renderLablesy(label, yLinearScale, chosenYAxis);
            
            // changes classes to change bold text
            if (chosenYAxis === `turnout_${year}`) {
                label_turnout
                .classed("active", true)
                .classed("inactive", false);
                label_vep
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
                label_turnout
                .classed("active", false)
                .classed("inactive", true);
                label_vep
                .classed("active", true)
                .classed("inactive", false);
            }
        }
    });

});