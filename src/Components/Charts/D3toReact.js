import React from "react";

const D3out = D3render =>
  class D3toReact extends React.Component {
    constructor() {
      super(...arguments);
      this.anchor = React.createRef();
    }
    componentDidMount() {
      D3render(this.anchor, this.props, this.state);
    }
    componentDidUpdate() {
      D3render(this.anchor, this.props, this.state);
    }
    render() {
      const { x, y } = this.props;
      const Component = this.props.component || "g";
      return React.createElement(Component, {
        transform: `translate(${x}, ${y})`,
        ref: this.anchor
      });
    }
  };
export default D3out;
export const useD3 = function(render) {
  const refAnchor = React.useRef(null);
  React.useEffect(() => {
    render(refAnchor.current);
  });
  return refAnchor;
};