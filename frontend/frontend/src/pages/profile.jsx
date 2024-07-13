import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { AuthContext } from "../AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import {
  Edit as EditIcon,
  Mail as MailIcon,
  Person as PersonIcon,
  VerifiedUser as VerifiedUserIcon
} from "@mui/icons-material";
import Navbar from "../components/navbar";

const PREFIX = "ProfilePage";
const classes = {
  container: `${PREFIX}-container`,
  card: `${PREFIX}-card`,
  avatar: `${PREFIX}-avatar`,
  icon: `${PREFIX}-icon`,
  editButton: `${PREFIX}-editButton`,
  header: `${PREFIX}-header`,
  content: `${PREFIX}-content`,
};

const Root = styled("div")(({ theme }) => ({
  backgroundColor: '	#f9e6f6', // Attractive light blue background color
  minHeight: '100vh',
 
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderColor: 'black',
  backgroundColor: 'rgb(224,247,250)',
  padding: theme.spacing(6),
  maxWidth: '1400px',
  maxHeight: '550px',
  width: '80%',
  height: '70%',
  margin: theme.spacing(4, 0),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));



const ProfilePage = () => {
  // const user = useSelector(state => state.Auth.user);
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  
  
   
   

    

    
  
  

  return (
    <Root>
      <Navbar/> 
      <Container className={classes.container} sx={{ pt: 4, pb: 6, display: 'flex', justifyContent: 'center' }}>
        <StyledCard className={classes.card}>
          <CardHeader
            avatar={
              <Avatar 
                src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg" 
                className={classes.avatar} 
                style={{ width: 100, height: 100, marginBottom: 16 }}
              />
            }
            
          />
          <CardContent>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', marginBottom: 16, fontSize: 35 }}>
                  <PersonIcon className={classes.icon} style={{ marginRight: 8 }} /> User:{auth.username}
                </Typography>
                <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', marginBottom: 16, fontSize: 35 }}>
                  <MailIcon className={classes.icon} style={{ marginRight: 8 }} /> Email: {auth.emailId}
                </Typography>
                <Typography 
                  variant="h5" 
                  className={classes.content} 
                  style={{ display: 'flex', alignItems: 'center', color: auth.role === "admin" ? "green" : "red", marginTop: 32, fontSize: 35 }}
                >
                  <VerifiedUserIcon className={classes.icon} style={{ marginRight: 8 }} /> Admin Status: {auth.role === "admin" ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                <Avatar
                  src="https://static.vecteezy.com/system/resources/previews/036/378/904/non_2x/young-happy-web-ui-ux-designer-working-on-laptop-freelancer-at-work-creating-content-website-development-online-business-internet-marketing-communication-content-manager-illustration-vector.jpg"
                  alt="Web designer at work"
                  className="rounded-full shadow-md"
                  style={{ width: 300, height: 300, marginBottom: 16 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </Root>
  );
};

export default ProfilePage;
