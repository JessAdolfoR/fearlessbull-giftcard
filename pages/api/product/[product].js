import data from './data.json';

export function getProductById(product) {
  console.log(product)
  const item = data.filter((elem) => elem.id === product);
  console.log(item)
  return item;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    const item = getProductById(req.query.product);
    res.status(200).json(item);
  }
}
