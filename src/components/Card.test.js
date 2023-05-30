import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import * as utils from "../utils/utils";

describe("Card", () => {
  it("displays user information fetched from Github", async () => {
    const userWithAllDetails = {
      login: "boo",
      id: 4,
      avatar_url: "some url",
      html_url: "link to Github",
      email: "email@email.com",
      name: "booyah",
      location: "San Francisco",
      public_repos: 4,
    };
    jest.spyOn(utils, "getUserDetails").mockResolvedValue(userWithAllDetails);

    render(<Card username={"boo"} />);

    const name = await screen.findByRole("heading", { value: "booyah" });
    const avatar = await screen.findByAltText("Avatar for boo");
    const email = await screen.findByText("email@email.com");
    const location = await screen.findByText("San Francisco");
    const link = await screen.findByRole("link", { value: "link to Github" });
    const numOfPublicRepos = await screen.findByText("4 public repos");

    expect(name).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(numOfPublicRepos).toBeInTheDocument();
  });

  it("displays alternative information if user information is missing", async () => {
    const userMissingSomeDetails = {
      login: "butterfly",
      id: 5,
      avatar_url: "basic avatar",
      html_url: "link to butterfly's Github",
      email: null,
      name: null,
      location: null,
      public_repos: 0,
    };
    jest
      .spyOn(utils, "getUserDetails")
      .mockResolvedValue(userMissingSomeDetails);

    render(<Card username={"butterfly"} />);

    const name = await screen.findByRole("heading", { value: "butterfly" });
    const avatar = await screen.findByAltText("Avatar for butterfly");
    const email = await screen.findByText("Email not available");
    const location = await screen.findByText("No location given");
    const link = await screen.findByRole("link", {
      value: "link to butterfly's Github",
    });
    const numOfPublicRepos = await screen.findByText("0 public repos");

    expect(name).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(numOfPublicRepos).toBeInTheDocument();

    expect(screen.queryByText("San Francisco")).not.toBeInTheDocument();
    expect(screen.queryByText("email@email.com")).not.toBeInTheDocument();
    expect(screen.queryByText("null")).not.toBeInTheDocument();
  });
});
