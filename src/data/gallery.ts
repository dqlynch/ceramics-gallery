// Photos live in src/assets/gallery/<priority>/. Higher numbers show first.
// Within a folder, photos sort by filename.

export interface GalleryPhoto {
  src: string;
  srcset: string;
  width: number;
  height: number;
  isWide: boolean;
  name: string;
}

interface ImgOutput {
  src: string;
  srcset?: string;
  w: number;
  h: number;
}

const files = import.meta.glob<ImgOutput>(
  '../assets/gallery/*/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp}',
  { eager: true, import: 'default', query: { w: '800;1600', format: 'webp', as: 'img' } },
);

const WIDE_RATIO = 1.5;

const photos: (GalleryPhoto & { priority: number })[] = Object.entries(files).map(([path, img]) => {
  const [, priority, file] = path.match(/gallery\/(\d+)\/(.+)\.\w+$/) ?? [];
  return {
    src: img.src,
    srcset: img.srcset ?? img.src,
    width: img.w,
    height: img.h,
    isWide: img.w / img.h > WIDE_RATIO,
    name: file.replace(/-/g, ' '),
    priority: Number(priority),
  };
});

photos.sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));

export interface GalleryTile extends GalleryPhoto {
  span: 1 | 2;
}

const takeFirst = <T,>(queue: T[], test: (p: T) => boolean) => {
  const index = queue.findIndex(test);
  return index === -1 ? undefined : queue.splice(index, 1)[0];
};

// Each row is three tall photos, or one wide and one tall. Wide photos switch
// sides each time so two are never directly on top of each other. A wide
// photo needs a tall one to share its row, so we place each wide photo as
// early as its priority folder allows. Photos that can't fill a complete row
// at the end are left out.
const layOutRows = (ordered: (GalleryPhoto & { priority: number })[]): GalleryTile[] => {
  const queue = [...ordered];
  const tiles: GalleryTile[] = [];
  let wideOnLeft = true;

  while (queue.length > 0) {
    const currentPriority = queue[0].priority;
    const tallCount = queue.filter(p => !p.isWide).length;
    const wide = tallCount > 0
      ? takeFirst(queue, p => p.isWide && p.priority === currentPriority)
      : undefined;

    if (wide) {
      const tall = takeFirst(queue, p => !p.isWide)!;
      const row: GalleryTile[] = [{ ...wide, span: 2 }, { ...tall, span: 1 }];
      tiles.push(...(wideOnLeft ? row : row.reverse()));
      wideOnLeft = !wideOnLeft;
    } else if (tallCount >= 3) {
      const row = [0, 1, 2].map(() => takeFirst(queue, p => !p.isWide)!);
      tiles.push(...row.map(p => ({ ...p, span: 1 as const })));
    } else {
      break;
    }
  }

  if (queue.length > 0 && import.meta.env.DEV) {
    console.warn('Gallery: these photos don\'t fit a complete row and are hidden:', queue.map(p => p.name));
  }
  return tiles;
};

export const galleryPhotos = layOutRows(photos);
