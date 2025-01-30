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

## 📂 4. Création d’un Bucket "fifa_players"
1. Accédez à **Buckets** (menu latéral gauche).
2. Cliquez sur **"Add Bucket"**.
3. **Nom du bucket** : `fifa_players`
4. **RAM Quota** : 100 MB
5. Cliquez sur **"Create"**.

Le bucket `fifa_players` est maintenant prêt à être utilisé ! 🚀

---

# 🏆 Premières manipulations avec Couchbase

## 🔍 5. Création d’un index primaire
Avant d’interagir avec les données, créez un index :

```sql
CREATE PRIMARY INDEX ON `fifa_players`;
```

---

## 📌 6. Insérer des joueurs FIFA dans Couchbase
Ajout de plusieurs joueurs avec des clés uniques :

```sql
INSERT INTO `fifa_players` (KEY, VALUE) VALUES 
("player:4", { "full_name": "Kevin De Bruyne", "age": 27, "position": "CM", "club": "Manchester City", "nationality": "Belgium", "acceleration": 78, "ball_control": 91, "dribbling": 86, "short_passing": 92, "vision": 94 });
```

---

## 📌 7. Méthode alternative : Importation via l’interface Web

Si vous souhaitez importer un fichier JSON directement depuis l’interface Web de Couchbase, suivez ces étapes :

### **🔹 Étapes :**
1. **Accéder à l’interface Web de Couchbase**  
   👉 [http://localhost:8091](http://localhost:8091)

2. **Aller dans l'onglet "Buckets"**  
   - Sélectionnez le bucket **`fifa_players`**.

3. **Cliquer sur "Documents"**  
   - Ensuite, cliquez sur **"Import Documents"**.

4. **Sélectionner le fichier JSON**  
   - Téléversez le fichier **`fifa_players.json`** que vous avez préparé.

5. **Configuration du format :**  
   - **Format** : JSON  
   - **Format des données** : Liste (`[ { "id": "player:1", ...}, {...} ]`)  
   - **Générer une clé à partir d'un champ** : Mettez `"id"` pour que Couchbase utilise ce champ comme clé.

6. **Lancer l'importation**  
   - Cliquez sur **"Import"** et attendez la confirmation.

Une fois terminé, vous pouvez vérifier l'importation en exécutant la requête suivante dans l’onglet Query :

```sql
SELECT * FROM `fifa_players`;
```

---

## 📊 8. Récupérer les joueurs FIFA enregistrés
### 8.1 Afficher tous les joueurs
```sql
SELECT * FROM `fifa_players`;
```

### 8.2 Afficher uniquement les clés des documents
```sql
SELECT META(f).id AS document_key, f.*
FROM `fifa_players` AS f;
```

### 8.3 Trouver un joueur spécifique
Exemple avec Kevin De Bruyne :
```sql
SELECT * FROM `fifa_players` WHERE full_name = "Kevin De Bruyne";
```

### 8.4 Lister tous les milieux de terrain
```sql
SELECT full_name, club FROM `fifa_players` WHERE position = "CM";
```

### 8.5 Trouver les joueurs belges
```sql
SELECT full_name, club FROM `fifa_players` WHERE nationality = "Belgium";
```
