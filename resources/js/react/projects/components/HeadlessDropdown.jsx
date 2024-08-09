import { Menu } from "@headlessui/react";

const HeadlessDropdown = () => {
    return (
        <Menu as="div" className="sp1_comment_extend_menu">
            <Menu.Button as="button" className="sp1_comment_extend_menu-btn">
                <i className="fa-solid fa-ellipsis"></i>
            </Menu.Button>
            <Menu.Items
                as="div"
                placement="bottom-end"
                className="sp1_comment_extend_menu__items"
            >
                <Menu.Item
                    as="div"
                    className="sp1_comment_extend_menu__item --disabled"
                >
                    Edit
                </Menu.Item>
                <Menu.Item
                    as="div"
                    className="sp1_comment_extend_menu__item --delete"
                    onClick={(e) => onDelete(e, comment.id)}
                >
                    Delete
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default HeadlessDropdown;
