import styled from "styled-components";


// form group
export const FormGroup = styled.div`
    display: block;
    width: 100%,
`;


// form label
export const Label = styled.label`
    display: block;
    font-size: ${props => props.fontSize ?? '13px'};
    font-weight: 500;
    margin-bottom: 5px;
    color: ${props=> props.color ?? "#84888b"};

    & > sup {
        font-size: 14px;
        color: red;
        line-height: 5px;
    }
`;

// radios group
export const RadioGroups = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;

    &:input{
        cursor: pointer;
    }

    & > label{
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
`

export const Input = styled.input`
    width: 100%;
    padding: 8px 16px;
    border: 1px solid lightgrey;
    border-radius: ${props=>props.borderRadius ?? '3px'};
`;

export const FormError = styled.div`
    color: ${props => props.color ?? 'red'};
    display: ${props => props.visible ? 'block' : 'hidden'}
`


export const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Checkbox = styled.input`

`;

