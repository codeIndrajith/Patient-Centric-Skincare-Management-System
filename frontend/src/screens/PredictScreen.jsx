import '../css/Predict.css';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const PredictScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { questionInfo } = useSelector((state) => state.question);
  const skinIssuesArray = JSON.parse(questionInfo.skinIssues[0]);
  const navigate = useNavigate();

  // Prediction handle function
  const handlePrediction = () => {
    navigate('/treatments');
  };
  return (
    <div className="predictContainer">
      <div className="bodySection">
        <div>
          <h4>
            Hey <strong>{userInfo.name}</strong>! Do you want to check you skin
          </h4>
        </div>
        <div className="imageSkin">
          {questionInfo.skinImage ? (
            <img
              className="skinImage"
              src={questionInfo.skinImage}
              alt="Skin Image"
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className="information">
          <div className="details">
            <h5>Age</h5>
            <p>{questionInfo.age}</p>
          </div>
          <div className="details">
            <h5>Skin Type</h5>
            <p>{questionInfo.skinType}</p>
          </div>
          <div className="details">
            <h5>Allergies</h5>
            <p>{questionInfo.allergies}</p>
          </div>
          <div className="details">
            <h5>Skin Issues</h5>
            <p>
              {Array.isArray(skinIssuesArray)
                ? skinIssuesArray.join(', ')
                : 'No skin issues available'}
            </p>
          </div>
          <div className="details">
            <h5>Pregnant Breast feeding</h5>
            <p>{questionInfo.isPregnantBreastfeeding}</p>
          </div>
          <div className="details">
            <h5>History Of Heart Attacks</h5>
            <p>{questionInfo.hasHistoryOfHeartAttacks}</p>
          </div>
        </div>
        <div className="predictButton">
          <button onClick={handlePrediction} type="button">
            Check Treatment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictScreen;
