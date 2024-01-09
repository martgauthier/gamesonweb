# gamesonweb
Games on Web - Romain ABONNATO (Graphic Designer) and Gauthier MARTIN (Executive Programmer)

# Ajouter un package

`npm install nomdupackage --save-dev`

*Ne pas oublier le `--save-dev`*

# Comment coder sur le projet
**TOUT, excepté le HTML (et d'éventuelles tests), doit être mis dans `src/`**


Avant toute session, si on s'est prévenus mutuellement qu'on avait ajouté une dépendance au `package.json`, lancer:

`npm install`

Cela va installer automatiquement et uniquement les dépendances manquantes, notées automatiquement dans le `package.json`.

Ensuite, pour coder, ajouter ses fichiers `.ts` au dossier `src`, et les importer dans le `index.ts`.
Puis, pour voir le résultat de notre code, la commande est:

`npx webpack serve`

(cette commande fonctionne bien grâce à une configuration pré-établie dans `webpack.config.js`).

## Ajouter des assets (images, modèles 3D, musiques)
*Si tu galères, envoie moi un dm*

C'est spécifique à chaque type d'asset, mais il faut souvent ajouter un "loader" Webpack (une extension de Webpack),
adapté au chargement du type du fichier voulu.
Ensuite, il faut configurer son nom de sortie.
En gros le plus simple est de mater le tuto approprié au type de fichier qu'on veut ajouter.

Images: https://webpack.js.org/guides/asset-management/#loading-images

Modèles 3D: les ajouter directement au dossier `assets/models`

CSS: *Envoie moi un DM, ou regarde sur Google faut changer la config webpack*
