import React, {Component} from "react";

export class PitchTypeSoftballLegend extends Component {

    render() {
        const colorList = {Fastball: 'red', Curveball: 'orange', Rise: 'green', Drop: 'blue', Knuckle: 'purple', Screw: 'black'};
        let boxContainer = [];

        for (let key in colorList) {
            boxContainer.push((
                <div key={key} className={"box"} style={{backgroundColor: colorList[key]}}></div>
            ));
            boxContainer.push((
                <span key={(key)+"-span"}>{key}</span>
            ));

        }


        return (<div className={'legend'}>
            {boxContainer}
        </div>);
    }
}