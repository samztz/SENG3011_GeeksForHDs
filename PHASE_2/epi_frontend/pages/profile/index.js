import AccountNav from "../../components/accountNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import ReportsTable from "../../components/reportsTable";
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import { CardMedia } from "@mui/material";
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { Input } from 'react-input-component';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
import { SetIntegrityLevel } from "es-abstract";


const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function Profile() {
  //const [loading, setLoading] = useState(false)
  const [person, setPerson] = useState(null)
  const [subtitle, setSubtitle] = useState('random person')
  const [title, setTitle] = useState('name')

  const [name, setName] = useState('...') 


  const [password, old_password] = useState('Medium');
  const [original_password, new_password] = useState('Medium');
  const [original_new_password, set_new_password_again] = useState('Medium');

  
  const handleInfo = (e) => {
    if (e.target.classList.contains('icon')) {
      const info = e.target.dataset.label
      setSubtitle(info)
      // Hard coding for now ....................
      if (info == 'name') {
        setTitle("Jim Ray")
      }
      if (info == 'email') {
        setTitle('214830042@google.mail')
      }
      if (info == 'age') {
        setTitle('40')
      }
      if (info == 'address') {
        setTitle('the seventh avenue')
      }
      if (info == 'phone') {
        setTitle('283249245-324')
      }
      if (info == 'password') {
        setTitle('1489493i539qvv2543')
      }
      
    }
  }

  
  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ display: 'flex' }}>
      <Dashnav pageName={'Profile'} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

      </Box>
    </Box>
    

    <section className='profileCard' style={{marginLeft: 300}}>
      <h1>Personal Detail</h1>
      <div className='blue-bg'></div>
      <div className='profile-img'>
        <img
          src={(person && person.photo) || Profile.defaultProps.image}
          alt='Random user'
          className='profile-photo'
        />
      </div>
      <br/>
      <br/>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <div className='profile-info'>
        <div className='person-info text-center'>
          <p>My {subtitle || ProfileCard.defaultProps.subtitle} is</p>
          <h3>{title || ProfileCard.defaultProps.title}</h3>
        </div>
        <div className='icons'>
          <button className='icon' data-label='name' onMouseOver={handleInfo}>
            <FaUser />
          </button>
          <button className='icon' data-label='email' onMouseOver={handleInfo}>
            <FaEnvelopeOpen />
          </button>
          <button className='icon' data-label='age' onMouseOver={handleInfo}>
            <FaCalendarTimes />
          </button>
          <button
            className='icon'
            data-label='address'
            onMouseOver={handleInfo}
          >
            <FaMap />
          </button>
          <button className='icon' data-label='phone' onMouseOver={handleInfo}>
            <FaPhone />
          </button>
          <button
            className='icon'
            data-label='password'
            onMouseOver={handleInfo}
          >
            <FaLock />
          </button>
        </div>
        

      </div>
      <div className="Delete_button">

      <Button style={{marginRight: 20}} variant="outlined" color="error">
        Edit Profile
      </Button>
      </div>

      <br/>

    </section>
    <br/>
    <section className='profileCard' style={{marginLeft: 300}}>
    <box style={{display:"flex", justifyContent: "center",
    alignItems: "center",}}>
    <div>
        <h1>Account Setting</h1>

        <h5>Change password</h5>
        <form onSubmit={event =>{
          alert("This person's password now is now updated!");
        }}>
            <label>
                <div>
                    <p >Enter old password:</p>
                    <input type="password" value={password} onChange={event => old_password(event.target.value)} />
                </div>
                <div>
                    <p>Enter new password:</p>
                    <input type="password" value={original_password} onChange={event => new_password(event.target.value)} />
                </div>
                <div>
                    <p>Enter new password again:</p>
                    <input type="password" value={original_new_password} onChange={event => set_new_password_again(event.target.value)} />
                </div>

            </label>
            <input type="submit" value="Change password"/>
        </form>
    </div>
    
    </box>

    <br/>

    <div className="Delete_button">
      <h2 style={{marginRight: 750}}>Delete account</h2>  

  
      <Button style={{marginRight: 20}} variant="outlined" color="error">
        Delete
      </Button>
    </div>

    </section>
    </ThemeProvider>

  )
 
}

Profile.propTypes = {
  image: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

Profile.defaultProps = {
  image: defaultImage,
  subtitle: 'default info',
  title: 'default value',
}


export default Profile 









