
<center>
   <img alt="React Create Component logo" src="https://raw.githubusercontent.com/JavGt/component-creator/main/assets/images/icon/icon.png" width="150">
</center>

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

| Integrations         | Technologies                                  |
| -------------------- | --------------------------------------------- |
| Framework or library | [React]                                       |
| Language             | [Javascript], [Typescript]                    |
| Style extensions     | [CSS], [SASS], [SCSS]                         |
| Styles options       | [CSS Module], [styled-component], tradicional |

[React]: https://github.com/facebook/react
[CSS]: https://developer.mozilla.org/es/docs/Web/CSS
[SASS]: https://github.com/sass/sass
[SCSS]: https://github.com/sass/sass
[Typescript]: https://github.com/microsoft/TypeScript
[javascript]: https://developer.mozilla.org/es/docs/Web/JavaScript
[styled-component]: https://github.com/styled-components/styled-components
[CSS Module]: https://github.com/css-modules/css-modules

## How does it work?

### Use from a specific path

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/sample1.gif?alt=media&token=79c7993d-1e0d-4e04-a7f2-1d7d00afb71f)
You can use it by clicking on the folder where you want your component to be and clicking on the "Create Component" option.

### Use by entering the path

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/sample2.gif?alt=media&token=a3c742f1-8ad2-49d9-a66d-a182ca1f2228)
You can also use it by giving it by executing the "Create Component" command from the command palette
To create a component it can also be executed with the following keys (ctrl + shift + l)

## Settings

![Working](https://firebasestorage.googleapis.com/v0/b/recursos-ae4c5.appspot.com/o/Captura%20de%20pantalla%202022-08-30%20014924.png?alt=media&token=837eb0a2-6a5b-429c-856e-c01d00e78ce7)
You can make plugin settings to make component creation much faster.

## Structure Results

```routes
ComponentFolder
│
│── Component.{jsx, tsx}
│
|── styles.{css, scss, sass}
│
└── index.{js, ts}
```

## Example of output with traditional CSS

### Javascript

<img alt="Ejemplo de resultado de Js" height="300" src="./assets/images/examples/example-js.png">

### css

<img alt="Ejemplo de resultado de CSS" height="200" src="./assets/images/examples/example-css.png">

### Barrel

<img alt="Ejemplo de resultado de Barrel" height="200" src="./assets/images/examples/example-barrel.png">

### License

React Create Component is [MIT licensed](./LICENSE).
