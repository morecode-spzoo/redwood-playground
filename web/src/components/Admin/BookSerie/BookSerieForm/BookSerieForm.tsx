import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

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

        <SelectField
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
            )
          })}
        </SelectField>

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
