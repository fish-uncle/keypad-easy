# keypad-easy

![version](https://img.shields.io/badge/version-v1.0.0-brightgreen.svg?style=flat-square) [![React](https://img.shields.io/badge/react-16.x.x-brightgreen.svg?style=flat-square)](https://github.com/facebook/react) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

### 下载
```
npm install keypad-easy --save
```

### 使用说明
```javascript
import KeypadEasy from 'keypad-easy'

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    KeypadEasy.onChange = (value) => {
      this.setState({value})
    };
    KeypadEasy.onClick = (a) => {
      console.log(a)
    };
    KeypadEasy.onShow = _ => {
      console.log('show')
    };
    KeypadEasy.onHide = _ => {
      console.log('hide')
    };
    KeypadEasy.init({
      maxLength: 5
    })
  }

  render() {
    return (
      <div>
        <h2>keypad-easy</h2>
        <div style={{height: '30px', borderBottom: '1px solid #ddd', margin: '10px'}} onClick={_ => {
          KeypadEasy.show('username', {message: '用户名'});
        }}>{this.state.value.username}</div>
        <div style={{height: '30px', borderBottom: '1px solid #ddd', margin: '10px'}} onClick={_ => {
          KeypadEasy.show('password', {message: '密码'});
        }}>{this.state.value.password}</div>
      </div>
    );
  }
}
```

### API

* init(options)

  初始化键盘区

  |参数名|描述|字段类型|默认值|
  |--|--|--|--|
  |title|键盘标题|String|'安全键盘'|
  |message|键盘当前输入框的描述|String|''|
  |show|键盘显示/隐藏|Boolean|false|
  |keys|键盘9宫格布局|Array|[[1, 2, 3], [4, 5, 6], [7, 8, 9], ['', 0, 'backspace']]|
  |maxLength|键盘当前输入框的最长字段|Boolean/Number|false|
  |name|键盘当前输入框的name,类似于input的name属性|String|'default'|
  |needPadding|键盘底部兼容自动添加paddingBottom|Boolean|true|
  ```
  KeypadEasy.init({
    title:'xx安全键盘'
  })
  ```
* onChange

  键盘输入值变化回调
  ```
  KeypadEasy.onChange = (value) => {
    // value 中存着不同 name 属性的所有的值
    console.log(value.default)
  }
  ```
  
* onClick
  九宫格键盘点击回调
  ```
  KeypadEasy.onClick = ({type,value}) => {
    // type  insert/delete
    // value 当前按钮值
  };
  ```
  
* onShow

  九宫格唤起回调
  ```
  KeypadEasy.onShow = name => {
    // 类似于input的name属性
  };
  ```
  
* onHide
  九宫格隐藏回调
  ```
  KeypadEasy.onHide = name => {
    // 类似于input的name属性
  };
  ```
  
### 效果展示
![doc](https://user-images.githubusercontent.com/47963826/53787066-928e9300-3f58-11e9-967a-9e35253708be.png)

### 注意

手机唤起假键盘时，如输入区域位于底部，插件会自动添加一个等同键盘高度的 paddingBottom
如需滚动到最底部可通过，onShow 实现
