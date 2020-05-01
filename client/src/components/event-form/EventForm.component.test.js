import React from "react";
import { render } from "@testing-library/react";
import EventForm from "./EventForm.component";
import { Simulate } from "react-dom/test-utils";

describe("Event form", () => {
  it("does not show errors when form not touched", () => {
    // given
    const updateTouched = jest.fn();
    const updateForm = jest.fn();
    const form = {
      firstName: "",
      lastName: "",
      email: "",
      date: new Date(),
    };
    const touched = {
      firstName: false,
      lastName: false,
      email: false,
    };
    // when
    const { queryByText } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
      />
    );
    // then
    const emailError = queryByText(/Email must be valid/i);
    expect(emailError).toBeNull();

    const firstNameError = queryByText(/First name can't be blank/i);
    expect(firstNameError).toBeNull();

    const lastNameError = queryByText(/Last name can't be blank/i);
    expect(lastNameError).toBeNull();

    const dateError = queryByText(/Date can't be blank/i);
    expect(dateError).toBeNull();
  });

  it("renders email error", () => {
    // given
    const updateTouched = jest.fn();
    const updateForm = jest.fn();
    const form = {
      firstName: "first name",
      lastName: "last name",
      email: "",
      date: new Date(),
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByText } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
      />
    );
    // then
    const element = getByText(/Email must be valid/i);
    expect(element).toBeInTheDocument();
  });
  it("renders first name error", () => {
    // given
    const updateTouched = jest.fn();
    const updateForm = jest.fn();
    const form = {
      firstName: "",
      lastName: "last name",
      email: "aaa@bbb.ccc",
      date: new Date(),
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByText } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
      />
    );
    // then
    const element = getByText(/First name can't be blank/i);
    expect(element).toBeInTheDocument();
  });
  it("renders last name error", () => {
    // given
    const updateTouched = jest.fn();
    const updateForm = jest.fn();
    const form = {
      firstName: "First name",
      lastName: "",
      email: "aaa@bbb.ccc",
      date: new Date(),
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByText } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
      />
    );
    // then
    const element = getByText(/Last name can't be blank/i);
    expect(element).toBeInTheDocument();
  });
  it("renders date error", () => {
    // given
    const updateForm = jest.fn();
    const updateTouched = jest.fn();
    const form = {
      firstName: "First name",
      lastName: "Last name",
      email: "aaa@bbb.ccc",
      date: "",
    };

    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByText } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
      />
    );
    // then
    const element = getByText(/Date can't be blank/i);
    expect(element).toBeInTheDocument();
  });
  it("is disabled when submitting", () => {
    // given
    const updateTouched = jest.fn();
    const updateForm = jest.fn();
    const form = {
      firstName: "First name",
      lastName: "Last name",
      email: "aaa@bbb.ccc",
      date: "2020-20-03",
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByTestId } = render(
      <EventForm
        form={form}
        updateForm={updateForm}
        touched={touched}
        updateTouched={updateTouched}
        isLoading={true}
      />
    );
    // then
    expect(getByTestId("first-name")).toHaveAttribute("disabled");
    expect(getByTestId("last-name")).toHaveAttribute("disabled");
    expect(getByTestId("email")).toHaveAttribute("disabled");
    expect(getByTestId("date")).toHaveAttribute("disabled");
  });
  it("should submit", () => {
    // given
    const submitForom = jest.fn().mockImplementation(() => {});
    const form = {
      firstName: "First name",
      lastName: "Last name",
      email: "aaa@bbb.ccc",
      date: "2020-20-03",
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const { getByText } = render(
      <EventForm form={form} updateForm={jest.fn()} submitForom={submitForom} />
    );
    // then
    Simulate.click(getByText("Create"));
    expect(submitForom).toBeCalled();
  });
  it("valid form umatches snapshot", () => {
    // given
    const submitForom = jest.fn().mockImplementation(() => {});
    const form = {
      firstName: "First name",
      lastName: "Last name",
      email: "aaa@bbb.ccc",
      date: "2020-20-03",
    };
    const touched = {
      firstName: true,
      lastName: true,
      email: true,
    };
    // when
    const component = render(
      <EventForm
        form={form}
        updateForm={jest.fn()}
        submitForom={submitForom}
        touched={touched}
      />
    );
    // then
    expect(component).toMatchSnapshot();
  });
});
