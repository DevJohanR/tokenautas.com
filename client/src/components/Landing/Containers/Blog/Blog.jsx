import React from 'react';
import Article from '../../Article/Article';
import { blog01, blog02, blog03 } from './imports';
import './blog.css';

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">Están pasando muchas cosas,<br /> Estamos blogueando sobre esto.</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article imgUrl={blog01} date="Mayo 26, 2024" text="Tokenautas y Chaturbate seran aliados. Que opinan las modelos sobre esto?" />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article imgUrl={blog02} date="Mayo 30, 2024" text="GPT-4  y el posicionamiento webcam en las plataformas. Como lo hacen?" />
        <Article imgUrl={blog03} date="Junio 01, 2024" text="GPT-4  y el posicionamiento webcam en las plataformas. Como lo hacen?" />
      </div>
    </div>
  </div>
);

export default Blog;
