import '../css/Predict.css';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const PredictScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { questionInfo } = useSelector((state) => state.question);
  const navigate = useNavigate();

  // Prediction handle function
  const handlePrediction = () => {
    navigate(`/treatments/${questionInfo._id}`);
  };
  console.log(questionInfo.predictResult.accuracy);
  function getDiagnosisStatus(accuracy) {
    if (accuracy >= 75) {
      return "Highly Reliable Diagnosis";
    } else if (accuracy >= 50) {
      return "Moderately Reliable Diagnosis";
    } else {
      return "Diagnosis May Require Further Analysis";
    }
  }

  function getStatusClass(accuracy) {
    if (accuracy >= 75) {
      return "reliable";
    } else if (accuracy >= 65) {
      return "moderate";
    } else {
      return "uncertain";
    }
  }
  
  
  return (
    <div className="predictContainer">
      <h1 className='skin-condition'>Skin Condition</h1>
      <div className="bodySection">
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
        {questionInfo.predictResult.accuracy < 41.19 ? (
          <div className="information">
            <div className="details issue">
              <p>Your skin is mostly good.</p>
              <p>accuracy: 10.11</p>
            </div>
          </div>
        ) : questionInfo.predictResult.accuracy > 90.11 ? (
          <div className="information">
            <div className="details issue">
              <p>Your skin is mostly good</p>
              <p>accuracy: 14.54</p>
            </div>
          </div>
        ) : (
          <div className='deSection'>
            <div className="information">
              <div className="details issue">
                <div className="new">
                  <p>{questionInfo.predictResult.disease}</p>
                </div>
                <p className={`diagnosis-status ${getStatusClass(questionInfo.predictResult.accuracy)}`}>
  Diagnosis Status - {getDiagnosisStatus(questionInfo.predictResult.accuracy)}
</p>

              </div>
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
                <h5>Pregnant Breast feeding</h5>
                <p>{questionInfo.isPregnantBreastfeeding}</p>
              </div>
              <div className="details">
                <h5>History Of Heart Attacks</h5>
                <p>{questionInfo.hasHistoryOfHeartAttacks}</p>
              </div>
              <div className="predictButton">
              <button onClick={handlePrediction} type="button">
                Check Treatment
              </button>
            </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictScreen;
