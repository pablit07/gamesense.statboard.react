import Container from "../Container";

export default class PassThruContainer extends Container {

    getRoutingKey() {
        return '';
    }

    initDataSource() {
        this.setState(this.props);
    }

    dataSource() {
        this.setState(this.props);
    }

    mapStateToProps(state) {

        return this.props;
    }
}