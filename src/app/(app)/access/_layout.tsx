import Tabs from '../../../components/Tabs';

export default function AccessLayout() {
  return (
    <Tabs
      initialRouteName="permissions"
      tabs={[
        { name: 'permissions', title: 'Permisos', icon: 'key', route: '/access/permissions' },
        { name: 'reservations', title: 'Reservas', icon: 'calendar-check', route: '/access/reservations' },
        { name: 'validations', title: 'Validaciones', icon: 'check-decagram', badge: 5, route: '/access/validations' },
      ]}
    />
  );
}
