// api/cnn-news.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

async function handler(req: VercelReq, res: VercelRes) {
  const { category } = req.query;

  if (!category || typeof category !== 'string') {
    return res.status(400).json({
      message: 'Kategori tidak valid',
      data: [],
      total: 0,
    });
  }

  try {
    const response = await fetch(
      `https://berita-indo-api-next.vercel.app/api/cnn-news/${category}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Gagal mengambil data dari API sumber',
        data: [],
        total: 0,
      });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      message: data.message ?? 'success',
      total: data.total ?? data.data?.length ?? 0,
      data: data.data ?? [],
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    res.status(500).json({
      message: 'Proxy API error',
      data: [],
      total: 0,
    });
  }
}

// ✅ EKSPOR DENGAN COMMONJS
export = handler;
