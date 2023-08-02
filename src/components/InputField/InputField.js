import { Field } from 'formik';

export function InputField(props) {
  const {
    className,
    name,
    changeState,
    validateOnChange = false,
    ...rest
  } = props;
  // validateField
  return (
    <Field
      name={name}
      {...rest}
      // render={({ field, form: { touched, errors, validateField } }) => {

      // }}
    >
      {({ field, form: { touched, errors, validateField } }) => {
        const error =
          (validateOnChange || touched[name]) &&
          typeof errors[name] === 'string'
            ? errors[name]
            : null;
        const onChange = e => {
          const {
            target: { value },
          } = e;
          changeState(value);
          validateField(field.name);
          return field.onChange(e);
        };
        return (
          <>
            <input {...field} onChange={onChange} />
            {error && error}
          </>
        );
      }}
    </Field>
  );
}
