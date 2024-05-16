const FormSelect = ({ label, name, list, defaultValue, size }) => {
    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text'>{label}</span>
        </label>
        <select
          name={name}
          id={name}
          className={`select select-bordered ${size}`}
          defaultValue={defaultValue}
        >
          {list.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  export default FormSelect;
  