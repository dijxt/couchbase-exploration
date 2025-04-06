import React, { useState, useEffect } from 'react';

export default function ClusterStatus() {
    const [cluster1Status, setCluster1Status] = useState({ connected: false, services: [] });
    const [cluster2Status, setCluster2Status] = useState({ connected: false, services: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClusterStatus() {
            try {
                setLoading(true);

                // Statut du Cluster 1
                let response = await fetch('/api/status?cluster=1');
                if (response.ok) {
                    const data = await response.json();
                    setCluster1Status(data);
                }

                // Statut du Cluster 2
                response = await fetch('/api/status?cluster=2');
                if (response.ok) {
                    const data = await response.json();
                    setCluster2Status(data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du statut des clusters:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchClusterStatus();

        // Rafraîchir le statut toutes les 60 secondes
        const interval = setInterval(fetchClusterStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Statut des Clusters</h2>

            {loading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2">Cluster 1</h3>
                        <div className="flex items-center mb-3">
                            <div className={`w-3 h-3 rounded-full mr-2 ${cluster1Status.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{cluster1Status.connected ? 'Connecté' : 'Déconnecté'}</span>
                        </div>
                        {cluster1Status.connected && cluster1Status.services && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-1">Services actifs:</h4>
                                <ul className="text-sm text-gray-600">
                                    {Object.keys(cluster1Status.services).map(service => (
                                        <li key={service} className="mb-1">
                                            {service}: {cluster1Status.services[service].length} nœuds
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2">Cluster 2</h3>
                        <div className="flex items-center mb-3">
                            <div className={`w-3 h-3 rounded-full mr-2 ${cluster2Status.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{cluster2Status.connected ? 'Connecté' : 'Déconnecté'}</span>
                        </div>
                        {cluster2Status.connected && cluster2Status.services && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-1">Services actifs:</h4>
                                <ul className="text-sm text-gray-600">
                                    {Object.keys(cluster2Status.services).map(service => (
                                        <li key={service} className="mb-1">
                                            {service}: {cluster2Status.services[service].length} nœuds
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}