import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const backspaceImg = require('./backspace.png');
const defaultFunction = _ => {
};

let value = {
  default: ''
};

class KeypadEasy extends Component {
  state = {
    show: false,
    title: '安全键盘',
    keys: [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['', 0, 'backspace']],
    maxLength: false,
    name: 'default',
    needPadding: true
  };

  onChange = defaultFunction;
  onClick = defaultFunction;
  onShow = defaultFunction;
  onHide = defaultFunction;

  componentWillUnmount() {
    window.removeEventListener('click', this.clickEvent, true);
  }

  componentDidMount() {
    window.addEventListener('click', this.clickEvent, true);
  }

  componentWillMount() {
    this.init();
  }

  clickEvent = e => {
    e.target.getAttribute('keypad-element') ? void 0 : this.hide();
  };

  init = (options = {}) => {
    let obj = {};
    options.title ? obj.title = options.title : void 0;
    options.message ? obj.message = options.message : void 0;
    options.keys ? obj.keys = options.keys : void 0;
    options.maxLength ? obj.maxLength = options.maxLength : void 0;
    options.show ? obj.show = options.show : void 0;
    options.name ? obj.name = options.name : void 0;
    options.needPadding ? obj.needPadding = options.needPadding : void 0;
    this.setState(obj)
  };

  show = (name = 'default', options) => {
    let {needPadding} = this.state;
    value[name] ? void 0 : value[name] = '';
    this.setState({value, name, show: true}, _ => {
      this.onShow(name);
      if (needPadding) {
        const paddingOffset = document.getElementsByClassName('keypad')[0].offsetHeight;
        document.body.style.paddingBottom = paddingOffset + 'px';
      }
    });
    if (options) {
      this.init(options);
    }
  };

  hide = _ => {
    const {needPadding, name} = this.state;
    this.setState({show: false}, _ => {
      this.onHide(name);
      if (needPadding) {
        document.body.style.paddingBottom = 0;
      }
    });
  };

  clearValue(name) {
    value[name] = '';
    this.onChange(value);
  };

  insertValue = val => {
    let {name, maxLength} = this.state;
    if (maxLength) {
      if (value[name].length >= maxLength) {
        return false;
      }
    }
    value[name] = value[name] + val;
    this.onChange(value);
  };

  deleteValue = _ => {
    let {name} = this.state;
    value[name] = value[name].slice(0, value[name].length - 1);
    this.onChange(value);
  };

  renderKey(value, index) {
    return value !== '' ? value === 'backspace' ?
      <span keypad-element="1" key={index} className="keypad-content-key-item keypad-content-key-backspace"
            onClick={_ => {
              this.deleteValue();
              this.onClick({type: 'delete', value});
            }}><img keypad-element="1" className="keypad-key-backspace" src={backspaceImg} alt="backspace"/></span> :
      <span keypad-element="1" key={index} className="keypad-content-key-item keypad-content-key-value"
            onClick={_ => {
              this.insertValue(value);
              this.onClick({type: 'insert', value});
            }}>{value}</span> :
      <span keypad-element="1" key={index} className="keypad-content-key-item"/>
  }

  render() {
    const {show, title, keys, message} = this.state;

    return <div className={`keypad ${show ? 'keypad-show' : 'keypad-hide'}`}>
      <div className="keypad-header" keypad-element="1">
        <span className="keypad-header-safe" keypad-element="1"/>
        <span className='keypad-header-title' keypad-element="1">{title}</span>
        <span className='keypad-header-message' keypad-element="1">{message}</span>
        <div className='keypad-header-close' onClick={this.hide} keypad-element="1"/>
      </div>
      <div className="keypad-content" keypad-element="1">
        <Fragment>
          {
            keys.map((lineArr, lineIndex) => (
              <div key={lineIndex} className="keypad-content-line" keypad-element="1">
                {
                  lineArr.map((value, index) => {
                    return this.renderKey(value, index)
                  })
                }
              </div>))
          }
        </Fragment>
      </div>
    </div>;
  }
}

let dom = document.getElementById('keypad-easy');
if (!dom) {
  dom = document.createElement('div');
  dom.setAttribute('id', 'keypad-easy');
  document.body.appendChild(dom);
}
const KeypadEasyDom = ReactDOM.render(<KeypadEasy/>, dom);
export default KeypadEasyDom;
