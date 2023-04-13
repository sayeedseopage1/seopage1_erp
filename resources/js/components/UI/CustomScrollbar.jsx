import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children, minH = 100, maxH = "100%", ...props }) => {
    return (
        <Scrollbars
            autoHide={false}
            autoHeight={true}
            autoHeightMin={minH}
            autoHeightMax={maxH}
            {...props}
            renderView={(props) => <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />}
        >
            {children}
        </Scrollbars>
    );
}

export default CustomScrollbar;