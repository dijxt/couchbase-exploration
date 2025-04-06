'use client'
import React, { useState, useEffect } from 'react';

export default function SyncStatus() {
    const [status, setStatus] = useState({
        cluster1Status: false,
        cluster2Status: false,
        replicationActive: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function checkSyncStatus() {
            try {
                setLoading(true);
                const response = await fetch('/api/sync');
                if (!response.ok) {
                    throw new Error('Erreur lors de la vérification du statut de synchronisation');
                }
                const data = await response.json();
                setStatus(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        checkSyncStatus();

        // Rafraîchir le statut toutes les 30 secondes
        const interval = setInterval(checkSyncStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Statut de Réplication XDCR</h2>

            {loading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-4 rounded-lg ${status.cluster1Status ? 'bg-green-100' : 'bg-red-100'}`}>
                        <h3 className="font-medium text-lg mb-2">Cluster 1</h3>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${status.cluster1Status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{status.cluster1Status ? 'En ligne' : 'Hors ligne'}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg ${status.cluster2Status ? 'bg-green-100' : 'bg-red-100'}`}>
                        <h3 className="font-medium text-lg mb-2">Cluster 2</h3>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${status.cluster2Status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{status.cluster2Status ? 'En ligne' : 'Hors ligne'}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg ${status.replicationActive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <h3 className="font-medium text-lg mb-2">Réplication XDCR</h3>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${status.replicationActive ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span>{status.replicationActive ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}