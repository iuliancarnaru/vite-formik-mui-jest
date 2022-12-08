import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
