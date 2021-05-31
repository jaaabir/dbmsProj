import { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { FeedCard } from "./feedCard";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { Error } from "./error";

const useStyles = makeStyles((theme) => ({
  allFeeds: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "60px",
  },
}));

export const Feeds = ({
  getLocalStorage,
  sendReq,
  loggedIn,
  setLoggedIn,
  setFirst,
  first,
}) => {
  const classes = useStyles();
  const [feeds, setFeeds] = useState([]);
  const getFeeds = async () => {
    const token = getLocalStorage("jtoken");
    if (token) {
      console.log("token is " + token);
      const response = await sendReq("api/feeds", { token: token });

      if (response === undefined || !response.ok) {
        window.location.replace("/login");
      }
      const res = await response.json();
      setFeeds(res.feeds);
    } else window.location.replace("/login");
  };

  console.log("opened first time : " + first);
  useEffect(() => {
    getFeeds();
    setLoggedIn(true);
    setFirst(false);
    // return () => {
    //   setFeeds({});
    // };
  }, []);
  return (
    <>
      <Navbar
        title="global feeds"
        getLocalStorage={getLocalStorage}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        sendReq={sendReq}
      />
      {first ? (
        <Error type="info" msg={`Welcome ${getLocalStorage("jusername")}`} />
      ) : null}
      <div className={classes.allFeeds}>
        {feeds ? (
          feeds.map((feed, ind) => (
            <div key={ind} style={{ marginTop: "20px" }}>
              <FeedCard form={feed} />
            </div>
          ))
        ) : (
          // <CircularProgress />
          <h3>hmmm looks like there's no feeds</h3>
        )}
      </div>
    </>
  );
};
