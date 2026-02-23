import Tabs from '../../../components/Tabs';

export default function SupervisionLayout() {
  return (
    <Tabs
      initialRouteName="logs"
      tabs={[
        { name: 'logs', title: 'Logs de Accesos', icon: 'file-document-multiple', route: '/supervision/logs' },
        { name: 'incidents', title: 'Incidencias', icon: 'alert-circle', route: '/supervision/incidents' },
        { name: 'analytics', title: 'Analíticas', icon: 'chart-box', route: '/supervision/analytics' },
      ]}
    />
  );
}
