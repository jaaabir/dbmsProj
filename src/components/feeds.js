import { useState, useEffect } from "react";

export const Feeds = ({ getLocalStorage, sendReq }) => {
  const [feeds, setFeeds] = useState([]);
  const [username, setUsername] = useState(getLocalStorage("jusername"));
  const getFeeds = async () => {
    const token = getLocalStorage("jtoken");
    if (token) {
      console.log("token is " + token);
      const response = await sendReq("api/feeds", { token: token });

      if (!response.ok || response === undefined) {
        window.location.replace("/login");
      }
      const res = await response.json();
      setFeeds(res.feeds);
    } else window.location.replace("/login");
  };
  useEffect(() => {
    getFeeds();
    console.log("in the feeds page");
  }, []);
  return (
    <>
      <div>
        <h2>Welcome {username}</h2>
      </div>
    </>
  );
};
