import Select from 'react-select'

import { Control, Controller, FieldValues } from '@redwoodjs/forms'

const ReactSelectMultipleChoice = ({
  name = 'series',
  options = [],
  defaultValues,
  control,
}: {
  name: string
  options: []
  defaultValues: []
  control?: Control<FieldValues, object>
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select
            {...field}
            options={options}
            defaultValue={defaultValues}
            getOptionValue={(option) => option?.id}
            getOptionLabel={(option) => option?.title}
            isMulti
            // FIXME: EX: 1
            // this produces: Variable "$input" got invalid value { idCode: "serie_stormlight_archive", title: "Stormlight Archive", books: [[Object], [Object], [Object], [Object], [Object]] }; Field "books" is not defined by type "UpdateBookSerieInput".
            // data sent is full books object - could also be correct depending on what Redwood API really expects or should expect
            onChange={(val) => {
              field?.onChange(val)
            }}

            // FIXME: EX 2:
            // this produces: Variable "$input" got invalid value { idCode: "serie_stormlight_archive", title: "Stormlight Archive", books: ["cl7k9ur1q0028tgrcadj1f2za", "cl7k9ur200037tgrc0jw9suhc", "cl7k9ur280045tgrc3om2wm0c", "cl7k9ur2o0054tgrc53mrr3wc", "cl7k9ur2x0062tgrc4adiaa5p"] }; Field "books" is not defined by type "UpdateBookSerieInput".
            // data looks more correct but all fields after selection are cleared
            // onChange={(val) => {
            //   return field.onChange(
            //     val.map((element) => {
            //       return element.id
            //     })
            //   )
            // }}

            // FIXME: EX 3:
            // this produces same as EX_1:
            // Variable "$input" got invalid value { idCode: "serie_stormlight_archive", title: "Stormlight Archive", books: [[Object], [Object], [Object], [Object], [Object]] }; Field "books" is not defined by type "UpdateBookSerieInput".
            // data sent is full books object - could also be correct depending on what Redwood API really expects or should expect
            // onChange={(data) => {
            //   console.log('data: ', data)

            //   field.value = data.map((element) => element.id)
            //   return field.onChange(data)
            // }}
          />
        )
      }}
    />
  )
}

export default ReactSelectMultipleChoice
