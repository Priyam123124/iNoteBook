import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {
  
  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '50%', justifyContent: 'center', display: 'flex'}}>
        <AddNote/>
      </div>
      <div style={{width: '50%'}}>
        <Notes/>
      </div>
    </div>
    </>
  )
}

export default Home