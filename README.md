<h3 align="center">React Form Wizard</h3>
<p align="center">Create form wizards in minutes</p>
<h1></h1>

<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/demo.gif" alt="RFW Demo"/>
</p>
<h1></h1>

#### Installation

```sh
npm install rfw
```

<h1></h1>

#### Create a simple form

Let's create a form with a single step.

```typescript
import { Form } from "rfw";

<Form
  title="Hi there!"
  instructions="Tell us a little bit about you"
  fields={[
    { key: "name", type: "text", label: "Name", placeholder: "John Smith" },
    { key: "email", type: "text", label: "Email", placeholder: "john@smith.co" },
  ]}
/>;
```

<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/simple-form.png" alt="Simple form"/>
</p>
<h1></h1>

#### Types of fields

Right now the supported field types are: `input`, `select`, `date`, `checkbox`, `image`, `text`, `separator`.

#### Creating a multi-step form wizard

```typescript
import { FormWizard } from "rfw";

// Form definition goes here...

<FormWizard steps={[firstFormProps, secondFormProps, thirdFormProps]} />;
```

<h1></h1>

#### Multiple fields per row

```typescript
const formStep = {
  fields: [
    // Include both fields in the same row.
    [
      { key: "firstName", label: "First name", type: "text", placeholder: "John" },
      { key: "lastName", label: "Last name", type: "text", placeholder: "Smith" },
    ],
    { key: "email", label: "Email", type: "text", placeholder: "john@smith.co" },
  ],
};
<Wizard steps={[formStep]} />;
```

<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/multiple-fields-per-row.png" alt="Multiple fields per row"/>
</p>
<h1></h1>

#### Field dependant on another field

Sometimes the options available for one field is dependant on the value of another field. For example, when entering the address, the cities you can choose are dictated by the state you have previously selected.

```typescript
<Form
  fields={[
    {
      key: "state",
      type: "select",
      label: "State",
      options: getAllStates(),
    },
    {
      key: "city",
      type: "select",
      label: "City",
      dependsOn: "state", // This will update the field every time the dependency changes.
      options: (data) => getAllCitiesByState(data.state),
    },
  ]}
/>
```

<h1></h1>

#### Form submission

```typescript
const handleSubmit = (formData) => console.log(formData);

<Form fields={fields} onSubmit={handleSubmit}>
```

<h1></h1>

#### What's next?

Some of the features that will soon be available are:

- Custom styles
- Ability to conditionally skip steps
- Conditional step navigation
- Support for custom components

If you'd like to suggest a new feature feel free to create an issue or drop me a line at nico@ncode.uy.

#### Built With

- [Typescript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [classnames](https://github.com/JedWatson/classnames)
