import { Component } from 'react';
import { Formik } from 'formik';
import { Form, Header, Section, LabelName, Input, Button } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  handleInput = event => {
    event.preventDefault();
    this.setState({ name: event.currentTarget.value });
    console.log(event.currentTarget.value);
  };

  render() {
    return (
      <Form>
        <Header>Phonebook</Header>
        <Section>
          <LabelName>
            Name
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </LabelName>
          <Button type="submit">Add contact</Button>
        </Section>
        <Header>Contacts</Header>
      </Form>
    );
  }
}
