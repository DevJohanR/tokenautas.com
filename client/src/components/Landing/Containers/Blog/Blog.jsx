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
       {/* <h1 className="gradient__text">Están pasando muchas cosas,<br /> Estamos blogueando sobre esto.</h1>*/} 
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA" onClick={handleArticleClick}>
          <Article imgUrl={blog01} date="" text="Optimiza tu perfil con las mejores prácticas y herramientas de la industria" />
        </div>
        <div className="gpt3__blog-container_groupB">
          <div onClick={handleArticleClick}>
            <Article imgUrl={blog02} date="" text="Tokenautas te conecta con el éxito en plataformas webcam: Más tráfico, más ingresos." />
          </div>
          <div onClick={handleArticleClick}>
            <Article imgUrl={blog03} date="" text="Estrategias personalizadas para agencias y modelos independientes." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
