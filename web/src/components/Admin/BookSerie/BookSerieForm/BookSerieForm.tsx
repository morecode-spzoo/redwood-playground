import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  useForm,
  SelectField,
} from '@redwoodjs/forms'

import ReactSelectMultipleChoice from 'src/components/ReactSelectMultipleChoice/ReactSelectMultipleChoice'

const BookSerieForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.bookSerie?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="idCode"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Id code
        </Label>

        <TextField
          name="idCode"
          defaultValue={props.bookSerie?.idCode}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="idCode" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.bookSerie?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="books"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        {/* This implementation returns on save:
        Variable "$input" got invalid value { idCode: "serie_stormlight_archive", title: "Stormlight Archive",
        books: ["cl7k9ur1q0028tgrcadj1f2za", "cl7k9ur200037tgrc0jw9suhc", "cl7k9ur280045tgrc3om2wm0c", "cl7k9ur2o0054tgrc53mrr3wc"] };
        Field "books" is not defined by type "UpdateBookSerieInput".
        */}

        {/* FIXME: native select example*/}

        {/* <SelectField
          name="books"
          defaultValue={props.bookSerie?.books.map((book) => book.id)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          multiple={true}
          validation={{ required: true }}
        >
          {props.books?.map((book) => {
            return (
              <option value={book?.id} key={book?.id}>
                {book.title}
              </option>
            );
          })}
        </SelectField> */}

        {/* FIXME: react-select example see inside component into onChange method*/}
        <ReactSelectMultipleChoice
          options={props.books}
          defaultValues={props.bookSerie?.books}
          name="books"
        />

        <FieldError name="books" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookSerieForm
