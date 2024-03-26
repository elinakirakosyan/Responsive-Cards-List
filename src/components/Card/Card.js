import { useEffect, useState } from "react";
import "./card.css";

const Card = ({ data }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isPopupOpen]);

  return (
    <>
      <div className="card" onClick={handleOpenPopup}>
        <img
          srcSet={`${data.img} 1x, ${data.img_2x} 2x`}
          src={data.img}
          alt="img"
          className="image"
        />
        <span className="tag">{data.tags}</span>
        <span className="title">{data.title}</span>
        <div className="info-block">
          <span className="author">{data.autor}</span>
          <span className="dot"></span>
          <span className="date-view">{data.date}</span>
          <span className="dot"></span>
          <span className="date-view">{data.views}</span>
        </div>
        <span className="text">{data.text}</span>
      </div>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content" onClick={handlePopupClick}>
            <div className="popup-header">
              <h2>{data.title}</h2>
              <span className="close-btn" onClick={handleClosePopup}>
                &times;
              </span>
            </div>
            <p>{data.text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
