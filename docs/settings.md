# Settings for your work area

## Import react top

type: `boolean`

Default: `true`

Description: Controls whether to automatically include the `import React from 'react';` statement at the top of newly created React components. Set to `true` to include the import statement, and `false` to omit it. This setting enhances code clarity and conformity to best practices.

### Example

```json
{
  "reactCreateComponent.settings.importReact": true
}
```

## Extension style

type: `string`

Default: `to ask`

Options: `to ask`, `css`, `scss`, `sass`

Description: Controls the style of the component.Use if you want to use `css`, `sass`, or `scss`

### Example

```json
{
  "reactCreateComponent.settings.extensionStyle": "css"
}
```

## Create barrel

type: `boolean`

Default: `true`

Description: Controls the creation of the barrel file or index file `index.[tj]s` inside the folder

### Example

```json
{
  "reactCreateComponent.settings.createBarrel": true
}
```

## Lenguaje

type: `string`

Default: `to ask`

Options: `to ask`, `javascript`, `typescript`

Description: Controls the language of the component (`javascript` or `typescript`)

### Example

```json
{
  "reactCreateComponent.settings.lenguaje": "javascript"
}
```

## Type style

type: `string`

Default: `to ask`

Options: `to ask`, `component`, `module`, `traditional`, `none`

Description: Controls the type of style the component (`traditional`, `module`, `component` or `none`)

### Example

```json
{
  "reactCreateComponent.settings.selectTypeStyletypeStyle": "component"
}
```

## Default route

type: `string`

Default: `src/`

Description: Control the default route when creating a new route

### Example

```json
{
  "reactCreateComponent.settings.defaultRoute": "src/"
}
```

## Create interface

type: `boolean`

Default: `true`

Description: Controls the creation of the interface

### Example

```json
{
  "reactCreateComponent.settings.createInterface": true
}
```

## Interface Type

type: `string`

Default: `type`

Options: `type`, `interface`

Description: Controls the type of interface to create (`interface` or `type`)

### Example

```json
{
  "reactCreateComponent.settings.interfaceType": "type"
}
```

## Recommended routes

type: `array`

Default: `["src/components"]`

Description: Controls the list of routes to create the component

### Example

```json
{
  "reactCreateComponent.settings.recommendedRoutes": ["src/components"]
}
```

## Styled components library

type: `string`

Default: `styled-components`

Options: `styled-components`, `emotion`

Description: Controls the library to use for styled components.

### Example

```json
{
  "reactCreateComponent.settings.styledComponentsLibrary": "styled-components"
}
```

## Import propTypes

type: `boolean`

Default: `true`

Description: Controls the import of `import PropTypes from 'prop-types';`

### Example

```json
{
  "reactCreateComponent.settings.importPropTypes": true
}
```

## selected extras

type: `array`

Default: `[]`

Options: `[]`, `stories`, `test`

Description: Controls the list of extras to create the component.

### Example

```json
{
  "reactCreateComponent.settings.selectedExtras": ["stories", "test"]
}
```

## Ask extras

type: `boolean`

Default: `true`

Description: Controls if the user will be asked about the extras

### Example

```json
{
  "reactCreateComponent.settings.askExtras": true
}
```

## Page type (Next.js)

type: `string`

Default: `to ask`

Options: `to ask`, `folder`, `file`

Description: Controls the type of page to create (`folder` or `file`) for nextjs.

### Example

```json
{
  "reactCreateComponent.settings.pageType": "folder"
}
```

## Platform

type: `string`

Default: `to ask`

Options: `to ask`, `web`, `native`

Description: Controls the platform to create the component (`web` or `native`).

### Example

```json
{
  "reactCreateComponent.settings.platform": "web"
}
```
