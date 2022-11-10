var data = [
    {
      name: "Pre-K",
      values: [
        { year: 2019, enrollment: 2974161 },
        { year: 2020, enrollment: 2978219 },
        { year: 2021, enrollment: 2391872 },
        { year: 2022, enrollment: 2605928 }
      ]
    },
    {
      name: "Kindergarten",
      values: [
        { year: 2019, enrollment: 7413162 },
        { year: 2020, enrollment: 7483132 },
        { year: 2021, enrollment: 6799086 },
        { year: 2022, enrollment: 6990916 }
      ]
    },
    {
      name: "1st Grade",
      values: [
        { year: 2019, enrollment: 7340050 },
        { year: 2020, enrollment: 7344992 },
        { year: 2021, enrollment: 7093018 },
        { year: 2022, enrollment: 6803048 }
      ]
    },
    {
      name: "2nd Grade",
      values: [
        { year: 2019, enrollment: 7364688 },
        { year: 2020, enrollment: 7330760 },
        { year: 2021, enrollment: 7107334 },
        { year: 2022, enrollment: 6921378 }
      ]
    },
    {
      name: "3rd Grade",
      values: [
        { year: 2019, enrollment: 7474908 },
        { year: 2020, enrollment: 7426936 },
        { year: 2021, enrollment: 7155312 },
        { year: 2022, enrollment: 6966612 }
      ]
    },
    {
      name: "4th Grade",
      values: [
        { year: 2019, enrollment: 7614508 },
        { year: 2020, enrollment: 7466352 },
        { year: 2021, enrollment: 7266092 },
        { year: 2022, enrollment: 6987056 }
      ]
    },
    {
      name: "5th Grade",
      values: [
        { year: 2019, enrollment: 7813212 },
        { year: 2020, enrollment: 7659692 },
        { year: 2021, enrollment: 7345846 },
        { year: 2022, enrollment: 7107552 }
      ]
    },
    {
      name: "6th Grade",
      values: [
        { year: 2019, enrollment: 7846740 },
        { year: 2020, enrollment: 7850970 },
        { year: 2021, enrollment: 7550060 },
        { year: 2022, enrollment: 7186752 }
      ]
    },
    {
      name: "7th Grade",
      values: [
        { year: 2019, enrollment: 7759074 },
        { year: 2020, enrollment: 7895068 },
        { year: 2021, enrollment: 7776164 },
        { year: 2022, enrollment: 7393856 }
      ]
    },
    {
      name: "8th Grade",
      values: [
        { year: 2019, enrollment: 7639304 },
        { year: 2020, enrollment: 7788130 },
        { year: 2021, enrollment: 7835926 },
        { year: 2022, enrollment: 7596598 }
      ]
    },
    {
      name: "9th Grade",
      values: [
        { year: 2019, enrollment: 8073842 },
        { year: 2020, enrollment: 8152398 },
        { year: 2021, enrollment: 8085362 },
        { year: 2022, enrollment: 8217378 }
      ]
    },
    {
      name: "10th Grade",
      values: [
        { year: 2019, enrollment: 7759676 },
        { year: 2020, enrollment: 7795502 },
        { year: 2021, enrollment: 7848236 },
        { year: 2022, enrollment: 7626204 }
      ]
    },
    {
      name: "11th Grade",
      values: [
        { year: 2019, enrollment: 7364408 },
        { year: 2020, enrollment: 7396808 },
        { year: 2021, enrollment: 7455556 },
        { year: 2022, enrollment: 7264088 }
      ]
    },
    {
      name: "12th Grade",
      values: [
        { year: 2019, enrollment: 7354176 },
        { year: 2020, enrollment: 7295616 },
        { year: 2021, enrollment: 7378010 },
        { year: 2022, enrollment: 7203706 }
      ]
    }
  ];
  
  var width = 500;
  var height = 300;
  var margin = 80;
  var duration = 250;
  
  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";
  
  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";
  var circleRadius = 3;
  var circleRadiusHover = 6;
  
  /* Format Data */
  var parseDate = d3.timeParse("%Y");
  data.forEach(function (d) {
    d.values.forEach(function (d) {
      d.year = parseDate(d.year);
      d.enrollment = +d.enrollment;
    });
  });
  
  /* Scale */
  var xScale = d3
    .scaleTime()
    .domain(d3.extent(data[1].values, (d) => d.year))
    .range([0, width - margin]);
  
  var yScale = d3
    .scaleLinear()
    .domain([2000000, d3.max(data[10].values, (d) => d.enrollment)])
    .range([height - margin, 0]);
  
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  
  /* Add SVG */
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin + "px")
    .attr("height", height + margin + "px")
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);
  
  /* Add line into SVG */
  var line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.enrollment));
  
  let lines = svg.append("g").attr("class", "lines");
  
  lines
    .selectAll(".line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .on("mouseover", function (d, i) {
      svg
        .append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width - margin) / 2)
        .attr("y", 5);
    })
    .on("mouseout", function (d) {
      svg.select(".title-text").remove();
    })
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    .style("stroke", (d, i) => color(i))
    .style("opacity", lineOpacity)
    .on("mouseover", function (d) {
      d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function (d) {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });
  
  /* Add circles in the line */
  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data((d) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function (d) {
      d3.select(this)
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.enrollment}`)
        .attr("x", (d) => xScale(d.year) + 5)
        .attr("y", (d) => yScale(d.enrollment) - 10);
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .transition()
        .duration(duration)
        .selectAll(".text")
        .remove();
    })
    .append("circle")
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.enrollment))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity)
    .on("mouseover", function (d) {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);
    })
    .on("mouseout", function (d) {
      d3.select(this).transition().duration(duration).attr("r", circleRadius);
    });
  
  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5);
  var yAxis = d3.axisLeft(yScale).ticks(5);
  
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - margin})`)
    .call(xAxis);
  
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("y", -70)
    .attr("x", -50)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Total US Enrollment by Grade");