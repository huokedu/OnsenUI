import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

class BaseInput extends BasicComponent {
  constructor(...args) {
    super(...args);

    this.onChange = (event) => {
      if (this.props.onChange) {
        return this.props.onChange(event);
      }
    };
  }

  get EVENT_TYPES() {
    return ['change', 'input'];
  }

  componentDidMount() {
    super.componentDidMount();
    const node = ReactDOM.findDOMNode(this);

    if (this.props.value !== undefined) {
      node.value = this.props.value;
    }

    this.EVENT_TYPES.forEach(eventType => node.addEventListener(eventType, this.onChange));
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    this.EVENT_TYPES.forEach(eventType => node.removeEventListener(eventType, this.onChange));
  }

  componentWillReceiveProps(props) {
    const node = ReactDOM.findDOMNode(this);

    if (typeof props.value !== 'undefined' && node.value !== props.value) {
      node.value = props.value;
    }

    if (typeof props.checked !== 'undefined') {
      node.checked = props.checked;
    }
  }

  render() {
    const { onChange, ...props } = this.props;
    return React.createElement(this._getDomNodeName(), Util.getAttrs(this, props));
  }
}

BaseInput.propTypes = {
  modifier: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputId: PropTypes.string,
  float: PropTypes.bool
};

export default BaseInput;
