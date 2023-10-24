import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  console.log(image)
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:8000/assests/${image}`}
      />
    </Box>
  );
};

export default UserImage;
// public / assests / WIN_20221023_22_48_41_Pro.jpg