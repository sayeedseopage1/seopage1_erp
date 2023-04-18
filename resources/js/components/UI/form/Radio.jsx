import './radio.css';

const Radio = ({ name, title, value, onChange, defaultChecked }) => {
    return (
        <label className="d-flex align-items-center gap-1">
            <input
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
                defaultChecked={defaultChecked}
                className='mr-2'
            />
            {title}
        </label>
    )
}


export default Radio;