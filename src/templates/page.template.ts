export const pageTsTemplate = () => {
  return `import type { NextPage } from 'next';

const Page: NextPage = () => {
    return (
        <div>
            <h1>Page</h1>
        </div>
    )
}

export default Page;
`;
};

export const pageJsTemplate = () => {
  return `/** @type {NextPage} */
const Page = () => {
    return (
        <div>
            <h1>Page</h1>
        </div>
    )
}

export default Page;
`;
};
