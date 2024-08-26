import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlogs = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: localStorage.getItem("userId"),
      });
      return res.data;
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      console.log(data);
      navigate("/blogs");
    } catch (err) {
      console.error("Error on submit:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="80%"
        >
          <Typography
            padding={3}
            color="grey"
            variant="h2"
            textAlign="center"
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            name="description"
            onChange={handleChange}
            minRows={10}
            value={inputs.description}
            style={{ width: '100%', margin: 'auto', borderRadius: '4px' }}
          />
          <InputLabel sx={labelStyles}>
            Image URL
          </InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
