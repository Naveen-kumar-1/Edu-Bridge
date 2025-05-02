import './TwoStepAuthModal.css'

const  TwoStepAuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Two step Authendication</h2>
        <p>
          {/* Add your actual terms and conditions text here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.
        </p>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default TwoStepAuthModal;
