import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms';

const BookReleaseForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.bookRelease?.id);
  };

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
          name="releaseTitle"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Release title
        </Label>

        <TextField
          name="releaseTitle"
          defaultValue={props.bookRelease?.releaseTitle}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="releaseTitle" className="rw-field-error" />

        <Label
          name="publisher"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Publisher
        </Label>

        <TextField
          name="publisher"
          defaultValue={props.bookRelease?.publisher}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="publisher" className="rw-field-error" />

        <Label
          name="coverType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cover type
        </Label>

        <TextField
          name="coverType"
          defaultValue={props.bookRelease?.coverType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="coverType" className="rw-field-error" />

        <Label
          name="releaseInfo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Release info
        </Label>

        <TextField
          name="releaseInfo"
          defaultValue={props.bookRelease?.releaseInfo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="releaseInfo" className="rw-field-error" />

        <Label
          name="country"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Country
        </Label>

        <TextField
          name="country"
          defaultValue={props.bookRelease?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="country" className="rw-field-error" />

        <Label
          name="language"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Language
        </Label>

        <TextField
          name="language"
          defaultValue={props.bookRelease?.language}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="language" className="rw-field-error" />

        <Label
          name="bookId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Book id
        </Label>

        <TextField
          name="bookId"
          defaultValue={props.bookRelease?.bookId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="bookId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default BookReleaseForm;
