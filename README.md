# Business Search App

Application de recherche d'entreprises utilisant l'API Google Maps.

## Configuration requise

- Node.js
- Compte Google Cloud avec API Maps activée

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/Benspy22/business-search-app.git
cd business-search-app
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
- Copier le fichier `.env.example` vers `.env`
- Ajouter votre clé API Google Maps dans le fichier `.env`

4. Lancer l'application :
```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## Fonctionnalités

- Recherche d'entreprises par secteur d'activité et localisation
- Affichage des informations détaillées (adresse, téléphone, site web)
- Sauvegarde des entreprises intéressantes
- Export des données au format CSV

## Technologies utilisées

- Next.js
- React
- Google Maps API
- Tailwind CSS
- Lucide React (icônes)

## Structure du projet

```
business-search-app/
├── components/
│   └── BusinessSearch.js
├── pages/
│   ├── api/
│   │   └── search.js
│   └── index.js
├── public/
├── styles/
└── .env
```
