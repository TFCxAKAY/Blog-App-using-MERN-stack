import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import Box from "@mui/material/Box";
import config from "../config/config";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  const handleDelete = (blogId) => {
    axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`).then(() => {
      sendRequest().then((data) => setUser(data.user));
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px auto",
        width: "80%",
      }}
    >
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <Blogs
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={user.name}
            />
            <img
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              src={blog.image}
              alt={blog.title}
            />
            <DeleteButton blogId={blog._id} onDelete={handleDelete} />
          </Box>
        ))}
    </Box>
  );
};

export default UserBlogs;
