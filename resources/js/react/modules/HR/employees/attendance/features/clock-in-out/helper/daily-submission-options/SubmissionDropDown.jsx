import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import styled from "styled-components";

const SubmissionDropDown = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    const [menuVisible, setMenuVisible] = React.useState(true);

    return (
        <Container>
            <Dropdown onClick={() => setMenuVisible(!menuVisible)}>
                <strong>{selectedCategory?.name ?? "Select a Category"}</strong>
                <span
                    style={{
                        transform: menuVisible
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.5s ease",
                    }}
                >
                    <FaAngleDown size="18px" />
                </span>
            </Dropdown>

            <Menu menuVisible={menuVisible}>
                {categories?.map((option) => (
                    <Item
                        key={option.id}
                        selected={selectedCategory?.id === option.id}
                        onClick={() => {
                            onCategoryChange(option);
                            setMenuVisible(false);
                        }}
                    >
                        <span style={{ marginRight: "30px" }}>
                            {option.name}
                        </span>
                        {selectedCategory?.id === option.id && (
                            <i className="fa-solid fa-check" />
                        )}
                    </Item>
                ))}
            </Menu>
        </Container>
    );
};

export default SubmissionDropDown;

const Container = styled.div`
    margin-bottom: 20px;
`;

const Dropdown = styled.div`
    width: 65%;
    margin-top: 10px;
    height: 45px;
    padding: 10px 15px;
    background-color: #d8edfc;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
`;

const Menu = styled.div`
    width: 65%;
    border-radius: 4px;
    background-color: #d8edfc;
    max-height: ${(props) => (props.menuVisible ? "300px" : "0")};
    overflow-y: auto;
    z-index: 1000;
    transition: max-height 0.5s ease;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
        display: none; // Chrome, Safari, Opera
    }
`;

const Item = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: #d8edfc;
    border-bottom: 1px solid #c1def2;
    margin: 0px 15px;
    color: ${(props) => (props.selected ? "#63bbff" : "initial")};
    font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;
