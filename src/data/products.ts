export interface Product {
  id: number;
  title: string;
  mainImage: string;
  gallery: string[];
  dimensions: string;
  price: string;
  description: string;
  material: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Eclipse Teapot',
    mainImage: '/images/teapot-2/PXL_20250509_161010892.jpg',
    gallery: [
      '/images/teapot-2/PXL_20250509_161010892.jpg',
      '/images/teapot-2/PXL_20250509_160933124.jpg',
    ],
    dimensions: '350mL',
    price: '$80',
    description: 'Angular teapot highlighting the beautiful black raw clay body of Seattle Pottery Supply\'s Eclipse clay. Pours really well and is my current go-to teapot for a single cup of tea.\n\nUnglazed outside with Orchid liner glaze inside. Food, microwave, and dishwasher safe.',
    material: 'Stoneware (SPS Eclipse)',
  },
  {
    id: 2,
    title: 'Horse Hair Raku Bud Vases',
    mainImage: '/images/horse-hair-raku-pair/PXL_20250503_190720260.PORTRAIT.jpg',
    gallery: [
      '/images/horse-hair-raku-pair/PXL_20250503_190720260.PORTRAIT.jpg',
    ],
    dimensions: '5" x 6"',
    price: '$90',
    description: 'A pair of Raku bud vases. These are removed from the kiln at around 1650°F. Horse hair is burned onto the clay while still hot creating the unique carbonized patterns. Raku fired pieces are not fully vitrified so will absorb water over time.\n\nUnglazed. Not food safe.',
    material: 'Lowfire Stoneware (SPS Raku II)',
  }
]; 