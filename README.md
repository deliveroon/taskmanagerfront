# README

TaskManagerFront est développé avec les frameworks Angular et Ionic 
Ionic est un framework de développement cross-platform web et mobile. On peut donc générer des builds pour IOS et ANDROID.
 

# Installation

## Prérequis

### Installation de node JS
### Installation de angular et ionic framework
### Lancer le service backend au préalable

## Récupération du code

    $ git clone https://github.com/deliveroon/taskmanagerfront.git
    
## Installation des dépendances
Se placer à la racine du projet et exécuter la commande suivante 

    $ npm install

## Variables d'environnements

Modifier le fichier /src/environments/environments.ts avec l'api_url

## Lancer le serveur de dev

Se placer à la racine du projet et lancer la commande

    $ ionic serve

## Générer le code ANDROID et IOS

Se placer à la racine du projet et lancer la commande

    $ ionic capacitor sync
    
Vous trouverez les dossier android et ios à la racine du projet
    

