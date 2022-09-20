export default () => {
  if (!('scrollBehavior' in document.documentElement.style)) {
    import('scroll-behavior-polyfill');
  }
};
