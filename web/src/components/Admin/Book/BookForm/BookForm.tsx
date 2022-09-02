import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'

const BookForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.book?.id)
  }

  console.log('Form props: ', props)

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
          defaultValue={props.book?.idCode}
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
          defaultValue={props.book?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="bookSerieId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Book series
        </Label>

        {/* <TextField
          name="bookSerieId"
          defaultValue={props.book?.bookSerieId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}
        <SelectField
          name="bookSerieId"
          defaultValue={props.book?.bookSerieId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {props.series?.map((serie) => {
            return (
              <option value={serie?.id} key={serie?.id}>
                {serie.title}
              </option>
            )
          })}
        </SelectField>

        <FieldError name="bookSerieId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookForm
