import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FavoriteIcon from "./favorite-icon.component";

import loverIcon from "../assets/icons/lover.png";
import heartIcon from "../assets/icons/heart.png";

describe("FavoriteIcon Component", () => {
  it("Load and Display image", () => {
    render(<FavoriteIcon isFavorite={true} onClick={() => {}} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("display lover icon", () => {
    render(<FavoriteIcon isFavorite={true} onClick={() => {}} />);
    expect(screen.getByRole("img").getAttribute("src")).toEqual(loverIcon);
  });

  it("display heart icon", () => {
    render(<FavoriteIcon isFavorite={false} onClick={() => {}} />);
    expect(screen.getByRole("img").getAttribute("src")).toEqual(heartIcon);
  });

  it("trigger a callback when clicked", async () => {
    const onClick = jest.fn();
    render(<FavoriteIcon isFavorite={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole('img'));
    expect(onClick).toBeCalledTimes(1);
  });
});
