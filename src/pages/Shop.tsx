import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ShopContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const ShopTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProductCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

const ProductDetails = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-size: 0.9rem;
`;

const ProductPrice = styled.p`
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-size: 0.9rem;
`;

// Sample data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    title: 'Teapot 2',
    image: '/images/teapot-2/PXL_20250509_161010892.jpg',
    dimensions: '15cm x 12cm',
    price: '$120',
  },
  {
    id: 2,
    title: 'Horse Hair Raku Bud Vases',
    image: '/images/horse-hair-raku-pair/PXL_20250503_190720260.PORTRAIT.jpg',
    dimensions: '20cm x 15cm',
    price: '$140',
  }
];

const Shop = () => {
  return (
    <ShopContainer>
      <ShopTitle>Shop</ShopTitle>
      <ProductGrid>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ProductCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductHeader>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductHeader>
                <ProductDetails>{product.dimensions}</ProductDetails>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Shop; 