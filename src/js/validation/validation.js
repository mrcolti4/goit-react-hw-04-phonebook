export function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)
  ) {
    error = 'Invalid name';
  }
  return error;
}

export function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
      value
    )
  ) {
    error = 'Invalid Number';
  }
  return error;
}
