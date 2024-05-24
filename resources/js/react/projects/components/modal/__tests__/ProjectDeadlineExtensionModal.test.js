import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectDeadlineExtensionModal from "../ProjectDeadlineExtensionModal";
import { toast } from 'react-toastify';

// Mocking the react-toastify module
jest.mock('react-toastify', () => ({
  toast: jest.fn(), // Mocking toast as a function
}));

describe("ProjectDeadlineExtensionModal", () => {
  // Render Test Cases
  it("should render without crashing", () => {
    const { getByText, getByLabelText } = render(
      <ProjectDeadlineExtensionModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={{ deadline: '2024-05-30' }}
        isLoading={false}
      />
    )
    expect(screen.getByText("Project Deadline Extension Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Current Deadline")).toBeInTheDocument()
    expect(screen.getByLabelText("New Deadline *")).toBeInTheDocument()
  })

  // Functionality Test Cases Here


  // Test Cases for handleDeadlineExtension function when all fields are empty
  it("should show validation errors when all fields are empty", () => {
    const { getByText } = render(
      <ProjectDeadlineExtensionModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={{ deadline: '2024-05-30' }}
        isLoading={false}
      />
    )
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("New Deadline is required")).toBeInTheDocument();
    expect(screen.getByText("Reason is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
  })

  // // Test Cases for handleDeadlineExtension function
  it("should submit the form successfully", () => {
    const { getByText } = render(
      <ProjectDeadlineExtensionModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={{ deadline: '2024-05-30' }}
        isLoading={false}
      />
    )
    async () => {
      fireEvent?.change(screen.getByLabelText("New Deadline *"), { target: { value: "2024-06-30" } });
      fireEvent?.click(screen.getByText("Client was unavailable"));
      fireEvent?.change(screen.getByLabelText("Description *"), { target: { value: "Need more time" } });
      fireEvent?.click(screen.getByText("Submit"));
    }

    setTimeout(() => {
      expect(toast.success).toHaveBeenCalledWith("Deadline Extension Request Submitted Successfully");
    }, 2000)
  })
});
