const FormCheckbox = ({ label, name, size }) => {
    return (
        <div className="form-control items-center">
            <label htmlFor={name} className="label cursor-pointer">
                <span className="label-text">{label}</span>
            </label>
            <input
                type="checkbox"
                name={name}
                defaultChecked={false}
                className={`checkbox checkbox-primary ${size}`}
            />
        </div>
    );
};
export default FormCheckbox;
