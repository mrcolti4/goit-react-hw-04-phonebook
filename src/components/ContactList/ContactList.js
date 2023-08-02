import PropTypes from 'prop-types';

import style from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <>
      {contacts.length === 0 && <h2>You don't add any contacts yet</h2>}
      <ul className={style.contact__list}>
        {contacts.map(({ name, number, id }) => {
          return (
            <li key={id} className={style.contact__item}>
              <span className="name">{name}:</span>
              <span className="phone">{number}</span>
              <button type="button" onClick={() => onDelete(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
