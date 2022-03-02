import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import '../../styles/registrationform.css';
import TextField from './TextField';
import AccountContext from '../../context/AccountContext';
import AccountService from '../../services/AccountService';
import Messages from '../util/Messages';

const LoginFormComponent = () => {
    const navigate = useNavigate()
    const { username, setUsername, setUserId, toast, wasLoggedOut, setWasLoggedOut } = useContext(AccountContext)

    useEffect(() => {
        const currentUser = AccountService.getCurrentUser()

        if (currentUser) {
            navigate("/");
            return;
        }

        if (wasLoggedOut) {
            Messages.logoutSuccesful(toast)
            setWasLoggedOut(false)
        }
    }, [])


    const login = async (values) => {
        try {
            const account = {
                "username": values.email,
                "password": values.password
            };

            const response = await AccountService.signin(account);

            localStorage.setItem("user", JSON.stringify(response.data))

            setUsername(response.data.username)
            setUserId(response.data.id)

            navigate("/")
            Messages.loginSuccessful(toast)
        } catch (error) {
            if (error.response) {
                toast.current.clear();
                Messages.loginBadCredentials(toast);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                toast.current.clear();
                Messages.loginError(toast);
                // Something happened in setting up the request that triggered an Error
                console.log(`Error: ${error.message}`);
            }
            console.log(error.config);
        }
    }

    const validate = Yup.object({
        email: Yup.string().required('Kohustuslik väli'),
        password: Yup.string().required('Kohustuslik väli'),
    })

    return (
        <div className='registrationForm'>
            <Toast ref={toast} />
            <div className='formContent'>
                <div className='card'>
                    <h5>Logi sisse</h5>
                    <Formik
                        initialValues={{
                            email: username,
                            password: ''
                        }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            login(values)
                        }}
                    >
                        <Form>
                            <TextField label='Email' name='email' type='text' />
                            <TextField label='Parool' name='password' type='password' />
                            <Button type='submit' label='Logi sisse' />
                            <p><Link to="/register">Uus kasutaja?</Link></p>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginFormComponent;
