
import React, {Component} 						from 'react';
import PropTypes 								from 'prop-types';
import { Form, Icon, Input, Button, Card }            from 'antd';
import loginActions                         from '../../redux/actions/loginActions';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component {

    // constructor(props){
    //     super(props);
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    // }



    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Card title="כניסה לחשבון" style={{ width: 300 }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                        label="שם משתמש"
                    >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                        label="סיסמא"
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    errorMessage: PropTypes.string,
};

LoginForm.defaultProps = {
    onSubmit: () =>{},
    errorMessage: "",
};

export default LoginForm;