import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import Display from "../Display";

import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
  name: "Stranger Things",
  seasons: [
    {
      episodes: [],
      id: 0,
      name: "Season 1",
    },
    {
      episodes: [],
      id: 1,
      name: "Season 2",
    },
  ],
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air.",
};

test("The Display component renders without any props passed in", () => {
  render(<Display />);
});

test("When the fetch button is pressed the show Component displays", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const mockHandleSelect = jest.fn();
  render(<Display handleSelect={mockHandleSelect} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const seasonDropDown = await screen.findAllByTestId("season-option");
  expect(seasonDropDown).toHaveLength(2);
});

test("when the optional functional prop passed in to the Display component client code and the fetch button is pressed, displayFunc is called", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const mockDisplayFunc = jest.fn();
  act(() => {
    render(<Display displayFunc={mockDisplayFunc(testShow)} />);
  });

  const button = screen.getByRole("button");
  userEvent.click(button);
  expect(mockDisplayFunc).toBeCalledTimes(1);
});

// ///Tasks:
// //1. Add in nessisary imports and values to establish the testing suite.
// //2. Test that the Display component renders without any passed in props.
// //3. Rebuild or copy a show test data element as used in the previous set of tests.
// //4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// //5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// // 6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
