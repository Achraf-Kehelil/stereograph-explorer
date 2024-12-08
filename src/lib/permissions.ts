import { Role, Permission } from '@/types';

const rolePermissions: Record<Role, Permission[]> = {
  directeur: [
    'manage_users',
    'view_logs',
    'manage_boxes',
    'view_calls',
    'export_data',
    'manage_prisoners',
    'manage_visitors',
    'view_statistics',
    'manage_documents',
  ],
  superviseur: [
    'view_logs',
    'manage_boxes',
    'view_calls',
    'export_data',
    'manage_prisoners',
    'manage_visitors',
    'view_statistics',
  ],
  agent007: [
    'view_calls',
    'manage_boxes',
    'manage_visitors',
    'view_statistics',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function getUserPermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? [];
}

export function requirePermission(permission: Permission) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const user = this.user ?? this.props?.user;
      
      if (!user || !hasPermission(user.role, permission)) {
        throw new Error('Unauthorized: Insufficient permissions');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}