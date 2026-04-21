import Notes from './Notes';
import AddNote from './AddNote';
import { useState, useEffect } from 'react';

const Home = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: width > 412 ? 'row' : 'column' }}>
        <div style={{ width: width > 412?'50%': '100%', justifyContent: 'center', display: 'flex' }}>
          <AddNote />
        </div>
        <div style={{ width: width > 412?'50%': '100%' }}>
          <Notes />
        </div>
      </div>
    </>
  )
}

export default Home