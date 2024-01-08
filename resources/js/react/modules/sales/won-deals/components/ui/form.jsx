import styled from 'styled-components';


// input-group styled component
export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

// label styled component
export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;

  & > sup{
    color: red;
  }
`;

// input styled component
export const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid rgb(0 0 0 / 8%);
  width: 100%;
  height: 40px;
  border-radius: 6px;


  &:read-only,
  &:disabled {
    background-color: rgb(0 0 0 / 5%);
  }
`;



export const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioInput = styled.input`
  
`;