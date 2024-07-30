// import React from 'react';
// import PropTypes from 'prop-types'; // PropTypes serves as the method you can use to ensure the correct datatype is passed for each prop, meaning whatever is rendered is correct. It can also be used to ensure a value is passed, set default values, and lots more.In plain terms, it is used as a validator to ensure the data your component receives is valid. https://hygraph.com/blog/react-proptypes
// import './GreenBtn.css';

// const GreenBtn = ({ label, onClick, type = 'button', style = {}, disabled = false }) => {
//   return (
//     <button 
//       type={type} 
//       onClick={onClick} 
//       style={style} 
//       disabled={disabled}
//       className="custom-button" //I use this class for custom styling
//     >
//       {label}
//     </button>
//   );
// };

// GreenBtn.propTypes = {
//   label: PropTypes.string.isRequired,
// //   onClick: PropTypes.func.isRequired,
// //   type: PropTypes.oneOf(['button', 'submit', 'reset']),
// //   style: PropTypes.object,
// //   disabled: PropTypes.bool
// };

// export default GreenBtn;


const GreenBtn = ({children}) => {


  return(
    <button className="Greenbtn Green-custom">{children}</button>
  )
}

export default GreenBtn;

