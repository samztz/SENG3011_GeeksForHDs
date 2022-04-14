import * as d3 from "d3";
import * as topojson from "topojson-client";

const MapUSA = (education_data, county_data, props) => {
  d3.select(".map > * ").remove();
  const w = 960;
  const h = 600;
  /*const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );*/
  const svg = d3
    .select(".map")
    .append("svg")
    .attr("height", h + 150)
    .attr("width", w)
    .attr("id", "svg-map");

  let color = d3
    .scaleThreshold()
    .domain([11, 22, 33, 44, 55, 66])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

  let tooltip = d3
    .select(".map")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const assignFillColor = function() {
    let eduLevel = d3.select(this).attr("data-education");
    return color(eduLevel);
  };

  /* Creates the data and visualization for counties */
  let path = d3.geoPath();

  let counties = svg.append("g");
  counties
    .selectAll("path")
    .data(topojson.feature(county_data, county_data.objects.counties).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "county")
    .attr("data-fips", d => d.id)
    .attr(
      "data-state",
      d => education_data.filter(item => item.fips === d.id)[0].state
    )
    .attr(
      "data-education",
      d =>
        education_data.filter(item => item.fips === d.id)[0].bachelorsOrHigher
    )
    .attr(
      "data-county",
      d => education_data.filter(item => item.fips === d.id)[0].area_name
    )
    .attr("fill", assignFillColor)
    .style("stroke", "white")
    .style("stroke-width", ".25")
    .on("mouseover", function(d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip
        .html(
          "<strong>State: </strong>" +
            d3.select(this).attr("data-state") +
            "</br><strong>County: </strong>" +
            d3.select(this).attr("data-county") +
            "</br><strong>Bachelor's or Higher: </strong>" +
            d3.select(this).attr("data-education") +
            "%"
        )
        .attr("data-education", d3.select(this).attr("data-education"))
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY + 20 + "px");
    })
    .on("mouseout", function(d) {
      tooltip
        .transition()
        .duration(400)
        .style("opacity", 0);
    });

  /* Creates the visualization for state borders */
  let states = svg.append("g");
  states
    .selectAll("path")
    .data(topojson.feature(county_data, county_data.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "white")
    .style("stroke-width", "2")
    .style("fill", "none")
    .style("opacity", 0.5);

  let legendValues = [
    ["< 11%", "#f2f0f7"],
    ["11% to 22%", "#dadaeb"],
    ["22% to 33%", "#bcbddc"],
    ["33% to 44%", "#9e9ac8"],
    ["44% to 55%", "#756bb1"],
    ["> 55%", "#54278f"]
  ];

  let legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("id", "legend");

  legend
    .selectAll("rect")
    .data(legendValues)
    .enter()
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("x", 45)
    .attr("y", (d, i) => h + 100 - i * 15) 
    .attr("fill", d => d[1])
    .attr("id", "legend");

  legend
    .selectAll("text")
    .data(legendValues)
    .enter()
    .append("text")
    .attr("x", 70)
    .attr("y", (d, i) => h + 100 - i * 15)
    .attr("dy", ".7em")
    .text(d => d[0]);

};

export default MapUSA;