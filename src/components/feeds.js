import { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { FeedCard } from "./feedCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  allFeeds: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "60px",
  },
}));

export const Feeds = ({ getLocalStorage, sendReq, loggedIn, setLoggedIn }) => {
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
  useEffect(() => {
    getFeeds();
    setLoggedIn(true);

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
      <div className={classes.allFeeds}>
        {feeds
          ? feeds.map((feed, ind) => (
              <div key={ind} style={{ marginTop: "20px" }}>
                <FeedCard form={feed} />
              </div>
            ))
          : null}
      </div>
    </>
  );
};
