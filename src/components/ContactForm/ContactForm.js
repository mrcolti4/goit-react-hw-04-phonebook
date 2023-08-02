import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik, Form } from 'formik';

import { InputField } from 'components/InputField/InputField';

import { validateName, validateNumber } from 'js/validation/validation';

import style from './ContactForm.module.css';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetInputs = () => {
    setName('');
    setNumber('');
  };

  const canBeSubmitted = () => {
    const errors = {
      name: Boolean(validateName(name)),
      number: Boolean(validateNumber(number)),
    };
    const isDisabled = Object.keys(errors).some(error => errors[error]);

    return !isDisabled;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!canBeSubmitted()) {
      return;
    }
    const contact = { name, number };
    onAddContact(contact);
    resetInputs();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: name,
        number: number,
      }}
    >
      {({ errors }) => (
        <Form className={style.contact__form}>
          <label className={style.contact__label}>
            Name
            <InputField
              validate={validateName}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              changeState={setName}
              className={errors.name && 'error'}
              validateOnChange={true}
            />
          </label>
          <label className={style.contact__label}>
            Phone
            <InputField
              validate={validateNumber}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              changeState={setNumber}
              className={errors.number && 'error'}
              validateOnChange={true}
            />
          </label>
          <button
            onClick={handleSubmit}
            disabled={!canBeSubmitted()}
            type="submit"
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
