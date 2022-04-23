import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import '../../styles/registrationform.css';
import * as Yup from 'yup';
import TextField from './TextField';
import AccountService from '../../services/AccountService';
import AccountContext from '../../context/AccountContext';
import Messages from '../util/Messages';

const RegistrationForm = () => {

    const { setUsername, toast } = useContext(AccountContext)
    const navigate = useNavigate()

    useEffect(() => {
        const currentUser = AccountService.getCurrentUser()
        if (currentUser) {
            navigate("/")
        }
    }, [])


    const register = async (values, actions) => {
        try {
            const account = {
                "username": values.email,
                "password": values.password
            };

            await AccountService.signup(account);

            setUsername(values.email)

            actions.resetForm();
            navigate("/login")
            Messages.registrationSuccessful(toast);
        } catch (error) {
            if (error.response) {
                toast.current.clear();
                Messages.userExists(toast)
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                toast.current.clear();
                Messages.registrationError(toast)
                // Something happened in setting up the request that triggered an Error
                console.log(`Error: ${error.message}`);
            }
            console.log(error.config);
        }
    }

    const validate = Yup.object({
        email: Yup.string()
            .email('Ebasobiv emaili aadress')
            .required('Kohustuslik väli'),
        password: Yup.string()
            .min(8, 'Parooli pikkus peab olema vähemalt 8 tähemärki')
            .required('Kohustuslik väli'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Paroolid peavad ühtima')
            .required('Kohustuslik väli')
    })

    return (
        <div className='registrationForm'>
            <Toast ref={toast} />
            <div className='formContent'>
                <div className='card'>
                    <h5>Loo kasutaja</h5>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validate}
                        onSubmit={(values, actions) => {
                            register(values, actions)
                        }}
                    >
                        <Form>
                            <TextField label='Email' name='email' type='text' />
                            <TextField label='Parool' name='password' type='password' />
                            <TextField label='Korda parooli' name='confirmPassword' type='password' />
                            <Button type='submit' label='Registreeri' />
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
