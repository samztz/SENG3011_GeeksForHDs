import BookmarkNav from "../../components/BookmarkNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../reportsTable"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import ReportsTable from "../../components/reportsTable";
import { TextField } from '@material-ui/core';
import { FaStar } from "react-icons/fa";
import { useState } from "react";

import Switch from "./bookmark/ToggleSwitch.js";
import Switch2 from "./bookmark/ToggleSwitch2.js"


const Star = ({ selected = false, StarClicked = (f) => f }) => (
  <FaStar color={selected ? "red" : "grey"} onClick={StarClicked} />
);

function Bookmark() {

  const [firstStar, setfirstStar] = useState(false);
  //........................................
  const [haseError, setShowError] = useState(false);
  const showError = () => {
    setShowError(true);
  };

  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false); 

  return (
  

    <ThemeProvider theme={theme}>

      <Box sx={{ display: 'flex' }}>
        <BookmarkNav />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />

          <div className="search">
            <TextField
              id="outlined-basic"
            
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>

          <br/>

          <div className="row">
            <div className="column">
              <div className="card">
                <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>

              </div>
            </div>

          <div className="column">
            <div className="card">
            <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
            </div>
          </div>
        </div>

          <div className="row" style={{marginTop: 20}}>
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 20}}>
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 20}}>
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
              <div className="intro">
                  <h3>Australia</h3>
                  <h5>15 reports in last 30 days</h5>
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
                  <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                   
                  />
                  <p>Recieve weekly summary of reports via email</p>
                </div>

                <div className="intro">
                  <Switch2
                    isOn={value2}
                    onColor="#EF476F"
                    handleToggle={() => setValue2(!value2)}
                    style={{marginRight:40}}
                    
                   
                  />
                  <p>Recieve weekly predictions via email</p>
                </div>
              </div>
            </div>
          </div>


        </Box>
      </Box>
      

    </ThemeProvider>
  );
}

export default Bookmark 