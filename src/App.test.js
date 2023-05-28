import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./utils/utils', () => ({
  fetchUsers: jest.fn(),
  extractNextPageSince: jest.fn(),
}));

const mockResponse = {
  members: [
    { login: 'Bob', id: 0},
    { login: 'Cat', id: 1 },
    { login: 'Zuli', id: 2 }
  ],
  linkHeader: '<https://api.github.com/users?per_page=10&since=3>; rel="next"',
};

// const secondMockResponse = {
//   members: [
//     { login: 'Barb', id: 3 },
//     { login: 'Tabby', id: 4 },
//     { login: 'Puppy', id: 7 }
//   ],
//   linkHeader: '<https://api.github.com/users?per_page=10&since=8>; rel="next"',
// };

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    require('./utils/utils').fetchUsers
    .mockResolvedValueOnce(mockResponse)
    // .mockResolvedValueOnce(secondMockResponse);
    require('./utils/utils').extractNextPageSince
    .mockReturnValueOnce(0)
    // .mockReturnValueOnce(3);
  });

  test("displays the names of users when the API call is successful", async () => {
    render(<App />);
    expect(await screen.findByText(/Zuli/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cat/i)).toBeInTheDocument();
  });

  // test.only("displays the next list of users when the Next button is clicked", async () => {
  //   render(<App />);

  //   fireEvent.click(screen.getByText(/Next/i));

  //   await waitFor(() => {
  //     expect(utils.fetchUsers).toHaveBeenCalledTimes(2);
  //     expect(screen.getByText(/Barb/i)).toBeInTheDocument();
  //   });
  // });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
