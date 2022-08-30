# React Create Component

Create your React Js components (Currently) in a fast way, with multiple variety in less than 5 seconds.

## Features

- Create a component depending on the selected language.
- Create a style file depending on the type of style or extension selected.
- You can create styles per module.
- You can create a component with built-in style import.
- It generates a barrel in your folder.
- In the tsx files, integrate the interface.

## Integrations

| Integrations         | Technologies                             |
| -------------------- | ---------------------------------------- |
| Framework or library | [React]                                  |
| Language             | [Javascript], [Typescript]               |
| Style extensions     | [css], [sass], [scss]                    |
| Styles options       | [module], [Style-Component], tradicional |

[react]: https://github.com/facebook/react
[css]: https://developer.mozilla.org/es/docs/Web/CSS
[sass]: https://github.com/sass/sass
[scss]: https://github.com/sass/sass
[typescript]: https://github.com/microsoft/TypeScript
[javascript]: https://developer.mozilla.org/es/docs/Web/JavaScript
[style-component]: https://github.com/styled-components/styled-components
[module]: https://github.com/css-modules/css-modules

## How does it work?

### Use from a specific path

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/sample1.gif?alt=media&token=79c7993d-1e0d-4e04-a7f2-1d7d00afb71f)
You can use it by clicking on the folder where you want your component to be and clicking on the "Create Component" option.

### Use by entering the path

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/sample2.gif?alt=media&token=a3c742f1-8ad2-49d9-a66d-a182ca1f2228)
You can also use it by giving it by executing the "Create Component" command from the command palette
to enter the command palette execute (ctrl + shift + p)

## Settings

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/Captura%20de%20pantalla%202022-08-30%20014924.png?alt=media&token=837eb0a2-6a5b-429c-856e-c01d00e78ce7)
You can make plugin settings to make component creation much faster.

## Structure Results

```
ComponentFolder
│── Component.tsx        // The component can have the extension ".tsx" or ".jsx"
|── Styles               // Folder where you store the styles
│    └── Component.css   // The extension will depend on the selected option
└── index.tsx            // Index file to export the component
```

## Component result example

### Javascript

```javascript
import React from 'react';
import './styles/ComponentName.css';

const ComponentName = () => {
	return <div className='ComponentName'>ComponentName</div>;
};

export default ComponentName;
```

### css

```css
.ComponentName {
}
```

### Barrel

```javascript
export { default as ComponentName } from './ComponentName';
```

### License

React Create Component is [MIT licensed](./LICENSE).
