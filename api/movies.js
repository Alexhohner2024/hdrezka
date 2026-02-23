const axios = require('axios');
const cheerio = require('cheerio');

const REZKA_BASE_URL = process.env.REZKA_BASE_URL || 'https://hdrezka.ag';

module.exports = async (req, res) => {
  try {
    const response = await axios.get(`${REZKA_BASE_URL}/films`);
    const $ = cheerio.load(response.data);

    const items = [];
    $('.b-content-item').each((index, element) => {
      const $element = $(element);
      const titleEl = $element.find('.b-content-item-title a');
      const title = titleEl.text().trim();
      const href = titleEl.attr('href');
      const year = $element.find('.b-content-item-year').text().trim();
      const rating = $element.find('.b-content-item-rating span').text().trim();
      const imgSrc = $element.find('.b-content-item-poster img').attr('src');

      if (title && href) {
        items.push({
          id: `movie-${index + 1}`,
          title: `${title} (${year})`,
          description: `Rating: ${rating}`,
          image: imgSrc.startsWith('//') ? `https:${imgSrc}` : imgSrc,
          action: {
            type: 'link',
            url: href.startsWith('http') ? href : `${REZKA_BASE_URL}${href}`
          }
        });
      }
    });

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
    console.error('Movies API error:', error);
    res.status(500).json({ error: 'Failed to fetch movies from HDRezka' });
  }
};

