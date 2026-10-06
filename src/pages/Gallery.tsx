import styled from '@emotion/styled';
import { galleryPhotos } from '../data/gallery';

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

const GalleryItem = styled.div<{ $isWide: boolean }>`
  grid-column: ${props => props.$isWide ? 'span 2' : 'span 1'};
  aspect-ratio: ${props => props.$isWide ? '1.625532' : '0.8'};
  overflow: hidden;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const Gallery = () => (
  <GalleryContainer>
    <GalleryGrid>
      {galleryPhotos.map(photo => (
        <GalleryItem key={photo.src} $isWide={photo.span === 2}>
          <GalleryImage
            src={photo.src}
            srcSet={photo.srcset}
            sizes={photo.span === 2 ? '(max-width: 1600px) 64vw, 1030px' : '(max-width: 1600px) 32vw, 510px'}
            width={photo.width}
            height={photo.height}
            alt={photo.name}
            loading="lazy"
          />
        </GalleryItem>
      ))}
    </GalleryGrid>
  </GalleryContainer>
);

export default Gallery;
