import './Input.css';

export const Input = ({ type, placeholder, ...props }) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} className='input' {...props} />
    </div>
  );
};
