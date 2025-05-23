export interface Product {
  id: number;
  title: string;
  mainImage: string;
  gallery: string[];
  dimensions: string;
  price: string;
  description: string;
  material: string;
  technique: string;
  glazing: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Teapot 2',
    mainImage: '/images/teapot-2/PXL_20250509_161010892.jpg',
    gallery: [
      '/images/teapot-2/PXL_20250509_161010892.jpg',
      '/images/teapot-2/PXL_20250509_160933124.jpg',
    ],
    dimensions: '15cm x 12cm',
    price: '$120',
    description: 'A beautifully crafted teapot with a unique glaze pattern. The ergonomic handle and spout design ensures a perfect pour every time.',
    material: 'Stoneware (SPS Eclipse)',
    technique: 'Hand-thrown',
    glazing: 'Custom glaze blend',
  },
  {
    id: 2,
    title: 'Horse Hair Raku Bud Vases',
    mainImage: '/images/horse-hair-raku-pair/PXL_20250503_190720260.PORTRAIT.jpg',
    gallery: [
      '/images/horse-hair-raku-pair/PXL_20250503_190720260.PORTRAIT.jpg',
    ],
    dimensions: '20cm x 15cm',
    price: '$140',
    description: 'A stunning pair of horse hair raku bud vases, each with unique carbon patterns created through the traditional raku firing process.',
    material: 'Raku clay',
    technique: 'Raku firing with horse hair',
    glazing: 'Natural carbon patterns',
  }
]; 