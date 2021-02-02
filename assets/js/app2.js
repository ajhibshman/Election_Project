//get data csv file

d3.csv("assets/js/data2.csv").then(function(chartData) {
    var data = chartData;
    console.log(data);

    
    var rep_percent_2020 = []
    data.forEach((item) => {
        rep_percent_2020.push(item.rep_percent_2020)
    });  
    console.log(rep_percent_2020)
    var rep_percent_2016 = []
    data.forEach((item) => {
        rep_percent_2016.push(item.rep_percent_2016)
    });
    var turnout_2020 = []
    data.forEach((item) => {
        turnout_2020.push(item.turnout_2020)
    });
    var turnout_2016 = []
    data.forEach((item) => {
        turnout_2016.push(item.turnout_2016)
    });
    var turnout_delta = []
    data.forEach((item) => {
        turnout_delta.push(item.turnout_delta)
    });
    var vep_2020 = []
    data.forEach((item) => {
        vep_2020.push(item.vep_2020)
    });
    var vep_2016 = []
    data.forEach((item) => {
        vep_2016.push(item.vep_2016)
    });
    var vep_delta = []
    data.forEach((item) => {
        vep_delta.push(item.vep_delta)
    });



    //set initial map based on 2020 election results
    function init() {
        var displaydata;
        var inputElement = d3.select("#selDataset");
        var inputValue = inputElement.property("value");
        console.log(inputValue);
        if (inputValue == 'rep_percent_2020'){
          displaydata = rep_percent_2020  ;
        }


        var data = [{
            type: "choroplethmapbox", name: "US states", geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", locations: [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ],
           z: displaydata, colorscale:'RdBu',
            colorbar: {y: 0, yanchor: "bottom", title: {text: inputValue, side: "right"}}}
            ];
           
           var layout = {mapbox: {style: "dark", center: {lon: -97, lat: 40}, zoom: 3.2}, width: 1000, height: 600, margin: {t: 0, b: 0}};
           //api key
           var config = {mapboxAccessToken: "pk.eyJ1IjoiYWpoaWJzaG1hbiIsImEiOiJja2p3YWo5ZTkweXYzMnFwM3pza3ZzZm5hIn0.jMyAmZiuqpjDIlwKACJF2g"};
           
           Plotly.newPlot('plotlymap', data, layout, config);
    };


    d3.selectAll("#selDataset").on("change", updatePlotly);

    function updatePlotly(){
        var displaydata;
        var inputElement = d3.select("#selDataset");
        var inputValue = inputElement.property("value");
        console.log(inputValue);
        if (inputValue == 'rep_percent_2020'){
          displaydata = rep_percent_2020}
            else if (inputValue == 'rep_percent_2016'){
                displaydata = rep_percent_2016}
            else if (inputValue == 'turnout_2020'){
                displaydata = turnout_2020}
            else if (inputValue == 'turnout_2016'){
                    displaydata = turnout_2016}
            else if (inputValue == 'turnout_delta'){
                    displaydata = turnout_delta}
            else if (inputValue == 'vep_2020'){
                    displaydata = vep_2020}
            else if (inputValue == 'vep_2016'){
                    displaydata = vep_2016}
            else  {
                    displaydata = vep_delta};
          
        


        var data = [{
            type: "choroplethmapbox", name: "US states", geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", locations: [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ],
           z: displaydata, colorscale:'RdBu',
            colorbar: {y: 0, yanchor: "bottom", title: {text: inputValue, side: "right"}}}
            ];
           
           var layout = {mapbox: {style: "dark", center: {lon: -97, lat: 40}, zoom: 3.2}, width: 1000, height: 600, margin: {t: 0, b: 0}};
           
           var config = {mapboxAccessToken: "pk.eyJ1IjoiYWpoaWJzaG1hbiIsImEiOiJja2p3YWo5ZTkweXYzMnFwM3pza3ZzZm5hIn0.jMyAmZiuqpjDIlwKACJF2g"};
           
           Plotly.newPlot('plotlymap', data, layout, config);

    };


    init();
    






















});

