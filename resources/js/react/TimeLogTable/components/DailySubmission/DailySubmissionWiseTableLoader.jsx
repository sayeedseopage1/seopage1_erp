import React from 'react';
import { Placeholder } from '../../../global/Placeholder';

const PersonLoader = () => {
  return (
    <div
      className="d-flex align-items-center"
      style={{ gap: "10px" }}
    >
      <Placeholder
        className="sp1-item-center border rounded-circle"
        width="36px"
        height="36px"
      />

      <div className="">
        <h6 className="mb-2 f-14">
          <Placeholder width="130px" />
        </h6>
        <span className="f-12 text-hover-underline">
          <Placeholder height="10px" width="80px" />
        </span>
      </div>
    </div>
  )
}

const DailySubmissionWiseTableLoader = () => {
  return (
    <React.Fragment>
      {_.times(4, index => (
        <React.Fragment key={index}>
          <tr className="sp1_tlr_tr">
            <td className="sp1_tlr_td" rowSpan={3}> <PersonLoader /> </td>
            <td className="sp1_tlr_td" rowSpan={3}> <Placeholder /> </td>
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td" > <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <Placeholder /> </td>
            {_.times(12, index => (
              <td key={index} className="sp1_tlr_td"> <Placeholder /> </td>
            ))}
          </tr>

          <tr className="sp1_tlr_tr">
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td" > <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <Placeholder /> </td>
            {_.times(12, index => (
              <td key={index} className="sp1_tlr_td"> <Placeholder /> </td>
            ))}
          </tr>

          <tr className="sp1_tlr_tr">
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td" > <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <PersonLoader /> </td>
            <td className="sp1_tlr_td"> <Placeholder /> </td>
            {_.times(12, index => (
              <td key={index} className="sp1_tlr_td"> <Placeholder /> </td>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default DailySubmissionWiseTableLoader;