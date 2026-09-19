import  { createContext } from "react";
import Story from "./Story";
import Postz from "./Postz";
import "../App.css";


export const usercontext=createContext()

function Feed() {
  return (
    <div className="feed">
      <h1></h1>
      <div className="story">
          <Story />
      </div>

      <div className="posts">
        <Postz />
      </div>
    </div>
  );
}

export default Feed;