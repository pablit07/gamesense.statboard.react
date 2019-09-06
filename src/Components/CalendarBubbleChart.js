import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import Chart from "../Components/Chart";
import * as d3 from 'd3';

const cellWidth = 90;
const cellHeight = 90;
const gridTranslationX = 10;
const gridTranslationY = 40;

function gridCellPositions(numDays) {

    // We store the top left positions of a 7 by 5 grid. These positions will be our reference points for drawing
    // various objects such as the rectangular grids, the text indicating the date etc.
    var cellPositions = [];
    let totalDays = 0;
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 7; x++) {
            cellPositions.push([x * cellWidth, y * cellHeight]);
            totalDays++;
            if (totalDays === numDays) break;
        }
        if (totalDays === numDays) break;
    }

    return cellPositions;
}

// This is the initializing function. It adds an svg element, draws a set of rectangles to form the calendar grid,
// puts text in each cell representing the date and does the initial rendering of the pie charts.
function renderCalendarGrid({svg, startDate, numDays, calendarWidth, calendarHeight}) {

    // Add the svg element.
    svg
        .attr("class", "calendar")
        .attr("width", calendarWidth )
        .attr("height", calendarHeight)
        .append("g");

    // Cell positions are generated and stored globally because they are used by other functions as a reference to render different things.
    const cellPositions = gridCellPositions(numDays);

    // Draw rectangles at the appropriate postions, starting from the top left corner. Since we want to leave some room for the heading and buttons,
    // use the gridXTranslation and gridYTranslation variables.

    var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // This adds the day of the week headings on top of the grid

    svg.selectAll("headers")
        .data([0, 1, 2, 3, 4, 5, 6])
        .enter().append("text")
        .attr("x", function (d) { return cellPositions[d][0]; })
        .attr("y", function (d) { return cellPositions[d][1]; })
        .attr("dx", gridTranslationX + 5) // right padding
        .attr("dy", 30) // vertical alignment : middle
        .text(function (d) { return daysOfTheWeek[d] });


    let daysToShift = startDate.getDay() - 1;
    if (daysToShift === -1) {
        cellPositions.push([0,0]); // not sure why this is necessary, data() seems to start at [1]?
    } else {
        for (daysToShift; daysToShift > 0; daysToShift--) {
            cellPositions.shift();
        }
    }

    svg.selectAll("rect")
        .data(cellPositions)
        .enter()
        .append("rect")
        .attr("x", function (d) { return d[0]; })
        .attr("y", function (d) { return d[1]; })
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .style("stroke", "#555")
        .style("fill", "white")
        .attr("transform", "translate(" + gridTranslationX + "," + gridTranslationY + ")");

    // yet it works below
    cellPositions.shift();

    svg.append('g')
        .selectAll('dot')
        .data(cellPositions)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("transform", d => {
            return "translate(" +  (5 + gridTranslationX * 5) + ", " +  (5 + gridTranslationY * 1.25) + ")";
        })
        .style("fill", 'red');


    let arc = d3.symbol().type(d3.symbolCross)
        .size(function(d){ return 40; });

    svg.append('g')
        .selectAll('path')
        .data(cellPositions)
        .enter()
        .append('path')
        .attr('d',arc)
        .attr("cx", d => { return d[0]; })
        .attr("cy",d => { return d[1]; })
        .attr("transform", d => {
            return "translate(" +  (5 + d[0] + gridTranslationX * 5) + ", " +  (5 + d[1] + gridTranslationY * 1.25) + ") rotate(45)";
        })
        .style("fill", 'red');


}


class CalendarBubbleChart extends Chart {
    constructor(props) {
        super(props);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        renderCalendarGrid({svg, startDate:this.props.startDate, numDays: 15 + this.props.startDate.getDay(), calendarWidth: 400, calendarHeight: 400});
    }

    xAxisFormat(xAxis) {
        // dont draw
        return () => {};
    }

    yAxisFormat(yAxis) {
        // dont draw
        return () => {}
    }

    drawXGridlines(svg, make_x_gridlines) {
        // dont draw
    }
}

export default CalendarBubbleChart;