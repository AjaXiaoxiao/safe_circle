import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictureSmall";

//Container for the overview rectangle
const OverviewContainer = styled.div`
  background-color: #white;
  width: 35%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
`;

//Title styling
const Title = styled.h2`
  text-align: left;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #black;
  margin: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
`;
