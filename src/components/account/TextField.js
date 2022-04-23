import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password'
import { ErrorMessage, useField, useFormik } from 'formik';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const isFormFieldValid = () => meta.touched && meta.error

    return (
        <div className='field'>
            <span className='p-float-label'>
                {
                    props.type === 'text' ?
                        <InputText
                            id={field.name}
                            name={field.name}
                            {...field}
                            {...props}
                            className={isFormFieldValid() ? 'p-invalid' : ''}
                        />
                        :
                        <Password id={field.name}
                            name={field.name}
                            feedback={false}
                            toggleMask
                            {...field}
                            {...props}
                            className={isFormFieldValid() ? 'p-invalid' : ''}
                        />
                }
                <label htmlFor={field.name} className={isFormFieldValid() ? 'p-error' : ''} >{label}</label>
            </span>
            <ErrorMessage component='small' name={field.name} className='p-error' />
        </div>
    );
};

export default TextField;
