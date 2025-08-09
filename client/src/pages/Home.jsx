import React from 'react';
import Logout from '../components/Logout'; 

function Home() {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Welcome to the Homepage!</h1>
        <Logout />
      </header>
      
      <main style={{ padding: '1rem' }}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quia laudantium voluptatibus architecto deleniti neque perspiciatis accusamus voluptatem voluptate, repellendus eaque illo explicabo fugit eos.</p>
        
      </main>
    </div>
  );
}

export default Home;