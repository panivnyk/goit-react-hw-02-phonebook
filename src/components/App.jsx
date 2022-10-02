import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
// import { ContactItem } from 'components/ContactItem/ContactItem';
import { Filter } from 'components/Filter/Filter';

import { Div, Header, PContact, Section, Message } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInput = (values, { resetForm }) => {
    resetForm();
    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const dublicateContact = this.findDublicateContact(
      contact,
      this.state.contacts
    );
    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...values, id: nanoid() }],
        }));
  };

  findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const contacts = this.getFilteredContacts();
    return (
      <Div>
        <Header>Phonebook</Header>
        <Section>
          <ContactForm onSubmit={this.handleInput} />
        </Section>
        <PContact>Contacts</PContact>
        <Filter value={this.state.filter} onValueChange={this.changeFilter} />
        {contacts.length === 0 && (
          <Message>There is not any contacts yet</Message>
        )}
        <ContactList contacts={contacts} deleteContact={this.deleteContact} />
      </Div>
    );
  }
}
