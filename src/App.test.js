import { render, screen } from '@testing-library/react';
import App from './App';

const mockResponse = [
  { "login": "Bob" },
  { "login": "Cat" },
  { "login": "Zuli" }
];

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(global, "axios").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    });
  });

  test("renders the names of users when the API call is successful", async () => {
    render(<App />);
    expect(await screen.findByText(/Zuli/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cat/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })
});
