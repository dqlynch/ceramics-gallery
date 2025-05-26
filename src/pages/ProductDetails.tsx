import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { products } from '../data/products';

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
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 8px;
  grid-column: span 2;
`;

const ThumbnailImage = styled(motion.img)`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 8px;
  grid-column: span 2;
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
  white-space: pre-wrap;
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

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

const VideoThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  color: #666;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%);
  }
`;

const PrevArrow = styled(NavigationArrow)`
  left: 10px;
`;

const NextArrow = styled(NavigationArrow)`
  right: 10px;
`;

const MainMediaContainer = styled.div`
  position: relative;
  grid-column: span 2;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const allMedia = [
    ...product.gallery,
    ...(product.videos || []).map(video => `video:${video}`)
  ];
  
  const currentIndex = selectedImage 
    ? allMedia.indexOf(selectedImage)
    : selectedVideo 
      ? allMedia.indexOf(`video:${selectedVideo}`)
      : 0;

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevMedia = allMedia[currentIndex - 1];
      if (prevMedia.startsWith('video:')) {
        setSelectedVideo(prevMedia.replace('video:', ''));
        setSelectedImage(null);
      } else {
        setSelectedVideo(null);
        setSelectedImage(prevMedia);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < allMedia.length - 1) {
      const nextMedia = allMedia[currentIndex + 1];
      if (nextMedia.startsWith('video:')) {
        setSelectedVideo(nextMedia.replace('video:', ''));
        setSelectedImage(null);
      } else {
        setSelectedVideo(null);
        setSelectedImage(nextMedia);
      }
    }
  };

  const handleThumbnailClick = (media: string) => {
    if (media.startsWith('video:')) {
      setSelectedVideo(media.replace('video:', ''));
      setSelectedImage(null);
    } else {
      setSelectedVideo(null);
      setSelectedImage(media);
    }
  };

  const mainImage = selectedImage || product.mainImage;

  return (
    <DetailsContainer>
      <BackButton to="/shop">
        <BackArrow>←</BackArrow>
      </BackButton>
      <ProductGrid>
        <GallerySection>
          <MainMediaContainer>
            {selectedVideo ? (
              <VideoPlayer
                src={selectedVideo}
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <MainImage
                src={mainImage}
                alt={product.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <PrevArrow 
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ‹
            </PrevArrow>
            <NextArrow 
              onClick={handleNext}
              disabled={currentIndex === allMedia.length - 1}
            >
              ›
            </NextArrow>
          </MainMediaContainer>
          {product.gallery.map((image: string, index: number) => (
            <ThumbnailImage
              key={index}
              src={image}
              alt={`${product.title} - view ${index + 1}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleThumbnailClick(image)}
              style={{
                opacity: image === mainImage ? 0.7 : 1,
                cursor: 'pointer',
              }}
            />
          ))}
          {product.videos?.map((video: string, index: number) => (
            <VideoThumbnail
              key={`video-${index}`}
              onClick={() => handleThumbnailClick(`video:${video}`)}
              style={{
                opacity: video === selectedVideo ? 0.7 : 1,
              }}
            >
              <VideoThumbnailImage
                src={mainImage}
                alt="Play video"
              />
              <PlayButton>▶</PlayButton>
            </VideoThumbnail>
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