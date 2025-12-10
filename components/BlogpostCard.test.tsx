import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";

import BlogpostCard from "./BlogpostCard";

describe("BlogpostCard component", () => {
  const mockProps = {
    name: "Test Blogpost",
    thumbnail: "test-thumbnail.jpg",
    abstract: "This is a test blogpost",
    date: "2022-01-01",
    tags: ["tag1", "tag2"],
  };

  it("renders correctly", () => {
    jest.spyOn(console, "error").mockImplementation();
    render(<BlogpostCard {...mockProps} />);
    expect(screen.getByText(/test blogpost/i)).toBeInTheDocument();
    expect(screen.getByText(/tag1/i)).toBeInTheDocument();
    expect(screen.getByText(/tag2/i)).toBeInTheDocument();
  });

  it("formats the date correctly", () => {
    render(<BlogpostCard {...mockProps} />);
    expect(screen.getByText("01. Januar 2022")).toBeInTheDocument();
  });

  it("renders the thumbnail correctly", () => {
    render(<BlogpostCard {...mockProps} />);
    const img = screen.getByAltText("Blogpost thumbnail") as HTMLImageElement;
    expect(img.src).toContain("test-thumbnail.jpg");
  });

  it("renders default image when thumbnail is not provided", () => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { thumbnail, ...propsWithoutThumbnail } = mockProps;
    render(<BlogpostCard {...propsWithoutThumbnail} />);
    const img = screen.getByAltText("Blogpost thumbnail") as HTMLImageElement;
    expect(img.src).toContain("default-thumbnail.jpg");
  });
});
