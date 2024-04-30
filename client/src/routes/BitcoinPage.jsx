// src/routes/BitcoinPage.jsx
import React from 'react';
import Bitcoin from '../components/Plataformas/Bitcoin/Bitcoin';
import Menu from '../components/Dashboard/Menu/Menu';

const BitcoinPage = () => {
  return (
    <div className='bitcoinPage'>
       <Menu/>
      <Bitcoin />
    </div>
  );
};

export default BitcoinPage;
