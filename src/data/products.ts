export interface Product {
  id: number;
  title: string;
  mainImage: string;
  gallery: string[];
  dimensions: string;
  price: string;
  description: string;
  material: string;
  video?: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Eclipse Teapot',
    mainImage: '/images/teapot-2/1.jpg',
    gallery: [
      '/images/teapot-2/1.jpg',
      '/images/teapot-2/2.jpg',
    ],
    dimensions: '15cm x 12cm, 350mL',
    price: '$80',
    description: 'Smaller angular teapot. The unglazed outside shows off the beautiful raw clay body of Seattle Pottery Supply\'s Eclipse clay. The inner gallery fits an included 70mm inset stainless steel strainer. Pours really well and is my current goto teapot for a single cup of tea.\nUnglazed outside with Orchid liner glaze inside. Food, microwave, and dishwasher safe.',
    material: 'Stoneware (SPS Eclipse)',
  },
  {
    id: 2,
    title: 'Horse Hair Raku Bud Vases',
    mainImage: '/images/horse-hair-raku-pair/1.jpg',
    gallery: [
      '/images/horse-hair-raku-pair/1.jpg',
      '/images/horse-hair-raku-pair/2.jpg',
      '/images/horse-hair-raku-pair/3.jpg',
      '/images/horse-hair-raku-pair/4.jpg',
      '/images/horse-hair-raku-pair/5.jpg',
    ],
    dimensions: '20cm x 15cm',
    price: '$140',
    description: 'A stunning pair of horse hair raku bud vases, each with unique carbon patterns created through the traditional raku firing process.',
    material: 'Raku clay',
  },
  {
    id: 3,
    title: 'Large Eclipse Teapot',
    mainImage: '/images/teapot-1/1.jpg',
    gallery: [
      '/images/teapot-1/1.jpg',
      '/images/teapot-1/2.jpg',
      '/images/teapot-1/3.jpg',
    ],
    video: '/images/teapot-1/4.mp4',
    dimensions: '20cm x 15cm, 500mL',
    price: '$100',
    description: 'A larger version of the Eclipse teapot, perfect for sharing tea with friends. Features the same beautiful unglazed exterior showing off the raw clay body, with an Orchid liner glaze inside.\nIncludes a 70mm inset stainless steel strainer. Food, microwave, and dishwasher safe.',
    material: 'Stoneware (SPS Eclipse)',
  },
  {
    id: 4,
    title: 'Fluxy Stormy Night Vase',
    mainImage: '/images/fluxy-stormy-night-vase/1.jpg',
    gallery: [
      '/images/fluxy-stormy-night-vase/1.jpg',
      '/images/fluxy-stormy-night-vase/2.jpg',
      '/images/fluxy-stormy-night-vase/3.jpg',
    ],
    dimensions: '25cm x 15cm',
    price: '$120',
    description: 'A dramatic vase featuring the Stormy Night glaze with added flux for extra movement and depth. The glaze creates a beautiful interplay of blues and purples that shift in different lighting.',
    material: 'Stoneware',
  },
  {
    id: 5,
    title: 'Raku Crackle Vase',
    mainImage: '/images/raku-crackle-vase/1.jpg',
    gallery: [
      '/images/raku-crackle-vase/1.jpg',
      '/images/raku-crackle-vase/2.jpg',
      '/images/raku-crackle-vase/3.jpg',
    ],
    dimensions: '18cm x 12cm',
    price: '$95',
    description: 'A striking raku vase with a crackle glaze finish. The crackle pattern creates an elegant texture that catches the light beautifully.',
    material: 'Raku clay',
  },
  {
    id: 6,
    title: 'Textured NaCl Vase',
    mainImage: '/images/textured-nacl-vase/1.jpg',
    gallery: [
      '/images/textured-nacl-vase/1.jpg',
      '/images/textured-nacl-vase/2.jpg',
      '/images/textured-nacl-vase/3.jpg',
    ],
    dimensions: '22cm x 14cm',
    price: '$110',
    description: 'A unique vase featuring a textured surface created through salt firing. The salt vapor creates a distinctive orange-peel texture and subtle color variations.',
    material: 'Salt-fired stoneware',
  },
  {
    id: 7,
    title: 'Stormy Night Small Vase',
    mainImage: '/images/stormy-night-small-vase/1.jpg',
    gallery: [
      '/images/stormy-night-small-vase/1.jpg',
      '/images/stormy-night-small-vase/2.jpg',
    ],
    dimensions: '15cm x 10cm',
    price: '$85',
    description: 'A smaller version of the Stormy Night vase, perfect for single stems or small arrangements. Features the same beautiful blue and purple glaze effects.',
    material: 'Stoneware',
  },
  {
    id: 8,
    title: 'Hummingbird Bud Vase',
    mainImage: '/images/hummingbird-bud-vase/1.jpg',
    gallery: [
      '/images/hummingbird-bud-vase/1.jpg',
      '/images/hummingbird-bud-vase/2.jpg',
    ],
    dimensions: '12cm x 8cm',
    price: '$75',
    description: 'A delicate bud vase inspired by hummingbirds, perfect for single stems or small dried arrangements. Features a subtle texture and warm glaze tones.',
    material: 'Stoneware',
  },
  {
    id: 9,
    title: 'Copper Raku Planter',
    mainImage: '/images/copper-raku-planter/1.jpg',
    gallery: [
      '/images/copper-raku-planter/1.jpg',
      '/images/copper-raku-planter/2.jpg',
    ],
    dimensions: '20cm x 20cm',
    price: '$130',
    description: 'A beautiful raku planter with copper accents. The raku firing process creates unique patterns and colors, while the copper adds a touch of elegance.',
    material: 'Raku clay with copper',
  }
]; 