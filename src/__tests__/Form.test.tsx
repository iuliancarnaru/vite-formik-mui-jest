import 'jest-styled-components';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { MaterialUIForm2 } from '../Form2';

describe('MaterialUIForm', () => {
  const handleSubmit = jest.fn();

  it('should render', () => {
    const { container } = render(<MaterialUIForm2 onSubmit={handleSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it('should change field values and call handleSubmit', async () => {
    render(<MaterialUIForm2 onSubmit={handleSubmit} />);

    const user = userEvent.setup();

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const buttonEl = screen.getByRole('button', { name: /send/i });

    await user.type(emailField, 'test@test.com');
    await user.type(passwordField, 'verylongandcomplicated');

    expect(emailField).toHaveValue('test@test.com');
    expect(passwordField).toHaveValue('verylongandcomplicated');

    await user.click(buttonEl);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'verylongandcomplicated',
      })
    );
  });
});
