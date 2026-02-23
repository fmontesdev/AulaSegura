/**
 * Tipos relacionados con tabs de navegación
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface TabConfig {
  name: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  badge?: number;
}

export interface TabProps {
  initialRouteName?: string;
  tabs: TabConfig[];
}