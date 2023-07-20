import { render, fireEvent } from '@testing-library/react-native';
import App from './newTodo';

describe('App', () => {
  //test case checks if a new todo item with the text 'Buy milk' is added to the component's state when the user enters the text and clicks the "Add" button.
  it('adds a new todo when the add button is pressed', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const input = getByPlaceholderText('Enter item to buy');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Buy milk');
    fireEvent.press(addButton);

    const todoItem = queryByText('Buy milk');
    expect(todoItem).toBeTruthy();
  });

  it('deletes individual todo items when the delete button is pressed', () => {
    const { getAllByText, getByPlaceholderText, queryByText } = render(<App />);

    // Add two todo items
    const input = getByPlaceholderText('Enter item to buy');
    const addButton = getAllByText('Add')[0]; // Get the first "Add" button
    fireEvent.changeText(input, 'Buy milk');
    fireEvent.press(addButton);
    fireEvent.changeText(input, 'Buy eggs');
    fireEvent.press(addButton);

    // Check if the first todo item exists
    const firstTodoItem = queryByText('Buy milk');
    expect(firstTodoItem).toBeTruthy();

    // Check if the second todo item exists
    const secondTodoItem = queryByText('Buy eggs');
    expect(secondTodoItem).toBeTruthy();

    // Delete the first todo item
    const deleteButtons = getAllByText('Delete');
    fireEvent.press(deleteButtons[0]); // Get the first "Delete" button

    // Check if the first todo item is deleted
    expect(queryByText('Buy milk')).toBeNull();

    // Check if the second todo item still exists
    expect(queryByText('Buy eggs')).toBeTruthy();
  });
});
