import styled from 'styled-components';


export const StartTimerWorkingReport = () => {
    return(
       <div>
            {/* <Title>You haven't submitted the last day's working report.</Title>
            <Text> Do you want to submit the working report?</Text>
            <Note><strong>Note:</strong> If you didn't submit last day's working report, you won't be able to start the timer</Note>
            */}
            <Title>You haven't clocked in today.</Title>
            <Text> Do you want to clock in now?</Text>  
       </div>
    )
}


const Title = styled.h1`
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const Text = styled.p`
    font-size: 1.1rem;
    color: #ee3f07;
`

const Note = styled.p`
    font-size: 13px;
    margin-top: 5px;
    color: rgb(0 0 0 / 50%);
    & > strong{
        color:  #ee3f07;;
    }
`;
