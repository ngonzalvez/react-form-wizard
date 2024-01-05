<h3 align="center">React Form Wizard</h3>
<p align="center">Create form wizards in minutes</p>
<h1></h1>

![RWF Demo](blob:https://github.com/b39a71f6-a83e-4be7-90a9-98c5d714f4f1)

#### Important Note 
This is a work in progress. I'm actively developing this library, you can expect it to be live in a few days.

#### Installation
```sh
npm install rfw
```

#### Create a simple form


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
