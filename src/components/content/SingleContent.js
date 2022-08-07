import "./SingleContent.css";
import { img_300 } from "../../config/config";

const SingleContent = ({ item, title, date, poster }) => {
  return (
    <div className="parent">
      <div className="media">
        <img className="poster" src={`${img_300}/${poster}`} alt={title} />
        <p className="title">{title}</p>
        <span className="subTitle">Movie</span>
        <span className="date">{date}</span>
      </div>
    </div>
  );
};

export default SingleContent;
