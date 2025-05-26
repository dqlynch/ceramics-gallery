import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const GalleryContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2% 2% 2% 2%;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const GalleryItem = styled.div<{ $isLandscape: boolean }>`
  grid-column: ${props => props.$isLandscape ? 'span 2' : 'span 1'};
  aspect-ratio: ${props => props.$isLandscape ? '1.625532' : '0.8'};
  overflow: hidden;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

interface ImageWithSize {
  src: string;
  width: number;
  height: number;
  isLandscape: boolean;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageWithSize[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageFiles = [
          '/images/gallery/1.jpg',
          '/images/gallery/2.jpg',
          '/images/gallery/3.jpg',
          '/images/gallery/4.jpg',
          '/images/gallery/5.jpg',
          '/images/gallery/6.jpg',
          '/images/gallery/7.jpg',
          '/images/gallery/8.jpg'
        ];

        const imagePromises = imageFiles.map(async (src) => {
          return new Promise<ImageWithSize>((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              resolve({ 
                src, 
                width: img.width, 
                height: img.height,
                isLandscape: aspectRatio > 1.5
              });
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`);
              resolve({ 
                src, 
                width: 1, 
                height: 1,
                isLandscape: false
              }); // Fallback
            };
            img.src = src;
          });
        });

        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <GalleryContainer>
      <GalleryGrid>
        {images.map((image, index) => (
          <GalleryItem 
            key={index}
            $isLandscape={image.isLandscape}
          >
            <GalleryImage 
              src={image.src} 
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
            />
          </GalleryItem>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default Gallery; 