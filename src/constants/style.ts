export const STYLE_OPTIONS = {
  traditional: {
    label: 'Style Traditional',
    detail: 'import "./style.css;',
    value: 'traditional',
  },
  module: {
    label: 'Style Module',
    detail: 'import styles from "./style.module.css;"',
    value: 'module',
  },
  component: {
    label: 'Style Component',
    detail: 'import styled from "[styled-components | @emotion/styled]";',
    value: 'component',
  },
  none: {
    label: 'None',
    detail: 'Create a component without style',
    value: 'none',
  },
};

export const STYLE_EXTENSIONS = {
  css: {
    label: 'CSS',
    detail: 'import "./style.css;',
    value: 'css',
    ext: '.css',
  },
  scss: {
    label: 'SCSS',
    detail: 'import "./style.scss;',
    value: 'scss',
    ext: '.scss',
  },
  sass: {
    label: 'SASS',
    detail: 'import "./style.sass;',
    value: 'sass',
    ext: '.sass',
  },
};
