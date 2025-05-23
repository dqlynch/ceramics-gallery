import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { products } from '../data/products';

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

const ProductCard = styled.div`
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

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

const ProductPrice = styled.p`
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-size: 0.9rem;
`;

const ProductDimensions = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-size: 0.9rem;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
`;

const MotionProductCard = motion(ProductCard);

const Shop = () => {
  return (
    <ShopContainer>
      <ShopTitle>Shop</ShopTitle>
      <ProductGrid>
        {products.map((product) => (
          <MotionProductCard
            key={product.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ProductLink to={`/product/${product.id}`}>
              <ProductImage src={product.mainImage} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>{product.price}</ProductPrice>
                <ProductDimensions>{product.dimensions}</ProductDimensions>
              </ProductInfo>
            </ProductLink>
          </MotionProductCard>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Shop; 