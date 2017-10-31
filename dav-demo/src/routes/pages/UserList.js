import React from 'react';
import { message, Table, Button, Popconfirm, Spin } from 'antd';
import { get, del } from '../../utils/requestFetch';
import styles from '../styles/userList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }
  /*
  * 渲染前调用
  * */
  componentWillMount() {
    console.log('componentWillMount 调用')
    get('http://localhost:3000/user')
      .then((res) => {
        this.setState({
          userList: res,
        });
      });
  }
  /*
  * 编辑处理
  * */
  handleEdit(user) {
    console.log('user=', user);
    console.log('userId=', user.id);
    const url = `/user/edit/${user.id}`;
    console.log('url=', url);
    this.context.router.push(url);
  }
  /*
  * 删除处理
  * */
  handleDel(user) {
    del(`http://localhost:3000/user/${user.id}`)
      .then(() => {
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id),
        });
        message.success('删除用户成功');
      })
      .catch((err) => {
        console.error(err);
        message.error('删除用户失败');
      });
  }

  render() {
    const { userList } = this.state;

    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
              <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                <Button size="small">删除</Button>
              </Popconfirm>
            </Button.Group>
          );
        },
      },
    ];

    return (
      userList?
      <Table columns={columns} dataSource={userList} rowKey={row => row.id} />:<div className={styles.divBk}><Spin /></div>
    );
  }
}

UserList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default UserList;
