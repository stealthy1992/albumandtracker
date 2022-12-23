import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { db, storage } from '../Firebase'
import {collection, addDoc, Timestamp, getDocs, query, QuerySnapshot, onSnapshot, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardMedia  from '@mui/material/CardMedia';
import { toUnitless } from '@mui/material/styles/cssUtils';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit =   (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('title') && data.get('description'))
    {

      addDoc(collection(db, "images"), {
        title: data.get('title'),
        description: data.get('description'),
        imageURL: image
  
      }).then(() => {
        setTitle('')
        setDescription('')
        setIsUploaded(false)
        setSuccessMessage(true)
      })
    }
    else 
    {
      setUNF(true)
    }
    
  };

  const [ successMessage, setSuccessMessage] = useState(false)
  const types = ['image/png' , 'image/jpeg']
  const [fileError, setFileError] = useState(null)
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [file, setFile] = useState(null);
  const [toggle, setToggle] = useState(true)
  const [isUploaded, setIsUploaded] = useState(false)
  const [UNF, setUNF] = useState(false)
  const [title, setTitle ] = useState('')
  const [description, setDescription ] = useState('')
  const [imageURL, setImageURL ] = useState('')

// useEffect(() => {
    
//   },[])

  const changeHandler = async (e) => {
    let selected = e.target.files[0]
    if(selected && types.includes(selected.type))
    {
      setFile(selected)
      setFileError('')
      const imageRef = ref(storage, `images/${selected.name}`)
      
      uploadBytes(imageRef, selected).then(() => {
        console.log('upload done')  
      }).then(() => {
        getDownloadURL(imageRef).then((url) => {
          console.log(url)
          setImage(url)
          setToggle(false)
          setIsUploaded(true)
        })
      })

    }else{
      setFile(null)
      setFileError('Invalid File Format')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddAPhotoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Image Upload
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Image Title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Image Description"
                  name="description"
                  autoComplete="family-name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              
              
              
            </Grid>

            <Button
              variant="outlined"
              fullWidth
              component="label"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={changeHandler}
              />
            </Button>

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {toggle}
            >
              Submit
            </Button>

            {isUploaded && <Card
                  // sx={{ height: '10%' }}
                >
                  <CardMedia
                    component="img"
                    // sx={{
                     
                    //   pt: '10.25%',
                    // }}
                    src={image}
                    // image="https://img.freepik.com/free-photo/beautiful-scenery-road-forest-with-lot-colorful-autumn-trees_181624-30942.jpg?w=2000"
                    alt="random"
                  />
            </Card>}
              
            
          </Box>
        </Box>
        {UNF && <span style={{ color: "red" }} className="row">Image title and description are required</span>}
        {fileError && <span style={{ color: "red" }} className="row">{fileError}</span>}
        {imageError && <span style={{ color: "red" }} className="row">Image is required</span>}
        {successMessage && <span style={{ color: "green" }} className="row">Image uploaded successfully</span>}
      </Container>
    </ThemeProvider>
  );
}