import { nanoid } from 'nanoid';
import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

function isOnList(list, value) {
  const arr = list.map(item => item.name);
  return arr.some(element => {
    return element === value;
  });
}

const CONTACT_KEY = 'phone-contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(CONTACT_KEY);
    this.setState({ contacts: JSON.parse(contacts) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACT_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = contact => {
    if (isOnList(this.state.contacts, contact.name)) {
      alert(`${contact.name} is already on contact list`);
      return;
    }

    const finalContact = { ...contact, id: nanoid() };
    this.setState({ contacts: [finalContact, ...this.state.contacts] });
  };

  onDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase().trim())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.onFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}
