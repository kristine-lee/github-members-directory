import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as utils from "./utils/utils";

describe("App", () => {
  it("displays an error page if the API call is unsuccessful", async () => {
    jest
      .spyOn(utils, "fetchUsers")
      .mockRejectedValueOnce(new Error("Oh no can't get the users"));

    render(<App />);

    expect(
      await screen.findByText("Something went wrong!😱")
    ).toBeInTheDocument();
    expect(await screen.findByRole("link", { value: "/" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
