import styled from "styled-components";
import { palette } from "../constants";

type Props = {
  isDisabled?: boolean;
  isDropdownVisible: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
  setIsDropdownVisible: (isVisible: boolean) => void;
  rightIcon: string;
}

const DropdownMenu = () => {

    <Dropdown></Dropdown>

};


const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  left: 0;
  max-height: 200px;
  min-width: 100%;
  outline: ${palette.purple} solid 2px;
  overflow-y: auto;
  position: absolute;
  top: calc(100% - 2px);
  z-index: 10;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export default DropdownMenu;