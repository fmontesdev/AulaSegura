import { EducationStage } from '../types/Course';

// Obtiene el color asociado a una etapa educativa
export function getEducationStageColor(stage: EducationStage, colors: any): string {
  switch (stage) {
    case EducationStage.ESO:
      return colors.warning;
    case EducationStage.BACHILLERATO:
      return colors.secondary;
    case EducationStage.CF:
      return colors.primary;
    default:
      return colors.grey;
  }
}

// Obtiene el label formateado de una etapa educativa
export function getEducationStageLabel(stage: EducationStage): string {
  if (stage === EducationStage.CF) return 'Ciclo Formativo';
  
  const stageStr = String(stage);
  return stageStr.charAt(0).toUpperCase() + stageStr.slice(1);
}
