<h3 align="center">React Form Wizard</h3>
<p align="center">Create form wizards in minutes</p>
<h1></h1>

#### Important Note 
This is a work in progress. I'm actively developing this library, you can expect it to be live in a few days.

<p align="center">
  <img src="https://github.com/ngonzalvez/react-form-wizard/blob/main/rfw.gif" alt="RFW Demo"/>
</p>


#### Installation
```sh
npm install rfw
```

#### Create a simple form
Let's create a form with a single step. You can add as many steps as you want.

```typescript
const formStep = {
  title: 'Hi there!',
  subtitle: 'Tell us a little bit about you.',
  fields: [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'John Smith' },
    { key: 'email', label: 'Email', type: 'text', placeholder: 'john@smith.co
  ]
};
<Wizard steps={[formStep]}/>
```

#### Built With
- `Javascript`
- `React`
- `classnames`