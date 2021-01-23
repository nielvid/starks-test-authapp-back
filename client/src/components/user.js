import React from "react";
import axios from 'axios'
import "./styles.css";

export default function App() {
  const [posts, setPosts] = React.useState(null)

  const [postToShow, setPostToShow] = React.useState([])

  const limit = 10;

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => setPosts(res.data))
    .catch(err => console.log({err}))
  })

  function handleClick(pageNumber) {
    const skip = limit * pageNumber
    if(pageNumber === 1) {
      setPostToShow(posts.slice(0, limit))
      return
    }
    setPostToShow(posts.slice(skip, skip + limit))
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {postToShow?.map((post, i) => (
        <h4 key={i}>{post.id} {post.title}</h4>
      ))}

      <ul>
        <li onClick={() => handleClick(1)}>1</li>
        <li onClick={() => handleClick(2)}>2</li>
        <li onClick={() => handleClick(3)}>3</li>
      </ul>
    </div>
  );
}
