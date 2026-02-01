/**
 * Service para operaciones CRUD de usuarios
 */

import { User, UpdateUserData, DeleteUserResponse } from '../types/User';
import apiService from './apiService';

export const userService = {
  // Obtiene todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>('/users');
  },

  // Obtiene un usuario por su ID
  async getUserById(userId: string): Promise<User> {
    return apiService.get<User>(`/users/${userId}`);
  },

  // Actualiza un usuario por su ID
  async updateUser(userId: string, data: UpdateUserData): Promise<User> {
    return apiService.patch<User>(`/users/${userId}`, data);
  },

  // Elimina un usuario por su ID
  async deleteUser(userId: string): Promise<DeleteUserResponse> {
    return apiService.delete<DeleteUserResponse>(`/users/${userId}`);
  },
};
