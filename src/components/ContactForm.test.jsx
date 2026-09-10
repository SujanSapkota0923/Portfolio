import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

test('validates required fields', async () => {
  const user=userEvent.setup(); render(<ContactForm/>); await user.click(screen.getByRole('button',{name:/send enquiry/i}))
  expect(await screen.findByText('Please enter your name.')).toBeInTheDocument()
  expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
  expect(screen.getByText('Please share at least 20 characters.')).toBeInTheDocument()
})
