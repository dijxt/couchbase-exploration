import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerDetail({ playerName, clusterSource = '1' }) {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCluster, setActiveCluster] = useState(clusterSource);

    useEffect(() => {
        async function fetchPlayerDetails() {
            try {
                setLoading(true);
                const response = await fetch(`/api/players/${encodeURIComponent(playerName)}?cluster=${activeCluster}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des détails du joueur');
                }
                const data = await response.json();
                setPlayer(data.player);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (playerName) {
            fetchPlayerDetails();
        }
    }, [playerName, activeCluster]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
                <Link href="/players" className="mt-4 inline-block text-blue-500 hover:underline">
                    Retour à la liste des joueurs
                </Link>
            </div>
        );
    }

    if (!player) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">Joueur non trouvé</p>
                <Link href="/players" className="mt-4 inline-block text-blue-500 hover:underline">
                    Retour à la liste des joueurs
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{player.name}</h1>
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

            {/* Informations générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="py-2 text-gray-600">Nom complet</td>
                            <td className="py-2 font-medium">{player.full_name || player.name}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Date de naissance</td>
                            <td className="py-2 font-medium">{player.birth_date}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Âge</td>
                            <td className="py-2 font-medium">{player.age} ans</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Nationalité</td>
                            <td className="py-2 font-medium">{player.nationality}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Taille</td>
                            <td className="py-2 font-medium">{player.height_cm} cm</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Poids</td>
                            <td className="py-2 font-medium">{player.weight_kgs} kg</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Positions</td>
                            <td className="py-2 font-medium">{Array.isArray(player.positions) ? player.positions.join(', ') : player.positions}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Pied préféré</td>
                            <td className="py-2 font-medium">{player.preferred_foot}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Statistiques générales</h2>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="py-2 text-gray-600">Note générale</td>
                            <td className="py-2 font-medium">{player.overall_rating}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Potentiel</td>
                            <td className="py-2 font-medium">{player.potential}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Valeur</td>
                            <td className="py-2 font-medium">{player.value_euro?.toLocaleString()} €</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Salaire</td>
                            <td className="py-2 font-medium">{player.wage_euro?.toLocaleString()} €</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Réputation internationale</td>
                            <td className="py-2 font-medium">{player.international_reputation}/5</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Pied faible</td>
                            <td className="py-2 font-medium">{player.weak_foot}/5</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Gestes techniques</td>
                            <td className="py-2 font-medium">{player.skill_moves}/5</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-gray-600">Type de corps</td>
                            <td className="py-2 font-medium">{player.body_type}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aptitudes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Attaque</h2>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-between">
                                <span>Finition</span>
                                <span className="font-medium">{player.finishing}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.finishing}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Tir de loin</span>
                                <span className="font-medium">{player.long_shots}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.long_shots}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Précision de la tête</span>
                                <span className="font-medium">{player.heading_accuracy}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.heading_accuracy}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Volée</span>
                                <span className="font-medium">{player.volleys}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.volleys}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Pénaltys</span>
                                <span className="font-medium">{player.penalties}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.penalties}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Technique</h2>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-between">
                                <span>Dribble</span>
                                <span className="font-medium">{player.dribbling}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.dribbling}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Contrôle</span>
                                <span className="font-medium">{player.ball_control}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.ball_control}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Passe courte</span>
                                <span className="font-medium">{player.short_passing}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.short_passing}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Passe longue</span>
                                <span className="font-medium">{player.long_passing}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.long_passing}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Centre</span>
                                <span className="font-medium">{player.crossing}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.crossing}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Physique</h2>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-between">
                                <span>Accélération</span>
                                <span className="font-medium">{player.acceleration}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.acceleration}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Vitesse</span>
                                <span className="font-medium">{player.sprint_speed}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.sprint_speed}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Endurance</span>
                                <span className="font-medium">{player.stamina}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.stamina}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Force</span>
                                <span className="font-medium">{player.strength}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.strength}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <span>Agilité</span>
                                <span className="font-medium">{player.agility}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${player.agility}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Link href="/players" className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors">
                    &larr; Retour à la liste des joueurs
                </Link>
            </div>
        </div>
    );
}