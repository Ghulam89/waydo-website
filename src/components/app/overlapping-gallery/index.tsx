import styles from "./overlaping-gallery.module.css";

type Props = {
  images: string[];
  hideToRightOffset?: number;
  slideStyle?: Record<string, unknown>;
};

export default function OverlappingGallery({
  images,
  hideToRightOffset = 60,
  slideStyle = {}
}: Props) {
  return (
    <div className={styles.overlappingGallery}>
      {images.map((imageSrc, i) => {
        const maxOffset = (images.length - 1) * hideToRightOffset;
        const minusOffsetRight = maxOffset - (i * hideToRightOffset);

        return (
          <div
            key={i}
            className={styles.overlappingGalleryItem}
            style={{
              backgroundImage: `url(${imageSrc})`,
              right: `-${minusOffsetRight}px`,
              ...slideStyle
            }}
          >
          </div>
        );
      })}
    </div>
  );
}