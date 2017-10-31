import React from 'react';
import UserEditor from '../../components/UserEditor';
import { get } from '../../utils/requestFetch';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  /*
  * 渲染前调用
  * */
  componentWillMount() {
    const userId = this.props.params.uid;
    console.log('UserEdit#userId', userId);
    get(`http://localhost:3000/user/${userId}`)
      .then((res) => {
        this.setState({
          user: res,
        });
      });
  }

  // editTarget:编辑标记添加
  render() {
    const { user } = this.state;
    return user ? <UserEditor editTarget={user} /> : <span>加载中...</span>;
  }
}

UserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default UserEdit;
