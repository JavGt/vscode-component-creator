import type { NameComponent } from '../types';

export const testTsTemplate = (componentName: NameComponent['capitalize']) => {
	return `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<${componentName} />);

        expect(baseElement).toBeTruthy();
    });
});`;
};

export const testJsTemplate = (componentName: NameComponent['capitalize']) => {
	return `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<${componentName} />);
        expect(baseElement).toBeTruthy();
    });
});`;
};
