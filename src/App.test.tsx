import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from "./components/App/App"

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Список задач/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds a new task', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Здесь можно создать список дел/i);
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText('+'));

  const newTaskElement = screen.getByText(/New Task/i);
  expect(newTaskElement).toBeInTheDocument();
});