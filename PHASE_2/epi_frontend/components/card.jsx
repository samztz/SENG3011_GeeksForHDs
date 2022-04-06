import Switch from '@mui/material/Switch';
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Star = ({ selected = false, StarClicked = (f) => f }) => (
  <FaStar style={{marginTop:5, marginRight:-100}} color={selected ? "red" : "grey"} onClick={StarClicked} />
);


function Card_display(props) {

  const country = props.country;

  const [firstStar, setfirstStar] = useState(false);

  const showError = () => {
    setShowError(true);
  };


  const [isOpen, setIsOpen] = useState(false);
  const [haseError, setShowError] = useState(false);

  return (
    <div className="CardProps">
      <div className="intro">
        <h3>{country}</h3>
        <h5 style={{marginTop:5}}>15 reports in last 30 days</h5>
        <Star
        selected={firstStar}
        StarClicked={() => {
        if (firstStar) showError(1);
          setfirstStar(true);
        }}
        />
      </div>
      <br/>
      <div className="intro">
        <Switch {...label} defaultChecked />
        <p>Recieve weekly summary of reports via email</p>
      </div>

      <div className="intro">
        <Switch {...label} defaultChecked />
        <p>Recieve weekly predictions via email</p>
      </div>
    </div>

  );

};

export default Card_display