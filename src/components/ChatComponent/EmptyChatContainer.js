import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100vw;
  height: 88vh;
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  margin-left: 0;
  background-color: #ebf9fb;
`;
const EmptyChatContainer = () => {
    return (
      <StyledContainer />
    );
  };
  
  export default EmptyChatContainer;
