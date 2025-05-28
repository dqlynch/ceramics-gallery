export interface Product {
  id: number;
  title: string;
  mainImage: string;
  gallery: string[];
  dimensions: string;
  price: string;
  description: string;
  material: string;
  videos?: string[];
  firing_type: string;
  sold?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Eclipse Teapot',
    mainImage: '/images/teapot-2/1.jpg',
    gallery: [
      '/images/teapot-2/1.jpg',
      '/images/teapot-2/2.jpg',
      '/images/teapot-2/3.jpg',
      '/images/teapot-2/4.jpg',
    ],
    videos: [
      '/images/teapot-2/5.mp4',
      '/images/teapot-2/6.mp4',
    ],
    dimensions: '350mL',
    price: '$80',
    description: 'Smaller angular teapot. The unglazed outside shows off the beautiful raw clay body of Seattle Pottery Supply\'s Eclipse clay. The inner gallery fits an included 75mm inset stainless steel strainer. Pours really well and is my current goto teapot for a single cup of tea.\n\nUnglazed outside with Orchid liner glaze inside. Food, microwave, and dishwasher safe.',
    material: 'Stoneware (SPS Eclipse)',
    firing_type: '∆5',
    sold: true,
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
    videos: [
      '/images/horse-hair-raku-pair/6.mp4',
    ],
    dimensions: '6" x 6"',
    price: '$90',
    description: 'A pair of bud vases. I made these as part of a Raku workshop with SPS. The pieces were removed from the kiln while still hot—around 1600F—and then horse hair was manually burned onto the surface. The resulting soot is trapped in the clay and leaves unique patterns.\n\nRaku pieces are not fully vitrified and are not food safe. The clay will absorb water slowly over time.',
    material: 'Stoneware (SPS Raku II)',
    firing_type: 'Raku Firing',
  },
  {
    id: 3,
    title: 'Carribean Teapot',
    mainImage: '/images/teapot-1/1.jpg',
    gallery: [
      '/images/teapot-1/1.jpg',
      '/images/teapot-1/2.jpg',
      '/images/teapot-1/3.jpg',
      '/images/teapot-1/5.jpg',
    ],
    videos: [
      '/images/teapot-1/4.mp4',
      '/images/teapot-1/6.mp4',
    ],
    dimensions: '500mL',
    price: '$60',
    description: 'A medium sized teapot, perfect for sharing tea or having a couple cups. The outside is left unglazed to show off the smooth, rich brown clay body, and to contrast the bright Carribean liner glaze. The inner gallery fits an included 75mm inset stainless steel strainer.\n\nFood, microwave, and dishwasher safe.',
    material: 'Stoneware (Klamath Brown)',
    firing_type: '∆5',
    sold: true,
  },
  {
    id: 8,
    title: 'Hummingbird Bud Vase',
    mainImage: '/images/hummingbird-bud-vase/1.png',
    gallery: [
      '/images/hummingbird-bud-vase/1.png',
      '/images/hummingbird-bud-vase/2.png',
    ],
    dimensions: '5" x 4.5"',
    price: '$75',
    description: 'A pale blue bud vase with a carved hummingbird. The hummingbird was carved into the greenware after trimming, and then underglazed between two bisque firings. A mix of three celadon glazes was applied separately to each part of the hummingbird to get the final coloring. You can still see and feel the carved texture through the celadon glazes.\n\nFood, microwave, and dishwasher safe.',
    material: 'Porcelain (Dove)',
    firing_type: '∆5',
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
    videos: [
      '/images/raku-crackle-vase/4.mp4',
      '/images/raku-crackle-vase/5.mp4',
      '/images/raku-crackle-vase/6.mp4',
    ],
    dimensions: '5" x 6"',
    price: '$50',
    description: 'Another vase made during SPS\'s Raku workshop. This was made with a white crackle glaze. The piece is removed from the kiln while still hot. We blow on the glaze, rapidly cooling it and creating cracks as it shrinks. It\'s then placed in a reduction environment with combustible materials to finish cooling. The soot produced in the reduction environment is trapped in the clay, adding a smokey contrast in the web of cracks across the surface.\n\nRaku pieces are not fully vitrified and are not food safe. The clay will absorb water slowly over time.',
    material: 'Stoneware (SPS Raku II)',
    firing_type: 'Raku Firing',
    sold: true,
  },
  {
    id: 9,
    title: 'Copper Raku Planter',
    mainImage: '/images/copper-raku-planter/1.jpg',
    gallery: [
      '/images/copper-raku-planter/1.jpg',
      '/images/copper-raku-planter/2.jpg',
      '/images/copper-raku-planter/3.jpg',
      '/images/copper-raku-planter/4.jpg',
    ],
    videos: [
      '/images/copper-raku-planter/5.mp4',
      '/images/copper-raku-planter/6.mp4',
    ],
    dimensions: '3.5" x 5.5"',
    price: '$45',
    description: 'A small planter created during SPS\'s Raku workshop. The piece is removed from the kiln while still hot and placed directly into a reduction environment. The smoke interacts with the molten copper glaze to create interesting patterns. This planter has a hole at the bottom for drainage.\n\nNot food safe due to the copper glaze.',
    material: 'Stoneware (SPS Raku II), Copper glaze',
    firing_type: 'Raku Firing',
    sold: true,
  },
  {
    id: 10,
    title: 'Tall Bud Vase',
    mainImage: '/images/tall-bud-vase/1.jpg',
    gallery: [
      '/images/tall-bud-vase/1.jpg',
      '/images/tall-bud-vase/2.jpg',
    ],
    dimensions: '11" x 5"',
    price: '$50',
    description: 'A taller bud vas with a tapering narrow neck. Enough room for a couple small stems. You\'ll have to imagine it with some fresher flowers!\n\nFood, microwave, and dishwasher safe.',
    material: 'Porcelain (Dove)',
    firing_type: '∆5',
  },
  {
    id: 4,
    title: 'Stormy Night Bowl',
    mainImage: '/images/fluxy-stormy-night-bowl/1.jpg',
    gallery: [
      '/images/fluxy-stormy-night-bowl/1.jpg',
      '/images/fluxy-stormy-night-bowl/2.jpg',
      '/images/fluxy-stormy-night-bowl/3.jpg',
    ],
    dimensions: '5" x 8"',
    price: '$25',
    description: 'Large dark blue bowl with flux splattered on the rim. The flux drips and interacts with the base Stormy Night glaze during firing, creating interesting and dynamic patterns. It came out a bit oblong, but serves as a great decorative pot around a nursery pot or serving bowl.\n\nFood, microwave, and dishwasher safe.',
    material: 'Stoneware (Klamath Brown)',
    firing_type: '∆5',
    sold: true,
  },
  {
    id: 7,
    title: 'Small Stormy Night Vase',
    mainImage: '/images/stormy-night-small-vase/1.jpg',
    gallery: [
      '/images/stormy-night-small-vase/1.jpg',
      '/images/stormy-night-small-vase/2.jpg',
    ],
    dimensions: '4" x 3.5"',
    price: '$30',
    description: 'A small flower vase. An early piece of mine but maybe the first form I was proud of. Some spiral cracking on the bottom, but still water-tight.\n\nFood, microwave, and dishwasher safe.',
    material: 'Stoneware (SPS Sea Mix 6)',
    firing_type: '∆5',
    sold: true,
  },
  {
    id: 6,
    title: 'Textured Vase',
    mainImage: '/images/textured-nacl-vase/1.jpg',
    gallery: [
      '/images/textured-nacl-vase/1.jpg',
      '/images/textured-nacl-vase/2.jpg',
      '/images/textured-nacl-vase/3.jpg',
    ],
    dimensions: '4.5" x 4"',
    price: '$20',
    description: 'Vase with an unglazed textured surface. Sodium silicate is applied to the piece on the wheel, drying the outside surface. The vase is then shaped from the inside, expanding and cracking the outer layer to create the distinctive cracked-mud surface.\n\nNot food safe due to the metallic outer glaze.',
    material: 'Stoneware (Klamath Brown)',
    firing_type: '∆5',
  },
  {
    id: 11,
    title: 'Tradescantia 1',
    mainImage: '/images/tradescantia-orchid/1.jpg',
    gallery: [
      '/images/tradescantia-orchid/1.jpg',
      '/images/tradescantia-orchid/2.jpg',
    ],
    dimensions: '3" x 3.5"',
    price: '$20',
    description: 'My first finished piece! A small vessel (no drainage) with a light purple, slightly crazed glaze. Comes with some Tradescantia Zebrina happily growing inside.\n\nFood, microwave, and dishwasher safe.\n\nPlant care: water when dry, as much light you can get it. Very easy plant and grows/roots extremely quickly.',
    material: 'Stoneware (SPS Sea Mix 6)',
    firing_type: '∆5',
    sold: true,
  }
]; 