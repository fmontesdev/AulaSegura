import { z } from 'zod';
import { EducationStage, CFLevel } from '../types/Course';

// Schema unificado para CREAR y EDITAR curso
export const CourseFormSchema = z.object({
  courseCode: z.string()
    .min(1, 'El código es obligatorio')
    .max(50, 'El código no puede exceder 50 caracteres'),
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  educationStage: z.nativeEnum(EducationStage, {
    errorMap: () => ({ message: 'Debe seleccionar una etapa educativa' }),
  }),
  levelNumber: z.number()
    .int('El nivel debe ser un número entero')
    .min(1, 'El nivel debe ser al menos 1')
    .max(4, 'El nivel no puede ser mayor a 4'),
  cfLevel: z.nativeEnum(CFLevel).nullable().optional(),
  academicYearCode: z.string()
    .min(1, 'El año académico es obligatorio'),
}).refine(
  (data) => {
    // Si la etapa es CF, cfLevel es obligatorio
    if (data.educationStage === EducationStage.CF) {
      return data.cfLevel !== null && data.cfLevel !== undefined;
    }
    return true;
  },
  {
    message: 'El nivel de ciclo formativo es obligatorio para CF',
    path: ['cfLevel'],
  }
);

// Tipo inferido del schema
export type CourseFormData = z.infer<typeof CourseFormSchema>;
