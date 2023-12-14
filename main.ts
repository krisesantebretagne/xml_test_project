/* 
fs : Node.js file system - stocker, accéder, et gérer les données sur notre OS.
Déjà dispo dans chaque projet Node.js sans installation.
Méthodes utiles :
    readFile
    writeFile
    watchFile - recevoir notifications de modifs
    appendFile
*/
import * as fs from 'fs';
/* 
Node.js util 
Déjà dispo dans chaque projet Node.js sans installation.
*/
import * as util from 'util';

/*
xml2js
*/
import * as xml2js from 'xml2js';

// Convertir fs.readFile() à une fonction qui retourne une promesse
const lireFichier = util.promisify(fs.readFile);

async function parserFichierXml(cheminFichier: string): Promise<void> {
    try {
        //Lire le fichier XML
        const donneesXml = await lireFichier(cheminFichier, 'utf-8');

        //Parser le fichier XML à JSON
        const parser = new xml2js.Parser();
        const donneesParsees = await parser.parseStringPromise(donneesXml);

        //Afficher les données parsées
        console.log("XML à JSON : ", JSON.stringify(donneesParsees, null, 2));

    } catch (erreur) {
        console.error("Erreur : ", erreur)
    }
}

//Main

//Fichier à parser
const cheminFichierXml = "testFichierXml.xml";
parserFichierXml(cheminFichierXml);