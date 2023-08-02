import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { CONTACT_KEY } from 'js/constants';
import { isOnList } from 'js/utils/isOnList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem(CONTACT_KEY);
    setContacts(JSON.parse(contacts));
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = contact => {
    if (isOnList(contacts, contact.name)) {
      alert(`${contact.name} is already on contact list`);
      return;
    }

    const finalContact = { ...contact, id: nanoid() };
    setContacts([finalContact, ...contacts]);
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={onFilter} />
      <ContactList contacts={filteredContacts} onDelete={onDeleteContact} />
    </div>
  );
};
