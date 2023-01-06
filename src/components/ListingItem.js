import { Link } from "react-router-dom";

const ListingItem = ({ listing, id }) => {
  return (
    <Link to={`/category${listing.type}/${listing.id}`}>
      <img src={listing.imgUrls[0]} alt="" />
    </Link>
  );
};

export default ListingItem;
