import styled from "styled-components";

export const ModalContainer = styled.div`
    width: 100%;
`;
export const ModalHeader = styled.div`
    color: white;
    background: #1d82f5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 29px 10px 0px 0px;
`;

export const HeaderLabel = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
`;
export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

export const ModalBody = styled.div`
    background: white;
    margin: 18px 44px 18px 44px;
    height: 100%;

    border-radius: 24px;
    border: 1px solid #e0e9ef;
    padding: 20px;
    background: #f2f9fe;
`;

export const FrontendPassword = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    color: #7b7b7b;
    font-size: 18px;
    font-weight: 400;
    width: 100%;
`;

export const ItemTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column; /* Add this line */
    margin-bottom: 20px;
`;

export const NumberOfPages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
`;
export const SectionContainer = styled.div`
    border-radius: 7px;
    border: 1px solid #e0e9ef;
    padding: 20px;
    background: #d8edfc;
    width: 65%;
    margin-bottom: 10px;
`;

export const SectionTitle = styled.p`
    font-weight: bold;
    color: #1d82f5;
    font-size: 16px;
    border-bottom: 1px solid #c1def2;
    padding-bottom: 10px;
    margin-bottom: 5px;
`;

export const Section = styled.section`
    margin-top: 10px;
`;

export const SectionHeader = styled.div``;

export const FlexSectionContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`;

export const StyledSection = styled.div``;

export const StyledInputItem = styled.div`
    width: 100%;
`;

export const InstructionText = styled.div`
    padding: 5px 0px;
    color: gray;
    margin-bottom: 5px;
`;

export const StyledFileUploadContainer = styled.div`
    padding: 2px 10px;
    background-color: #a2cbe8;
    border: 1px solid #91c6ec;
    border-radius: 6px;
    margin-bottom: 10px;
`;

export const FilesContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const FileMainContainer = styled.div`
    color: #676767;
`;

export const FileMainHeader = styled.div`
    font-weight: 500;
    margin: 10px 0 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px dotted blue;
`;

export const LinkAndFileContainer = styled.div`
    background-color: #c1def2;
    padding: 10px;
    border-radius: 6px;
`;

export const RadioInput = styled.input`
    -webkit-appearance: none; /* Remove default appearance */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #1dc9a0;
    outline: none;
    cursor: pointer;
    position: relative;
    margin-bottom: 5px;
    text-align: center;

    &:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12px; /* Size of the inner dot */
        height: 12px; /* Size of the inner dot */
        background-color: #1dc9a0; /* Color of the inner dot */
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const DailySubmissionButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    margin: 30px 0px 30px 35%;
`;
export const InputItem = ({
    value,
    onChange,
    placeHolder = "",
    label = "",
    width = "531px",
    height = "53px",
    inputType = "text",
    background = "#C1DEF2",
}) => (
    <InputContainer>
        <label>{label}</label>
        {inputType === "file" ? (
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                multiple
                style={{
                    borderRadius: "6px",

                    width, // set the width dynamically
                    height,
                    border: "none",
                }}
            />
        ) : (
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                style={{
                    borderRadius: "6px",
                    background,
                    width, // set the width dynamically
                    height,
                    border: "none",
                    padding: "10px",
                }}
            />
        )}
    </InputContainer>
);
