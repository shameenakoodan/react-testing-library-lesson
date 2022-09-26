import Form from "./Form";
import {render,screen} from "@testing-library/react";
//Render is a virtual version of a component
import userEvent from "@testing-library/user-event";
//User event is the default export for user-event so don't have to put in curly braces

it("Should render the form",()=>{
    render(<Form />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
});
it("Should render the basic input fields",()=>{
    render(<Form />);
   /* const nameInput = screen.getByRole("textbox",{
        name:"Name"
    });
    const emailInput = screen.getByPlaceholderText("e.g. test@test.com");
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeTruthy();*/
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input)=>{
        expect(input).toBeInTheDocument();
    })
})
it("Should not render error message on page load",()=>{
    render(<Form />);
    const errorMessage = screen.queryByText("Sorry something went wrong");
    expect(errorMessage).not.toBeInTheDocument();
})
//Mini Challenge
//Write a test to check that the success message is NOT there on load.
it("Should not render success message on page load",()=>{
    render(<Form />);
    const successMessage = screen.queryByText("Thank you for submitting! We'll be in touch");
    expect(successMessage).not.toBeInTheDocument();
});
 

it("Should not submit the form with invalid credentials and should render warning message",()=>{
    render(<Form />);
    const nameInput = screen.getByRole("textbox",{
        name:"Name"
    })
    //This inputs some information
    userEvent.type(nameInput,"");
    const email = screen.getByRole("textbox",{
        name:"Email"
    })
    userEvent.type(email,"spongebob");
    const button  = screen.getByRole("button");
    userEvent.click(button);

    const warning  =screen.getByText("Sorry something went wrong");
    expect (warning).toBeInTheDocument();
    const success = screen.queryByText("Thank you for submitting!We'll be in touch");
    expect(success).not.toBeInTheDocument();
});

it("Should display Thank you for submitting when valid credentials are input",()=>{
    render(<Form />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "John Doe");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "shameena@mail.com");

  const button = screen.getByRole("button", { name: /Sign In/i });
  userEvent.type(button);

  const alert = screen.queryByText("Sorry something went wrong");
  expect(alert).toBeFalsy();
  const success = screen.getByText(/Thank you for submitting/i);
  expect(success).toBeTruthy();
});
