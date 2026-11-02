import Link from "next/link";

import "./Category.css";

const Category = ({ id, categoryName, image, href }) => {
  return (
    <Link href={href} className="category-item" key={id}>
      <p className="category-item__heading">{categoryName}</p>
      <img
        src={image.src}
        alt={categoryName}
        className="category-item__image"
      />
    </Link>
  );
};

export default Category;
