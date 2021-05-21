import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { grey, red } from "@material-ui/core/colors";
import Send from "@material-ui/icons/Send";
import Publish from "@material-ui/icons/Publish";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useForm } from "../hooks/useform";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    // maxWidth: 345,
    // opacity: "1",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  input: {
    display: "none",
  },
  upload: {
    margin: "auto",
    width: "90%",
    height: "100px",
    border: "2.5px dashed gray",
    color: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      border: "2.5px dashed black",
      color: "black",
    },
  },
  textarea: {
    width: "100%",
  },
}));

export const PostCard = ({
  openModal,
  setOpenModal,
  username,
  sendReq,
  getLocalStorage,
}) => {
  Modal.setAppElement("#root");
  const classes = useStyles();
  const [form, setForm] = useState({
    username: username,
    caption: "",
    img: "",
  });
  const filePicker = useRef();
  const [token, setToken] = useState(getLocalStorage("jtoken"));

  useEffect(() => {
    console.log(form.img);
  }, [form]);

  const onUpload = (e) => {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        setForm({
          ...form,
          img: event.target.result,
        });
      };
    }
  };

  const postForm = async () => {
    const response = await sendReq("api/uploadForm", { ...form, token: token });

    if (response.ok) {
      setForm({
        username: username,
        img: "",
        caption: "",
      });
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          //   backgroundColor: "grey",
          //   opacity: "0.7",
        },
        content: {
          margin: "auto",
          border: "1px solid #ccc",
          background: "grey",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
          width: "400px",
          height: "400px",
        },
      }}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {form.username[0].toUpperCase()}
            </Avatar>
          }
          title={form.username}
        />
        <CardMedia
        //   className={classes.media}
        >
          <div className="upload">
            <button
              type="button"
              onClick={() => filePicker.current.click()}
              className={classes.upload}
            >
              <Publish />
              Upload Image
            </button>
            <input
              type="file"
              ref={filePicker}
              onChange={onUpload}
              className={classes.input}
            />
          </div>
        </CardMedia>
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Caption"
            multiline
            rows={4}
            value={form.caption}
            variant="outlined"
            className={classes.textarea}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={postForm}>
            <Send />
          </IconButton>
        </CardActions>
      </Card>
    </Modal>
  );
};
