import "./SingleContent.css";
import { img_300 } from "../../config/config";
import ContentModal from "../contentModal/Modal";

const SingleContent = ({ item, title, date, poster, id }) => {
  return (
    <ContentModal id={id}>
      <div className="parent">
        <div className="media">
          <img className="poster" src={`${img_300}/${poster}`} alt={title} />
          <p className="title">{title}</p>
          <span className="subTitle">Movie</span>
          <span className="date">{date}</span>
        </div>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
