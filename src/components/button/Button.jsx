import './Button.css';

export const Button = ({ children, onClickButton, ...props }) => {
  return (
    <button className="button" onClick={onClickButton} {...props}>
      {children}
    </button>
  );
};
