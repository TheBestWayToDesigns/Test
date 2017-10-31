import React from 'react';
import { message, Table, Button, Popconfirm, Spin } from 'antd';
import { get, del } from '../../utils/requestFetch';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
    };
  }
  /**
   * 组件挂载之前调用一次
   * */
  componentWillMount() {
    get('http://localhost:3000/book')
      .then((res) => {
        this.setState({
          bookList: res,
        });
      });
  }
  /**
   * 编辑图书
   * */
  handleEdit(book) {
    this.context.router.push(`/book/edit/${book.id}`);
  }
  /**
   * 删除图书
   * */
  handleDel(book) {
    del(`http://localhost:3000/book/${book.id}`)
      .then(() => {
        this.setState({
          bookList: this.state.bookList.filter(item => item.id !== book.id),
        });
        message.success('删除图书成功');
      })
      .catch((err) => {
        console.error(err);
        message.error('删除图书失败');
      });
  }

  render() {
    const { bookList } = this.state;

    const columns = [
      {
        title: '图书ID',
        dataIndex: 'id',
      },
      {
        title: '书名',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => <span>&yen;{record.price / 100}</span>,
      },
      {
        title: '所有者ID',
        dataIndex: 'owner_id',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Button.Group>
        ),
      },
    ];

    return (
      bookList?
      <Table columns={columns} dataSource={bookList} rowKey={row => row.id} />:<Spin />
    );
  }
}

BookList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default BookList;
