/**
 * Cloudinary image optimization utilities
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME || '';

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  dpr?: 'auto' | number;
}

/**
 * Generate Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string, 
  options: CloudinaryOptions = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    // Return local fallback if Cloudinary is not configured
    return publicId.startsWith('http') ? publicId : `/images/${publicId}`;
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (dpr) transformations.push(`dpr_${dpr}`);

  const transformString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}${publicId}`;
}

/**
 * Generate srcset for responsive images
 */
export function getCloudinarySrcSet(
  publicId: string,
  widths: number[] = [640, 768, 1024, 1280, 1536],
  options: Omit<CloudinaryOptions, 'width'> = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    const fallbackUrl = publicId.startsWith('http') ? publicId : `/images/${publicId}`;
    return `${fallbackUrl} ${widths[widths.length - 1]}w`;
  }

  return widths
    .map(width => {
      const url = getCloudinaryUrl(publicId, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get image URL (Cloudinary or local fallback)
 */
export function getImageUrl(
  src: string, 
  options: CloudinaryOptions = {}
): string {
  if (!src) return '/images/placeholder.jpg';
  
  // If it's already a full URL, return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // If Cloudinary is configured, use it
  if (CLOUDINARY_CLOUD_NAME) {
    return getCloudinaryUrl(src, options);
  }

  // Fallback to local images
  return src.startsWith('/') ? src : `/images/${src}`;
}

