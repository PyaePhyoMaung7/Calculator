import Button from "react-bootstrap/Button";

const BasesButton = ({ children = 0, record  }) => {
  return (
    <div style={{height: '100%'}}>
      <Button className="w-100 h-100" variant="dark" onClick={record}>
        {children}
      </Button>
    </div>
  );
};

export default BasesButton;
