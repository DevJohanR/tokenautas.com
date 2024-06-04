import React from 'react';
import Article from '../../Article/Article';
import { blog01, blog02, blog03 } from './imports';
import './blog.css';
import Swal from 'sweetalert2';

const Blog = () => {
  const handleArticleClick = () => {
    Swal.fire({
      title: 'Blog en desarrollo',
      text: 'Este artículo está en desarrollo. ¡Vuelve pronto para más contenido!',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">Están pasando muchas cosas,<br /> Estamos blogueando sobre esto.</h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA" onClick={handleArticleClick}>
          <Article imgUrl={blog01} date="Mayo 26, 2024" text="Tokenautas y Chaturbate seran aliados. Que opinan las modelos sobre esto?" />
        </div>
        <div className="gpt3__blog-container_groupB">
          <div onClick={handleArticleClick}>
            <Article imgUrl={blog02} date="Mayo 30, 2024" text="GPT-4  y el posicionamiento webcam en las plataformas. Como lo hacen?" />
          </div>
          <div onClick={handleArticleClick}>
            <Article imgUrl={blog03} date="Junio 01, 2024" text="Estrategias Innovadoras para el Posicionamiento de Modelos Webcam con GPT-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
