import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import PokemonDetailPage from "./pokemon-detail-page";
import ReactRouter, { MemoryRouter } from "react-router";

import useFavorite from "../../hooks/use-favorite";
import * as useFavoriteList from "../../hooks/use-favorite-list";
import * as useGetAxios from "../../hooks/use-get-axios";
import { mockPokemonDetail } from "../../data/mock";
import loverIcon from "../../assets/icons/lover.png";
import heartIcon from "../../assets/icons/heart.png";


describe("PokemonDetailPage", () => {
  beforeAll(() => {
    jest
      .spyOn(ReactRouter, "useParams")
      .mockReturnValue({ name: mockPokemonDetail.name });
    jest.spyOn(useGetAxios, "default").mockReturnValue({
      data: mockPokemonDetail,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });
  });

  it("Load component correctly", () => {
    render(
      <MemoryRouter>
        <PokemonDetailPage />
      </MemoryRouter>
    );

    const images = screen
      .getByTestId("pokemon-images-box")
      .getElementsByTagName("img");
    expect(images[0].getAttribute("src")).toEqual(
      mockPokemonDetail.sprites.front_default
    );
    expect(images[1].getAttribute("src")).toEqual(
      mockPokemonDetail.sprites.back_default
    );
  });

  it("toggle favorite button correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <PokemonDetailPage />
      </MemoryRouter>
    );

    const image = container
      .getElementsByTagName("h1")[0]
      .getElementsByTagName("img")[0];
    expect(image.getAttribute("src")).toEqual(heartIcon);

    await userEvent.click(image);

    expect(image.getAttribute('src')).toEqual(loverIcon);
  });
});
