<h3 align="center">React Form Wizard</h3>
<p align="center">Create form wizards in minutes</p>
<h1></h1>

#### Important Note 
This is a work in progress. I'm actively developing this library, you can expect it to be live in a few days.

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
import Wizard from 'rfw';

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
<h1></h1>

#### Adding more steps
In order to add more steps for your wizard, simply add the step config to the a `steps` array. When there's more than one step, you'll see the progress of the wizard at the top.

```typescript
<Wizard steps={[firstStep, secondStep, thirdStep]}/>
```
<h1></h1>

#### Multiple fields per row
The `fields` array in the step config can contain a field description, or an array of field descriptions. If you pass an array of field descriptions, `wizard.js` will place those fields in the same row.
```typescript
const formStep = {
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
<h1></h1>

#### Having a field depend on another field
Sometimes the options available for one field is dependant on the value of another field.For example, when entering the address the cities you can choose are dictated by the state you have previously selected. 
```typescript
const formStep = {
  fields: [
      { key: 'state', label: 'State', type: 'select', options: getAllStates() },
      { key: 'city', label: 'City', type: 'select', dependsOn: 'state', options: (data) => getAllCitiesByState(data.state) },
  ]
};
<Wizard steps={[formStep]}/>
```
<h1></h1>

#### Form submission
Use the `onSubmit` prop to pass your submission handler function.

```typescript
const handleSubmit = (data: Record<string, any>) => console.log('Form data:', data);

<Wizard steps={[formStep]} onSubmit={handleSubmit]/>
```
<h1></h1>

#### Built With
- [Typescript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [classnames](https://github.com/JedWatson/classnames) 
