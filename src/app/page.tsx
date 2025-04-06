import Link from 'next/link';
import SyncStatus from '@/components/SyncStatus';

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">FIFA Players Database</h1>
          <p className="text-xl text-gray-600 mb-8">
            Application de démonstration pour la réplication XDCR de Couchbase
          </p>
          <div className="flex justify-center space-x-4">
            <Link
                href="/players"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Voir les joueurs
            </Link>
            <Link
                href="/status"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Vérifier le statut XDCR
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <SyncStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">À propos de ce projet</h2>
            <p className="text-gray-600">
              Cette application démontre comment utiliser la réplication inter-cluster (XDCR) de Couchbase
              pour synchroniser des données entre deux clusters. L'application permet de visualiser et comparer
              les données des joueurs FIFA entre les deux clusters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Fonctionnalités</h2>
            <ul className="text-gray-600 space-y-2">
              <li>- Visualisation des données de joueurs FIFA</li>
              <li>- Basculement entre les clusters sources</li>
              <li>- Surveillance en temps réel du statut XDCR</li>
              <li>- Interface responsive et moderne</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Technologies utilisées</h2>
            <ul className="text-gray-600 space-y-2">
              <li>- Next.js 14 avec App Router</li>
              <li>- Couchbase Server</li>
              <li>- Réplication XDCR de Couchbase</li>
              <li>- Tailwind CSS</li>
              <li>- Docker pour la conteneurisation</li>
            </ul>
          </div>
        </div>
      </div>
  );
}
