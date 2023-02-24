import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import {
  mockPokemonLastResults,
  mockPokemonListResponse,
} from "../../data/mock";
import PokemonListPage from "./pokemon-list-page";
import { config } from "../../data/config";

describe("PokemonListPage", () => {
  let mock: MockAdapter;
  const endpoint = `${config.apiUrl}/pokemon`;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onGet(endpoint).reply(200, mockPokemonListResponse);
  });

  afterEach(() => {
    mock.reset();
  });

  it("Load component correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    const filterBox = await screen.findByTestId("filter-box");
    expect(filterBox.getElementsByTagName("p")[0].innerHTML).toEqual("Filter");
    expect(filterBox.getElementsByTagName("label")[0].innerHTML).toEqual(
      "Favorite"
    );

    const resultBox = await screen.findByTestId("result-box");
    expect(resultBox.getElementsByClassName("col-md-4").length).toEqual(
      mockPokemonListResponse.results.length
    );

    expect(
      container.getElementsByClassName("pagination")[0]
    ).toBeInTheDocument();
  });

  it("show favorite result correctly", async () => {
    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    const resultBox = await screen.findByTestId("result-box");
    const firstFav = resultBox.getElementsByClassName("pointer")[0];
    const secondFav = resultBox.getElementsByClassName("pointer")[1];
    const filterBox = await screen.findByTestId("filter-box");

    await userEvent.click(firstFav);
    await userEvent.click(secondFav);
    await userEvent.click(filterBox.getElementsByTagName("input")[0]);

    expect(resultBox.getElementsByClassName("col-md-4").length).toEqual(2);

    await userEvent.click(filterBox.getElementsByTagName("input")[0]);
    expect(resultBox.getElementsByClassName("col-md-4").length).toEqual(
      mockPokemonListResponse.results.length
    );
  });

  it("should render other page after click pagination", async () => {
    mock.onGet(endpoint).reply(200, {
      ...mockPokemonListResponse,
      results: mockPokemonLastResults,
    });

    const { container } = render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    const pageItem = container.getElementsByClassName("page-item")[2];
    await userEvent.click(pageItem);

    const resultBox = await screen.findByTestId("result-box");
    expect(resultBox.getElementsByClassName("col-md-4").length).toEqual(
      mockPokemonLastResults.length
    );
  });
});
