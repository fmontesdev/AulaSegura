import { z } from 'zod';

// Schema unificado para CREAR y EDITAR departamento
export const DepartmentFormSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
});

// Tipo inferido del schema
export type DepartmentFormData = z.infer<typeof DepartmentFormSchema>;
