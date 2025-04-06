import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCluster, setActiveCluster] = useState('1');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                setLoading(true);
                const response = await fetch(`/api/players?cluster=${activeCluster}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des joueurs');
                }
                const data = await response.json();
                setPlayers(data.players);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPlayers();
    }, [activeCluster]);

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Liste des Joueurs FIFA</h2>
                <div className="inline-flex rounded-md shadow-sm">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            activeCluster === '1'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveCluster('1')}
                    >
                        Cluster 1
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            activeCluster === '2'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveCluster('2')}
                    >
                        Cluster 2
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                    <PlayerCard
                        key={player.name}
                        player={player}
                        source={`Cluster ${activeCluster}`}
                    />
                ))}
            </div>
        </div>
    );
}