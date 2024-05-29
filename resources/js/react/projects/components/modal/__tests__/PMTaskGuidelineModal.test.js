import React from "react";
import { render, screen } from '@testing-library/react';
import PMTaskGuidelineModal from "../PMTaskGuidelineModal";
import { ProjectData } from "../../../constants";


const mockData = ProjectData[0].projectData.pm_task_guideline


describe("Parent Task Guideline", () => {

  // Render Test Cases
  it("should render without crashing", () => {
    render(
      <PMTaskGuidelineModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={mockData}
        isLoading={false}
      />
    )
    const modalTitle = screen.getByRole('heading', { name: /Parent Task Guideline/i }, {
      level: 2
    });
    const sectionTitle = screen.getAllByRole("heading" , { level: 6 });
    expect(modalTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveLength(4);
  })

  it("should render all the sections", () => {

    render(
      <PMTaskGuidelineModal
        isModalOpen={true}
        closeModal={() => { }}
        modalData={mockData}
        isLoading={false}
      />
    )
    const ptD = screen.getByText("Provide Theme Details :");
    const tn = screen.getByText("Theme Name :");
    const tu = screen.getByText("Theme Url :");
    expect(ptD).toBeInTheDocument();
    expect(tn).toBeInTheDocument();
    expect(tu).toBeInTheDocument();

    const csd = screen.getByText("Color Scheme Details :");
    const pc = screen.getByText("Primary Color :");
    const wsdutc = screen.getByText("Where Should Developer Use this Color: :");
    const sc = screen.getByText("Secondary Color :");
    const wsdutc2 = screen.getByText("Where Should Developer Use this Color: :");

    expect(csd).toBeInTheDocument();
    expect(pc).toBeInTheDocument();
    expect(wsdutc).toBeInTheDocument();
    expect(sc).toBeInTheDocument();
    expect(wsdutc2).toBeInTheDocument();

    const ddp = screen.getByText("Design Details Provided:");
    const drt = screen.getByText("Design Reference Type:");
    const rsl = screen.getByText("Reference Site Link :");
    const Instruction = screen.getByText("Instruction :");


    expect(ddp).toBeInTheDocument();
    expect(drt).toBeInTheDocument();
    expect(rsl).toBeInTheDocument();
    expect(Instruction).toBeInTheDocument();

    const pl = screen.getByText("Plugin Research :");
    const pln = screen.getByText("Plugin Name :");
    const plu = screen.getByText("Plugin Url :");
    const ifutpl = screen.getByText("Instruction for Using This Plugin :");
    const gdl = screen.getByText("Google Drive Link :");

    expect(pl).toBeInTheDocument();
    expect(pln).toBeInTheDocument();
    expect(plu).toBeInTheDocument();
    expect(ifutpl).toBeInTheDocument();
    expect(gdl).toBeInTheDocument();

  })


  


});
