<h3 align="center">React Form Wizard</h3>
<p align="center">Create form wizards in minutes</p>
<h1></h1>

#### Important Note 
This is a work in progress. I'm actively developing this library, you can expect it to be live in a few days.

<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/demo.gif" alt="RFW Demo"/>
</p>


#### Installation
```sh
npm install rfw
```

#### Create a simple form
Let's create a form with a single step.

```typescript
const formStep = {
  title: 'Hi there!',
  instructions: 'Tell us a little bit about you.',
  fields: [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'John Smith' },
    { key: 'email', label: 'Email', type: 'text', placeholder: 'john@smith.co' },
  ]
};
<Wizard steps={[formStep]}/>
```
<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/simple-form.jpg" alt="Simple form"/>
</p>

#### Adding more steps
In order to add more steps for your wizard, simply add the step config to the a `steps` array.

```typescript
<Wizard steps={[firstStep, secondStep, thirdStep]}/>
```

#### Multiple fields per row
The `fields` array in the step config can contain a field description, or an array of field descriptions. If you pass an array of field descriptions, `wizard.js` will place those fields in the same row.
```typescript
const formStep = {
  title: 'Hi there!',
  instructions: 'Tell us a little bit about you.',
  fields: [
    // Include both fields in the same row.
    [
      { key: 'firstName', label: 'First name', type: 'text', placeholder: 'John' },
      { key: 'lastName', label: 'Last name', type: 'text', placeholder: 'Smith' },
    ],
    { key: 'email', label: 'Email', type: 'text', placeholder: 'john@smith.co' },
  ]
};
<Wizard steps={[formStep]}/>
```
<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/images/multiple-fields-per-row.jpg" alt="Multiple fields per row"/>
</p>

#### Built With
- `Javascript`
- `React`
- `classnames`
