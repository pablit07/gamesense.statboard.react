import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";
import ResizeObserver from "resize-observer-polyfill";
import "./barChart2.css";

// A custom React Hook for ResizeObserver here ...
// https://codepen.io/dgca/pen/WoJoNB
const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  // need use an useEffect hook again here to access the DOM element inside the reference ... 
  useEffect(() => {
    const observeTarget = ref.current; // define what to observe
    const resizeObserver = new ResizeObserver(entries => {
        console.log(entries);  // ResizeObserverEntry Objects get spit out as you resize window !
      entries.forEach(entry => {
        setDimensions(entry.contentRect);  //set the dimensions to the current 'contentRect' property 
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget); // clean up function for this useEffect()
    };                                // called when comonent using this is removed or unmounted.
  }, [ref]); // [ref]  is the dependency array 
  console.log('----------------- dimensions --');
  console.log(dimensions);
  return dimensions;
};

function BarChart({ data }) {
  const svgRef = useRef(); // this reference gets updated and completes the SVG DOM element
                           // when all the DOM elements have been rendered inside the browser.
  const wrapperRef = useRef();  // wrap the svg in a div (below in 'return()'), because useResizeObserver() doe not work with <svg> for unknown reason - needs a <div>
  const dimensions = useResizeObserver(wrapperRef);  // use the useResizeObserver() hook for dimensions.

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    console.log("----------- dimensions -----------")
    console.log(dimensions);

    if (!dimensions) return;

    // scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width]) // set by useResizeObserver()
      .padding(0.08);

    const yScale = scaleLinear()
      .domain([0, 150]) // todo - this will need to be max(data)
      .range([dimensions.height, 0]); // set by useResizeObserver()

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // create y-axis
    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
        .attr("fill", colorScale)
        .attr("height", value => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default BarChart;
