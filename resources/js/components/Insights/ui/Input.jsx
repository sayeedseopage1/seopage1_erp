import PropTypes from 'prop-types';

const Input = ({ type="text", name ="", value, onChange, placeholder="" }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="cnx__ins__input"
        />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};



export default Input;