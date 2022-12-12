import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';

import './loading-style.css';

function LoadingScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 Cities - Loading...</title>
      </Helmet>
      <div className='loading'>
        <div></div>
      </div>
      <Footer />
    </>
  );
}

export default LoadingScreen;
