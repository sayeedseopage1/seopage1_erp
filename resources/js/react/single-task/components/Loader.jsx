const Loader = () => {
  return (
        <div className='d-flex align-items-center'>
            <div
                className="spinner-border text-dark mr-2"
                role="status"
                style={{
                    width: "16px",
                    height: "16px",
                    border: "0.14em solid rgba(0, 0, 0, .25)",
                    borderRightColor: "transparent",
                }}
            /> 
            <span>Loading...</span>
        </div>
  )
}

export default Loader;