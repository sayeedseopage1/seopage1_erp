import styled from 'styled-components'

export const ModalPanel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding:2rem 1rem;
  border-radius: 1rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Icon = styled.div`
  margin-bottom: 1rem;
  & i {
    font-size: 4rem;
    color: #f07c7c;
  }
`;

export const Title = styled.div``
export const Header = styled.div`
  font-size: 1.3rem;
  color: #1d1d1d;
  font-weight: 600;
  margin-bottom: 0.85rem;
`;

export const Text = styled.p`
  font-size: 14px;
  color: #777;
`;