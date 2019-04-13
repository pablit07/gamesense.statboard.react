import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class LinkButton extends Component {

    navigate() {
        this.props.history.push(this.props.href);
    }

    render() {
        return (<button key={'Link Button'} onClick={this.navigate.bind(this)}
                        className="btn flat-button">
                {this.props.inner}<i className="fa fa-arrow-right" aria-hidden="true"/>
        </button>);
    }

}
LinkButton = withRouter(LinkButton);


class LogSelectionButton extends Component {
    render() {
        return (<button key={'Log Selection Button'} onClick={this.props.logSelection} className="btn flat-button btn-blue">Log
            Selection</button>);
    }
}


class ExportToXlsButton extends Component {
    render() {
        return (<button onClick={this.props.exportSource} className="btn flat-button"><i className="fa fa-table" aria-hidden="true"/>Export to XLS</button>);
    }
}


export {LinkButton, LogSelectionButton, ExportToXlsButton};