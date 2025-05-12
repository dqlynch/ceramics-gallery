import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 1.1rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const BackArrow = styled.span`
  margin-right: ${props => props.theme.spacing.xs};
  font-size: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const GallerySection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
`;

const MainImage = styled(motion.img)`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  grid-column: span 2;
`;

const ThumbnailImage = styled(motion.img)`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ProductTitle = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const ProductDetailsSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const DetailItem = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

interface Product {
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

interface ProductData {
  [key: number]: Product;
}

const productData: ProductData = {
  1: {
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
  2: {
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
  },
  3: {
    title: 'Blue Vase',
    mainImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format',
      'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=500&auto=format',
      'https://images.unsplash.com/photo-1579783902223-72b171dfe989?w=500&auto=format',
    ],
    dimensions: '20cm x 15cm',
    price: '$120',
    description: 'A beautiful handcrafted blue vase with intricate patterns. Perfect for displaying fresh flowers or as a standalone decorative piece.',
    material: 'Ceramic',
    technique: 'Hand-thrown',
    glazing: 'Matte finish',
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData[Number(id)];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const mainImage = selectedImage || product.mainImage;

  return (
    <DetailsContainer>
      <BackButton to="/shop">
        <BackArrow>←</BackArrow>
      </BackButton>
      <ProductGrid>
        <GallerySection>
          <MainImage
            src={mainImage}
            alt={product.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {product.gallery.map((image: string, index: number) => (
            <ThumbnailImage
              key={index}
              src={image}
              alt={`${product.title} - view ${index + 1}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedImage(image)}
              style={{
                opacity: image === mainImage ? 0.7 : 1,
                cursor: 'pointer',
              }}
            />
          ))}
        </GallerySection>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <Price>{product.price}</Price>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductDetailsSection>
            <DetailItem>
              {product.dimensions} • {product.material}
            </DetailItem>
          </ProductDetailsSection>
        </ProductInfo>
      </ProductGrid>
    </DetailsContainer>
  );
};

export default ProductDetails; 