import { NameComponent } from '../showInput';

export const sbTsTemplate = (componentName: NameComponent['capitalize']) => {
  return `import type { Meta, StoryObj } from "@storybook/react"
import ${componentName} from "./${componentName}"

const meta: Meta<typeof ${componentName}> = {
    title: '${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
    args: {
        // props
    },
};
`;
};

export const sbJsTemplate = (componentName: NameComponent['capitalize']) => {
  return `import ${componentName} from "./${componentName}"

/** @type {import('@storybook/react').Meta} */
const meta = {
    title: '${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

/** @type {import('@storybook/react').StoryObj<typeof ${componentName}>}*/
export const Default = {
    args: {
        // props
    },
};
`;
};
