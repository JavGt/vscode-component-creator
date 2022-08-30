# React Create Component 

Create your React Js components (Currently) in a fast way, with multiple variety in less than 5 seconds.
 

## Features

- Create the component depending on the extension.
- Create a folder with the selected style extension.
- You can create styles per module.
- You can create a style component with the integrated import.


## Integrations

| Integrations            | Technologies                                      |
| ----------------------- | ------------------------------------------------- | 
| Framework or library    | [React]                                           | 
| Language                | [Javascript], [Typescript]                        |          
| Styles                  | [css], [sass], [scss]                             | 
| Styles options          | [module], [Style-Component], tradicional          | 

[React]: https://github.com/facebook/react
[css]: https://developer.mozilla.org/es/docs/Web/CSS
[sass]: https://github.com/sass/sass
[scss]: https://github.com/sass/sass
[Typescript]: https://github.com/microsoft/TypeScript
[Javascript]: https://developer.mozilla.org/es/docs/Web/JavaScript
[Style-Component]: https://github.com/styled-components/styled-components
[module]: https://github.com/css-modules/css-modules



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
import React from "react"
import "./styles/ComponentName.css"

const ComponentName = () =>{
    return (
        <div className="ComponentName">
            ComponentName
        </div>
    )
};

export default ComponentName;
```
### css 

```css
.ComponentName { }
```
### Barrel 

```javascript
export { default as ComponentName } from "./ComponentName";
```



