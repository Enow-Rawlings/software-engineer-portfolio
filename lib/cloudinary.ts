/**
 * Cloudinary Image Upload Utility
 * Handles image uploads to Cloudinary without Firebase Storage
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  error?: {
    message: string;
  };
}

/**
 * Upload an image to Cloudinary
 * @param file - The file to upload
 * @param folder - Optional folder path in Cloudinary (e.g., 'blog_images', 'documents')
 * @returns Promise with the image URL
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = 'portfolio'
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary configuration missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);
  formData.append('resource_type', 'auto');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed with status ${response.status}`);
    }

    const data: CloudinaryUploadResponse = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Delete an image from Cloudinary by public_id
 * Note: Requires authenticated delete (API key and secret) which should only be done server-side
 * @param publicId - The public ID of the image in Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // Client-side deletion requires authentication
  // This would need to be implemented as a server action
  console.warn(
    'Use server-side deletion for security. Implement as API route with Cloudinary Admin API.'
  );
}

/**
 * Build a Cloudinary URL with transformations
 * @param publicId - The public ID of the image
 * @param transformations - Optional transformation parameters
 * @returns Cloudinary image URL
 */
export function buildCloudinaryUrl(
  publicId: string,
  transformations?: Record<string, any>
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
  }

  let url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  if (transformations) {
    const params = Object.entries(transformations)
      .map(([key, value]) => `${key}_${value}`)
      .join(',');
    url += `/${params}`;
  }

  url += `/${publicId}`;
  return url;
}
