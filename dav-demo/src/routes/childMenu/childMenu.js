import React from 'react';
import { connect } from 'dva';
// import { menu } from '../menu/menu';

class childMenu extends React.Component {
  render() {
    return (
      <div>我是childMenu</div>
    );
  }
}

export default connect()(childMenu);
