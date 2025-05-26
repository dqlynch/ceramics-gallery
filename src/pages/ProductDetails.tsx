import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const DetailSeparator = styled.span`
  color: ${props => props.theme.colors.text};
  opacity: 0.5;
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const InstagramLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
  display: inline-flex;
  align-items: baseline;
  gap: 3px;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
    position: relative;
    top: 2px;
  }
`;

const InstagramSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${props => props.theme.colors.text};
`;

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoThumbnails, setVideoThumbnails] = useState<{ [key: string]: string }>({});
  const [loadingThumbnails, setLoadingThumbnails] = useState<{ [key: string]: boolean }>({});

  const getCachedThumbnail = (video: string): string | null => {
    try {
      const cached = localStorage.getItem(`video-thumbnail-${video}`);
      if (cached) {
        const { timestamp, dataUrl } = JSON.parse(cached);
        // Cache for 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          return dataUrl;
        }
      }
    } catch (error) {
      console.error('Error reading from cache:', error);
    }
    return null;
  };

  const setCachedThumbnail = (video: string, dataUrl: string) => {
    try {
      localStorage.setItem(`video-thumbnail-${video}`, JSON.stringify({
        timestamp: Date.now(),
        dataUrl
      }));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  };

  const generateVideoThumbnail = (video: string) => {
    return new Promise<string>((resolve) => {
      // Check cache first
      const cached = getCachedThumbnail(video);
      if (cached) {
        resolve(cached);
        return;
      }

      const videoElement = document.createElement('video');
      videoElement.src = video;
      videoElement.crossOrigin = 'anonymous';
      
      videoElement.addEventListener('loadeddata', () => {
        // Seek to the middle of the video
        videoElement.currentTime = videoElement.duration / 2;
      });

      videoElement.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          setCachedThumbnail(video, thumbnailUrl);
          resolve(thumbnailUrl);
        }
      });
    });
  };

  useEffect(() => {
    const generateThumbnails = async () => {
      if (product?.videos) {
        const thumbnails: { [key: string]: string } = {};
        const loading: { [key: string]: boolean } = {};
        
        // Set loading state for all videos
        product.videos.forEach(video => {
          loading[video] = true;
        });
        setLoadingThumbnails(loading);

        for (const video of product.videos) {
          try {
            const thumbnail = await generateVideoThumbnail(video);
            thumbnails[video] = thumbnail;
          } catch (error) {
            console.error(`Error generating thumbnail for ${video}:`, error);
          }
          // Update loading state for this video
          setLoadingThumbnails(prev => ({
            ...prev,
            [video]: false
          }));
        }
        setVideoThumbnails(thumbnails);
      }
    };

    generateThumbnails();
  }, [product?.videos]);

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
                src={videoThumbnails[video] || '/placeholder.jpg'}
                alt="Video thumbnail"
              />
              {loadingThumbnails[video] && (
                <LoadingOverlay>
                  Loading...
                </LoadingOverlay>
              )}
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
              {product.dimensions}
              <DetailSeparator>•</DetailSeparator>
              {product.material}
              <DetailSeparator>•</DetailSeparator>
              {product.firing_type}
            </DetailItem>
          </ProductDetailsSection>
          <InstagramSection>
            Interested? Please reach out to me on{' '}
            <InstagramLink 
              href="https://www.instagram.com/d.q.lynch/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </InstagramLink>
            !
          </InstagramSection>
        </ProductInfo>
      </ProductGrid>
    </DetailsContainer>
  );
};

export default ProductDetails; 