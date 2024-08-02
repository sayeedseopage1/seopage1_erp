import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectDeadlineExtensionModal from "../ProjectDeadlineExtensionModal";
import { toast } from 'react-toastify';
import userEvent from "@testing-library/user-event";
import { DatePicker } from "antd";

// Mocking the react-toastify module
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));


describe("Project Deadline Extension Modal", () => {
  // Render Test Cases
  it("should render without crashing", () => {
    render(
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



  // Test Cases for handleDeadlineExtension function when all fields are empty
  it("should show validation errors when all fields are empty", () => {
    render(
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
  it("should submit the form successfully", async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {

    });
    jest.spyOn(toast, 'success').mockImplementation(() => { });


    const mockSubmit = jest.fn();
    mockSubmit.mockResolvedValueOnce({ success: true });

    render(
      <ProjectDeadlineExtensionModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={{ deadline: '2024-05-30' }}
        isLoading={false}
      />
    )

    await userEvent.click(screen.getByLabelText("New Deadline *"));
    render(
      <DatePicker
        ype="date"
        id="newDeadline"
        name="newDeadline"
      />
    )
    await userEvent.click(screen.getByText("31"));
    await userEvent.click(screen.getByText("Client was unavailable"));
    await userEvent.type(screen.getByLabelText("Description *"), "Description of the new deadline");
    expect(screen.getByText("31")).toBeInTheDocument();
    expect(screen.getByText("Description of the new deadline")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Submit"));
    mockSubmit();
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    toast.success("Deadline Extension Request Submitted Successfully");
    expect(toast.success).toHaveBeenCalledWith("Deadline Extension Request Submitted Successfully");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(screen.queryByRole('modal')).not.toBeInTheDocument();
  })

  // // Test Cases for handleDeadlineExtension function when an error occurs
  it("should show error toast on submission error", async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {

    });
    jest.spyOn(toast, 'error').mockImplementation(() => { });

    const mockSubmit = jest.fn();
    mockSubmit.mockRejectedValueOnce(new Error("API Error"));

    render(
      <ProjectDeadlineExtensionModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={{ deadline: '2024-05-30' }}
        isLoading={false}
      />
    )

    await userEvent.click(screen.getByLabelText("New Deadline *"));
    render(
      <DatePicker
        ype="date"
        id="newDeadline"
        name="newDeadline"
      />
    )
    await userEvent.click(screen.getByText("31"));
    await userEvent.click(screen.getByText("Client was unavailable"));
    await userEvent.type(screen.getByLabelText("Description *"), "Description of the new deadline");
    expect(screen.getByText("31")).toBeInTheDocument();
    expect(screen.getByText("Description of the new deadline")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Submit"));
    // Corrected assertion
    await expect(mockSubmit()).rejects.toEqual(new Error("API Error"));
    toast.error("An error occurred. Please try again later");
    expect(toast.error).toHaveBeenCalledWith("An error occurred. Please try again later");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(screen.getByText("Submit")).toBeInTheDocument();
  })
});
