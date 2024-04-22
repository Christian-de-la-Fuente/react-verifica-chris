import PropTypes from "prop-types";
function Card(props) {
  return (
    <div className="w-full flex justify-center items-center relative ">
      <div
        className="relative w-3/6 flex flex-col justify-center items-center mt-5 space-y-3 py-5 px-6 rounded-lg"
        style={{ boxShadow: "14px 5px 70px 6px rgba(0,0,0,0.1)" }}>
        {props.children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
export default Card;
