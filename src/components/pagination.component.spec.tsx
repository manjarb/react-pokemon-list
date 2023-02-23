import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./pagination.component";

describe("FavoriteIcon Component", () => {
  it("Load and Display Navigation", () => {
    render(
      <Pagination
        total={20}
        limit={50}
        currentPage={1}
        onPageChange={() => {}}
      />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("trigger callback function", async () => {
    const onPageChange = jest.fn();
    const { container } = render(
      <Pagination
        total={20}
        limit={50}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    await userEvent.click(container.getElementsByClassName("page-link")[1]);
    expect(onPageChange).toBeCalledTimes(1);
  });
});
