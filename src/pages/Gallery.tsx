import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

const GalleryContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const GalleryItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  break-inside: avoid;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
`;

interface ImageWithSize {
  src: string;
  width: number;
  height: number;
}

const breakpointColumns = {
  default: 4,
  1600: 4,
  1200: 3,
  900: 2,
  600: 1
};

const Gallery = () => {
  const [images, setImages] = useState<ImageWithSize[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // List of images in the gallery directory
        const imageFiles = [
          '/images/gallery/1.jpg',
          '/images/gallery/2.jpg',
          '/images/gallery/3.jpg',
          '/images/gallery/4.jpg',
          '/images/gallery/5.jpg',
          '/images/gallery/6.jpg',
          '/images/gallery/7.jpg'
        ];

        const imagePromises = imageFiles.map(async (src) => {
          return new Promise<ImageWithSize>((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({ 
                src, 
                width: img.width, 
                height: img.height
              });
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`);
              resolve({ 
                src, 
                width: 1, 
                height: 1
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
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((image, index) => (
          <GalleryItem key={index}>
            <GalleryImage 
              src={image.src} 
              alt={`Gallery image ${index + 1}`}
            />
          </GalleryItem>
        ))}
      </Masonry>
    </GalleryContainer>
  );
};

export default Gallery; 