import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockPokemonResults } from "../../../data/mock";
import PokemonListCard from "./pokemon-list-card.component";

describe("PokemonListCard Component", () => {
  const onIconClick = jest.fn();
  const onButtonClick = jest.fn();
  const imageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10243.png";
  const { name } = mockPokemonResults[0];

  it("Load component correctly", () => {
    render(
      <PokemonListCard
        name={name}
        image={imageUrl}
        isFavorite={true}
        onButtonClick={onButtonClick}
        onIconClick={onIconClick}
      />
    );

    expect(screen.getAllByRole('img')[0].getAttribute('src')).toEqual(imageUrl)
    expect(screen.getByRole("heading").innerHTML).toEqual(name);
    expect(screen.getAllByRole("img")[1].getAttribute("src")).toEqual(
      "/src/assets/icons/lover.png"
    );
  });

  it("Display correct image if not favorite", () => {
    render(
      <PokemonListCard
        name={name}
        image={imageUrl}
        isFavorite={false}
        onButtonClick={onButtonClick}
        onIconClick={onIconClick}
      />
    );

    expect(screen.getAllByRole("img")[1].getAttribute("src")).toEqual(
      "/src/assets/icons/heart.png"
    );
  });

  it("Trigger correct click event", async () => {
    render(
      <PokemonListCard
        name={name}
        image={imageUrl}
        isFavorite={false}
        onButtonClick={onButtonClick}
        onIconClick={onIconClick}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getAllByRole("img")[1]);

    expect(onButtonClick).toBeCalledTimes(1);
    expect(onIconClick).toBeCalledTimes(1);
  });
});
