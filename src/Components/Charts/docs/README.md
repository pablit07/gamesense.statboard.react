# gameSense Chart Components documentation
## TeamCompareChart.js

![image](./pics/TeamCompareChart_thumb.png)


Horizontal barchart that displays the Type, Location or Total scores of each player on a team.

### Props

1. svg_width (pixels)

2. svg_height (pixels)

NOTE: You will need to use the Radio Buttons Component in a ChartHeader as follows:
<code>

        (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
              <span><h3>  Player Drills Completed   </h3></span>

            <h3>Team Test Scores</h3>
            <PassThruContainer>
                <LegendHoriz svg_width={490} textLabel={' '} />
            </PassThruContainer>
            <div>
            <RadioButtons
                handleSelect={props.handleSelect}
                options={ [{name:'Week',value:'type'},{name:'Month',value:'location'},
                          {name:'Year',value:'total'}] }
                initSelectedOption={'total'} />
            </div>    
        </div>)

![image](./pics/LocVsTypeChart_thumb.png)

Description here ...

![image](./pics/BarChart_thumb.png)

Description here ...

![image](./pics/HorizontalQuartileChart_thumb.png)

Description here ...

![image](./pics/PlayerDrills_thumb.png)

Description here ...

- **Mark Kauffman**

