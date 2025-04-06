import { connect, Cluster } from 'couchbase';

let cluster1Instance = null;
let cluster2Instance = null;

export async function getCluster1() {
    if (cluster1Instance) return cluster1Instance;

    try {
        cluster1Instance = await connect('couchbase://couchbase1', {
            username: process.env.COUCHBASE_USERNAME || 'Administrator',
            password: process.env.COUCHBASE_PASSWORD || 'password',
        });
        return cluster1Instance;
    } catch (error) {
        console.error('Erreur de connexion au cluster 1:', error);
        throw new Error('Impossible de se connecter au cluster Couchbase 1');
    }
}

export async function getCluster2() {
    if (cluster2Instance) return cluster2Instance;

    try {
        cluster2Instance = await connect('couchbase://couchbase2', {
            username: process.env.COUCHBASE_USERNAME || 'Administrator',
            password: process.env.COUCHBASE_PASSWORD || 'password',
        });
        return cluster2Instance;
    } catch (error) {
        console.error('Erreur de connexion au cluster 2:', error);
        throw new Error('Impossible de se connecter au cluster Couchbase 2');
    }
}

export async function getBucket(cluster, bucketName = 'fifa') {
    try {
        const bucket = cluster.bucket(bucketName);
        const collection = bucket.defaultCollection();
        return { bucket, collection };
    } catch (error) {
        console.error(`Erreur d'accès au bucket ${bucketName}:`, error);
        throw new Error(`Impossible d'accéder au bucket ${bucketName}`);
    }
}

export async function getClusterStatus(cluster) {
    try {
        const diagnostics = await cluster.diagnostics();
        return {
            connected: true,
            services: diagnostics.services,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération du statut du cluster:', error);
        return {
            connected: false,
            error: error.message,
        };
    }
}

export async function checkXDCRStatus() {
    try {
        // Cette fonction nécessiterait l'accès à l'API REST de Couchbase
        // Cette implémentation est simplifiée
        const cluster1 = await getCluster1();
        const cluster2 = await getCluster2();

        // Vérifier si les deux clusters sont disponibles
        const status1 = await getClusterStatus(cluster1);
        const status2 = await getClusterStatus(cluster2);

        return {
            cluster1Status: status1.connected,
            cluster2Status: status2.connected,
            replicationActive: status1.connected && status2.connected,
        };
    } catch (error) {
        console.error('Erreur lors de la vérification du statut XDCR:', error);
        return {
            error: error.message,
        };
    }
}