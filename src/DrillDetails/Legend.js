import React, {Component} from "react";

export class Legend extends Component {

    render() {
        const colorList = {Fastball: 'red', Curveball: 'orange', Slider: 'green', Cutter: 'blue', Changeup: 'purple'};
        let boxContainer = [];

        for (let key in colorList) {
            boxContainer.push((
                <div className={"box"} style={{backgroundColor: colorList[key]}}></div>
            ));
            boxContainer.push((
                <span>{key}</span>
            ));

        }


        return (<div className={'legend'}>
            {boxContainer}
        </div>);
    }
}