import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "Finish Project"}});
    fireEvent.change(inputDate, { target: { value: "06/28/2022"}});
    fireEvent.click(element);
    fireEvent.change(inputTask, { target: { value: "Finish Project"}});
    fireEvent.change(inputDate, { target: { value: "06/28/2022"}});
    fireEvent.click(element);
    const check = screen.getAllByText(/Finish Project/i);
    expect(check.length === 1); // Have to make sure only one
    const newCheck = screen.getByText(/Finish Project/i);
    expect(newCheck).toBeInTheDocument(); // Have to make sure in document
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputDate, { target: { value: "06/28/2022"}});
    fireEvent.click(element); // Task not added 
    const check = screen.getByText(/You have no todo's left/i);
    expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "Finish Project"}});
    fireEvent.click(element); // Due date not added 
    const check = screen.getByText(/You have no todo's left/i);
    expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "Finish Project"}});
    fireEvent.change(inputDate, { target: { value: "06/28/2022"}});
    fireEvent.click(element);
    fireEvent.click(screen.getByRole('checkbox')) // Check here
    const check = screen.getByText(/You have no todo's left/i);
    expect(check).toBeInTheDocument();
 });

 test('test that App component renders different colors for past due events', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "Finish Project"}});
    fireEvent.change(inputDate, { target: { value: "08/29/2022"}}); // changed to a while later due date
    fireEvent.click(element);
    const check = screen.getByTestId(/Finish Project/i).style.background;
    expect(check).toBe("white");
    fireEvent.change(inputTask, { target: { value: "Finished Project"}});
    fireEvent.change(inputDate, { target: { value: "06/27/2022"}}); // changed to an earler due date
    fireEvent.click(element);
    const nextCheck = screen.getByTestId(/Finished Project/i).style.background;
    expect(nextCheck).toBe("red");
 });
