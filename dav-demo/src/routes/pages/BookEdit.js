
import React from 'react';
import BookEditor from '../../components/BookEditor';
import { get } from '../../utils/requestFetch';

class BookEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }
    /*
* 渲染前调用
* */
  componentWillMount() {
    const bookId = this.props.params.id;
    get(`http://localhost:3000/book/${bookId}`)
        .then((res) => {
          this.setState({
            book: res,
          });
        });
  }
  render() {
    console.log('this=', this);
    console.log('this.state=', this.state);
    const { book } = this.state;
    return book ? <BookEditor editTarget={book} /> : <span>加载中...</span>;
  }
}

export default BookEdit;
