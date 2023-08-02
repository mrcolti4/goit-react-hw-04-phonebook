import PropTypes from 'prop-types';
import { Component } from 'react';
import { Formik, Form } from 'formik';

import { InputField } from 'components/InputField/InputField';

import { validateName, validateNumber } from 'js/validation/validation';

import style from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeInput = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    const contact = { ...this.state };
    this.props.onAddContact(contact);
    this.setState({
      name: '',
      number: '',
    });
  };

  canBeSubmitted() {
    const errors = {
      name: Boolean(validateName(this.state.name)),
      number: Boolean(validateNumber(this.state.number)),
    };
    const isDisabled = Object.keys(errors).some(error => errors[error]);

    return !isDisabled;
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: this.state.name,
          number: this.state.number,
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
                value={this.state.name}
                changeState={this.handleChangeInput}
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
                value={this.state.number}
                changeState={this.handleChangeInput}
                className={errors.number && 'error'}
                validateOnChange={true}
              />
            </label>
            <button
              onClick={this.handleSubmit}
              disabled={!this.canBeSubmitted()}
              type="submit"
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}
ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
