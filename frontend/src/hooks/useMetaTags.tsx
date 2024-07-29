import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const useMetaTags = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default useMetaTags;