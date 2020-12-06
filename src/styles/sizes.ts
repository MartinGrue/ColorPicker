export const sizes = {
  widths: {
    xs: '655.98px',
    s: '767.98px',
    m: '991.98px',
    l: '1199.98px'
  } as { [key: string]: string },
  up() {},
  down(size: 'xs' | 's' | 'm' | 'l') {
    return `@media (max-width: ${this.widths[size]})`;
  }
};
