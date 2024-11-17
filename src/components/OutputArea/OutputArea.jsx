const OutputArea = ({className, expression, result}) => {
  return (
    <div className = {`${className} d-flex flex-column justify-content-between align-items-end p-1 pb-3`}>
        <span className="fs-6 w-100 text-end text-nowrap overflow-y-hidden">{expression}</span>
        <span className="fs-4 w-100 text-end fw-bold text-nowrap overflow-y-hidden">{result}</span>
    </div>
  )
}

export default OutputArea