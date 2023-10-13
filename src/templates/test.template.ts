import { NameComponent } from '../showInput';

export const testTsTemplate = (componentName: NameComponent['capitalize']) => {
  return `import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Button />);

        expect(baseElement).toBeTruthy();
    });
});`;
};

export const testJsTemplate = (componentName: NameComponent['capitalize']) => {
  return `import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Button />);

        expect(baseElement).toBeTruthy();
    });
});`;
};
