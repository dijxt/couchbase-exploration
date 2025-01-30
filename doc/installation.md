# 📌 Installation et utilisation de Couchbase avec Docker

## 🛠️ 1. Installation de Couchbase avec Docker

### 1.1 Vérifier l'installation de Docker
Avant de commencer, assurez-vous que Docker est bien installé en exécutant :

```sh
docker --version
```
Si Docker n’est pas installé, téléchargez-le depuis : [https://www.docker.com/get-started](https://www.docker.com/get-started)

---

### 1.2 Lancer Couchbase avec Docker
Exécutez la commande suivante pour télécharger et démarrer Couchbase :

```sh
docker run -d --name couchbase-server -p 8091-8096:8091-8096 -p 11210:11210 couchbase
```

📌 **Explication :**
- `-d` : Lance le conteneur en arrière-plan.
- `--name couchbase-server` : Nom du conteneur.
- `-p 8091-8096:8091-8096 -p 11210:11210` : Ouvre les ports nécessaires.
- `couchbase` : Utilise l'image officielle de Couchbase.

Attendez quelques secondes que le serveur démarre.

---

## 🌐 2. Accéder à l’interface Web de Couchbase
Ouvrez **votre navigateur** et accédez à :  
👉 [http://localhost:8091](http://localhost:8091)

---

## ⚙️ 3. Configuration initiale
1. Cliquez sur **"Setup New Cluster"**.
2. **Nom du cluster** : `CouchbaseCluster`
3. **Nom d’utilisateur** : `Administrator`
4. **Mot de passe** : `password` (ou un autre sécurisé)
5. **Sélectionnez les services Couchbase** :
   - Cochez **Data, Index, Query**
6. **Configurez la mémoire RAM** pour chaque service (par défaut 256 MB).
7. **Terminez l’installation** en cliquant sur **"Finish With Defaults"**.

---

## 📂 4. Création d’un Bucket "football"
1. Accédez à **Buckets** (menu latéral gauche).
2. Cliquez sur **"Add Bucket"**.
3. **Nom du bucket** : `football`
4. **RAM Quota** : 100 MB
5. Cliquez sur **"Create"**.

Le bucket `football` est maintenant prêt à être utilisé ! 🚀

---

# 🏆 Premières manipulations avec Couchbase

## 🔍 5. Création d’un index primaire
Avant d’interagir avec les données, créez un index :

```sql
CREATE PRIMARY INDEX ON `football`;
```

---

## 📌 6. Insérer des joueurs dans Couchbase
Ajout de plusieurs joueurs avec des clés uniques :

```sql
INSERT INTO `football` (KEY, VALUE) VALUES 
("player:1", { "name": "Kylian Mbappé", "age": 25, "position": "Attaquant", "club": "PSG", "nationality": "France" });

INSERT INTO `football` (KEY, VALUE) VALUES 
("player:2", { "name": "Lionel Messi", "age": 36, "position": "Attaquant", "club": "Inter Miami", "nationality": "Argentine" });

INSERT INTO `football` (KEY, VALUE) VALUES 
("player:3", { "name": "Cristiano Ronaldo", "age": 39, "position": "Attaquant", "club": "Al-Nassr", "nationality": "Portugal" });

INSERT INTO `football` (KEY, VALUE) VALUES 
("player:4", { "name": "Kevin De Bruyne", "age": 32, "position": "Milieu", "club": "Manchester City", "nationality": "Belgique" });
```

---

## 📊 7. Récupérer les joueurs enregistrés
### 7.1 Afficher tous les joueurs
```sql
SELECT * FROM `football`;
```

### 7.2 Afficher uniquement les clés des documents
```sql
SELECT META(f).id AS document_key, f.*
FROM `football` AS f;
```

### 7.3 Trouver un joueur spécifique
Exemple avec Mbappé :
```sql
SELECT * FROM `football` WHERE name = "Kylian Mbappé";
```

### 7.4 Lister tous les attaquants
```sql
SELECT name, club FROM `football` WHERE position = "Attaquant";
```

### 7.5 Trouver les joueurs français
```sql
SELECT name, club FROM `football` WHERE nationality = "France";
```

---

## 🔄 8. Mise à jour des joueurs
### 8.1 Changer le club de Mbappé
```sql
UPDATE `football` 
SET club = "Real Madrid" 
WHERE name = "Kylian Mbappé";
```

### 8.2 Supprimer un champ (`id`) d'un document
```sql
UPDATE `football`
UNSET id
WHERE name = "Kylian Mbappé";
```

---

## ❌ 9. Suppression d'un joueur
Exemple : Suppression de Messi
```sql
DELETE FROM `football` WHERE name = "Lionel Messi";
```

---

# 🛑 Arrêter et supprimer Couchbase
### Arrêter le conteneur :
```sh
docker stop couchbase-server
```

### Supprimer le conteneur :
```sh
docker rm couchbase-server
```

### Supprimer l’image de Couchbase (si besoin) :
```sh
docker rmi couchbase
```



