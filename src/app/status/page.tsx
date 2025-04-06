import SyncStatus from '@/components/SyncStatus';
import ClusterStatus from '@/components/ClusterStatus';

export default function StatusPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Statut de la Réplication XDCR</h1>

            <div className="space-y-8">
                <SyncStatus />
                <ClusterStatus />
            </div>
        </div>
    );
}