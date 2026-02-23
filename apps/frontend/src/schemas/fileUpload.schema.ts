import { z } from 'zod';

// Tipos MIME válidos para imágenes
export const VALID_IMAGE_TYPES = [
  'image/avif',
  'image/webp',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/svg+xml',
];

// Tamaño máximo de archivo en bytes
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Schema para validar archivos de imagen subidos
export const ImageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => VALID_IMAGE_TYPES.includes(file.type),
    {
      message: `Formato de imagen no válido. Use: ${VALID_IMAGE_TYPES.map(t => t.replace('image/', '')).join(', ')}`,
    }
  )
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    {
      message: `El archivo es demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    }
  );

export type ImageFile = z.infer<typeof ImageFileSchema>;
