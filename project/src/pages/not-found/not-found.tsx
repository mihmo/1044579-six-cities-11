import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 Cities - Not Found</title>
      </Helmet>
      <section className="container" style={{textAlign: 'center'}}>
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
      <Footer />
    </>
  );
}

export default NotFound;
