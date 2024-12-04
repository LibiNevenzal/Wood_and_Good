import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface HomeProps {}

const Home: FC<HomeProps> = () => {
   return(
      <div>
      <h1>wood and good</h1>
      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none' }}>
          <li style={{ margin: '0 10px' }}>
            <Link to="/knowledge">ידע על עץ</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/order">להזמנה</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/images">תמונות של מוצרים קיימים</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/cart">הסל שלי</Link>
          </li>
        </ul>
      </nav>
      </div>
       );
}


export default Home;
