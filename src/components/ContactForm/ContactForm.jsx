import { PropTypes } from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  LabelName,
  FormContact,
  Input,
  Button,
  Error,
} from 'components/ContactForm/ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(255)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .min(3)
    .max(13)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <FormContact autoComplete="on">
        <LabelName htmlFor="name">Name</LabelName>
        <Input type="text" name="name" placeholder="Enter name" />
        <Error name="name" component="span" />

        <LabelName htmlFor="number">Number</LabelName>
        <Input type="tel" name="number" placeholder="Enter number" />
        <Error name="number" component="span" />
        <Button type="submit">Add contact</Button>
      </FormContact>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
