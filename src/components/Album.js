import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react'
import { db, storage } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import {collection, addDoc, Timestamp, getDocs, updateDoc, doc} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import CircularProgress from '@mui/material/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();




export default function Album() {

const [imageList, setImageList] = useState([])
const navigate = useNavigate()

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ imageLink, setImageLink ] = useState('')
  const types = ['image/png' , 'image/jpeg']
  const [fileError, setFileError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [UNF, setUNF] = useState(false)
  const [ currentImage, setCurrentImage ] = useState({})
  const [file, setFile] = useState(null);
  const [ toggle, setToggle ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(true)

  

  const handleOpen = (imageInfo) => {
    setTitle(imageInfo.title)
    setDescription(imageInfo.description)
    setImageLink(imageInfo.imageURL)

    setCurrentImage({
      title: imageInfo.title,
      description: imageInfo.description,
      imageURL: imageInfo.imageURL
    })
    
    setOpen(true)
  }


  const handleSubmit =   (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('title') && data.get('description'))
    {

      getDocs(collection(db, "images")).then((record) => {
        record.forEach((document) => {
          const temp = document.data()
          if(temp.title === currentImage.title && temp.description === currentImage.description)
          {
            const docRef = doc(db, "images", document.id)
            updateDoc(docRef, {
              title: data.get('title'),
              description: data.get('description'),
              imageURL: imageLink
            }).then(() => {
              setToggle(toggle + 1)
              handleClose()
            })
          
          }
        })
      })

      
      
    }
    else 
    {
      setUNF(true)
    }
    
  };


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
          setImageLink(url)
          // setToggle(false)
          // setIsUploaded(true)
        })
      })

    }else{
      setFile(null)
      setFileError('Invalid File Format')
    }
  }



useEffect(() => {
    imageList.length = 0
    fetchImages()

},[toggle])

const fetchImages = () => {

    getDocs(collection(db, "images")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setImageList(imageList => [...imageList, doc.data()])
        })
    }).then(() => {
      setIsLoading(false)
    })
}


  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Modal here */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {console.log(open.title)} */}
        <Box sx={modalStyle}>
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
            
          </Typography>
          <Box component="form" noValidate 
          onSubmit={handleSubmit} 
          sx={{ mt: 3 }}>
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
            //   disabled = {toggle}
            >
              Submit
            </Button>

            <Card
                 
                >
                  <CardMedia
                    component="img"
                    
                    src={imageLink}
                    
                    alt="random"
                  />
            </Card>
              
            
          </Box>
        </Box>
        {UNF && <span style={{ color: "red" }} className="row">Image title and description are required</span>}
        {fileError && <span style={{ color: "red" }} className="row">{fileError}</span>}
        {imageError && <span style={{ color: "red" }} className="row">Image is required</span>}
      </Container>
        </Box>
      </Modal>

      {/* Modal Ends */}
      {/* {imageList.map(img => console.log(img))} */}
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Image Gallery where you can add your memories
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Add Image</Button>
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        {isLoading ? <CircularProgress /> : <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {imageList.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    src={card.imageURL}
                    // image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small" onClick={() => handleOpen(card)}>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}