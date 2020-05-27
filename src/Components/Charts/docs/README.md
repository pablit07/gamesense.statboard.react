# GameSense Chart Components documentation
---
## *TeamCompareChart.js*
#### *Horizontal barchart that displays the Type, Location or Total scores of each player on a team.*

![image](./pics/TeamCompareChart_thumb.png)

---
#### Props / Example Usage
* svg_width (pixels)
* svg_height (pixels)
``` javascript
<TeamCompareChart svg_width={700} svg_height={400}/>
```
NOTE: You will need to use the RadioButtons Component in a ChartHeader as follows:
```javascript
    render() {
        const ChartHeader = props =>
                (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
                    {/* <h3>Team Test Scores</h3> */}
                    <PassThruContainer>
                        <LegendHoriz svg_width={490} textLabel={' '} />
                    </PassThruContainer>
                    <RadioButtons
                        handleSelect={props.handleSelect}
                        options={ [{name:'Type',value:'type'},{name:'Location',value:'location'},{name:'Total',value:'total'}] }
                        initSelectedOption={'total'} />
                </div>);

        return (<Fragment>
          <div>                
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                <LocVsTypeChart svg_height={500} svg_width={500} svg_border_opacity={0.5}/>
                <ChartHeader/>
              <TeamCompareChart svg_width={700} svg_height={400}/>
            </TeamTestsPrScoreContainer>
          </div>
        </Fragment>)   
    }
```
---

## *LocVsTypeChart.js*
#### *Scatter chart that displays ...*
![image](./pics/LocVsTypeChart_thumb.png)

Description here ...
#### Props / Example Usage
* svg_width (pixels)
* svg_height (pixels)
* svg_border_opacity (0-1)  
``` javascript
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                <LocVsTypeChart svg_height={500} svg_width={500} svg_border_opacity={0.5}/>
            </TeamTestsPrScoreContainer>    
```
---

## *BarChart.js*
#### *Bar chart that displays ...*
![image](./pics/BarChart_thumb.png)

Description here ...
#### Props / Example Usage
* svg_width (pixels)
* svg_height (pixels)
``` javascript
<TeamCompareChart svg_width={700} svg_height={400}/>
```
---

## *HorizontalQuartileChart.js*
#### *Horizontal bar that displays that displays which quartile a player's score falls within all the team member's scores *
![image](./pics/HorizontalQuartileChart_thumb.png)

Description here ...
#### Props / Example Usage
* svg_width (pixels)
* svg_height (pixels)
``` javascript
<TeamCompareChart svg_width={700} svg_height={400}/>
```
---

## *PlayerDrills.js*
#### *Vertical bar chart showing tem player names on X-axis and the number of drills they completed in a given time on the Y-axis.*
![image](./pics/PlayerDrills_thumb.png)

#### Props / Example Usage
* svg_width (pixels)
* svg_height (pixels)
``` javascript
<TeamCompareChart svg_width={700} svg_height={400}/>
```
---
- **Mark Kauffman**

