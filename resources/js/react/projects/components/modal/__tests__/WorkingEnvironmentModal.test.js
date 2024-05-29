import React from "react";
import { render, screen, } from "@testing-library/react";
import WorkingEnvironmentModal from "../WorkingEnvironmentModal";


const mockData = {
  site_url: 'https://www.example.com',
  login_url: 'https://www.example.com/login',
  frontend_password: 'passwords',
  email: "sdfkdsjlfjfdsdf",
  password: "password"
}


describe("WorkingEnvironmentModal", () => {
  // Render Test Cases
  it("should render without crashing", () => {
    render(
      <WorkingEnvironmentModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={mockData}
        isLoading={false}
      />
    )

    expect(screen.getByText("Working Environment")).toBeInTheDocument();
    expect(screen.getByText("Site Url :")).toBeInTheDocument();
    expect(screen.getByText("Login Url :")).toBeInTheDocument();
    expect(screen.getByText("Frontend Password :")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
  });

  it("should Render with mock data", () => {
    render(
      <WorkingEnvironmentModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={mockData}
        isLoading={false}
      />
    )


    expect(screen.getByText("Working Environment")).toBeInTheDocument();
    expect(screen.getByText("Site Url :")).toBeInTheDocument();
    expect(screen.getByText(mockData.site_url)).toBeInTheDocument();
    expect(screen.getByText("Login Url :")).toBeInTheDocument();
    expect(screen.getByText(mockData.login_url)).toBeInTheDocument();
    expect(screen.getByText("Frontend Password :")).toBeInTheDocument();
    expect(screen.getByText(mockData.frontend_password)).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText(mockData.email)).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText(mockData.password)).toBeInTheDocument();

  })


});