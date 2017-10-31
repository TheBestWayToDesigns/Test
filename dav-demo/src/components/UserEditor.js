import { Form, Row, Col, Input, DatePicker, Modal, Button, message, Icon,Select } from 'antd';
import { connect } from 'dva';
import SelectAll from '../../../../components/select/SelectAll';
const Option = Select.Option;

class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var params = this.props.form.getFieldsValue();
        this.props.dispatch({ type : 'roleTypeAction/save',  payload : {  params : params} ,callback: this.refresh});
      }else{
      }
    });
  }
  refresh = (data) =>{
    if(data.success){
      this.setState({
        visible: false,
      });
      message.success(data.result);
    }else{
      this.props.form.setFields({
        typeName: {
          errors: [new Error(data.error)],
        },
      });
    }
  }
  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <span>
        <Button type={this.props.Icon === 'edit'?'':"primary"} icon={this.props.Icon} onClick={this.showModal} style={{marginBottom : '10px'}} size={this.props.size}>
          {this.props.title}
        </Button>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
            <Button key="submit" type="primary"  onClick={this.handleSubmit}>保存</Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
              {getFieldDecorator('roleType', { initialValue:this.props.params.roleType})(
                <Input type="hidden"/>
              )}
            {getFieldDecorator('updDate', { initialValue:this.props.params.updDate})(
              <Input type="hidden"/>
            )}
            <Form.Item {...formItemLayout} label="角色类型名" hasFeedback >
              {getFieldDecorator('typeName', {
                initialValue:this.props.params.typeName,
                rules:
                  [ {
                    max:20,
                    required: true,
                    message: '请输入角色类型名！',
                  }],
              })(
                <Input/>
              )}
            </Form.Item>
            <SelectAll id="oidGroupId" name="oidGroupName"  show={true} showName="全部"
                       hasFeedback={true} formItemLayout ={{...formItemLayout}} label ="组"
                       required={true} message="请选择组" value={{id:this.props.params.oidGroupId}}
                       url='crmDllCommonController/findDllGroup'
                       form={this.props.form}
            />
          </Form>
        </Modal>
      </span>
    );
  }
}
App = Form.create()(App);
export default connect(({ roleTypeAction }) => ({ roleTypeAction }))(App);