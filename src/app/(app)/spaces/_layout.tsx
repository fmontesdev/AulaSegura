import Tabs from '../../../components/Tabs';

export default function SpacesLayout() {
  return (
    <Tabs
      initialRouteName="classrooms"
      tabs={[
        { name: 'classrooms', title: 'Aulas', icon: 'door', route: '/spaces/classrooms' },
        { name: 'readers', title: 'Lectores', icon: 'card-search', route: '/spaces/readers' },
        { name: 'map', title: 'Plano del Centro', icon: 'map-marker-radius', route: '/spaces/map' },
      ]}
    />
  );
}
