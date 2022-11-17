import styles from "../styles/Add.module.css";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddButton = ({ setClose }) => {
  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        size="small"
        onClick={() => setClose(false)}
      >
        Add new product
      </Button>
    </div>
  );
};

export default AddButton;
