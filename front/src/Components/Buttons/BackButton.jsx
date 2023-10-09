import "../Buttons/BackButton.css"

const BackButton = ({ handleBack }) => {
    return (
      <div className='button-box'>
        <button className="button_back" onClick={handleBack}>
          <div className="button-box"> 
            <svg className="button-elem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" stroke="#F0EEEF" strokeWidth="2" d="M2 12 L22 12 M12 22 L22 12 L12 2"></path>
            </svg>
          </div>
        </button>
      </div>
    );
  }
  
  export default BackButton;