import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import CircularProgress from "@mui/material/CircularProgress";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const getPosts = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8000/api/v1/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await response.json();
    data = await data.posts;
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    data = data.posts;
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? <><div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div></> :
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              getPosts={getPosts}
              isProfile={isProfile}
              getUserPosts={getUserPosts}
            />
          )
        )}
    </>

  );
};

export default PostsWidget;
