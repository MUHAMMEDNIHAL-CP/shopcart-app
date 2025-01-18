import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "90px auto",
    borderColor: "purple",
  };

const Spinner = ({loading, color = "purple" }) => {
  return (
    <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={450}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner

