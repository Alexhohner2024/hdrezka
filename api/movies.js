const REZKA_BASE_URL =
  process.env.REZKA_BASE_URL || 'https://example-hdrezka-mirror.com';

/**
 * Vercel serverless function: /api/movies
 *
 * Returns a minimal MSX Content Root Object with a demo list of movies.
 * Later, the placeholder data should be replaced by real scraping of HDRezka.
 */
module.exports = async (req, res) => {
  try {
    // TODO: replace this placeholder with real HTML fetching & parsing from REZKA_BASE_URL.

    const items = [
      {
        id: 'demo-movie-1',
        title: 'Demo Movie 1',
        description: 'Demo description for Movie 1 (replace with real HDRezka data).',
        image: 'https://via.placeholder.com/300x450?text=Demo+Poster+1',
        action: {
          type: 'link',
          url: `${REZKA_BASE_URL}/films/demo-movie-1`
        }
      },
      {
        id: 'demo-movie-2',
        title: 'Demo Movie 2',
        description: 'Demo description for Movie 2 (replace with real HDRezka data).',
        image: 'https://via.placeholder.com/300x450?text=Demo+Poster+2',
        action: {
          type: 'link',
          url: `${REZKA_BASE_URL}/films/demo-movie-2`
        }
      }
    ];

    const content = {
      name: 'HDRezka Movies',
      version: '1.0.0',
      type: 'list',
      template: {
        type: 'content',
        layout: 'poster',
        width: 1,
        height: 1
      },
      items
    };

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(content);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Movies API error:', error);
    res.status(500).json({ error: 'Movies API internal error' });
  }
};

