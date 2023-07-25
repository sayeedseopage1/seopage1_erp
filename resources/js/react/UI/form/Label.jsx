const Label = ({ label, children, className = "", ...props }) => {
    return (
        <div className="">
            <label className={`d-block ${className}`} {...props}>
                {label}
            </label>
            {children}
        </div>
    );
};

export default Label;
