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

//import * as path from 'path';

// Convertir fs.readFile() à une fonction qui retourne une promesse
const lireFichier = util.promisify(fs.readFile);
// Convertir fs.readFile() à une fonction qui retourne une promesse
const ecrireFichier = util.promisify(fs.writeFile);

//Parser le fichier XML et afficher les données dans le console en JSON. L'objet retourné et une promesse.
/* async function parserFichierXml(cheminFichier: string): Promise<void> {
    try {
        //Lire le fichier XML
        const donneesXml = await lireFichier(cheminFichier, 'utf-8');

        //Parser le fichier XML à JSON
        const parser = new xml2js.Parser();
        const donneesParsees = await parser.parseStringPromise(donneesXml);

        //Afficher les données parsées dans le console
        console.log("XML à JSON : ", JSON.stringify(donneesParsees, null, 2));
        
    } catch (erreur) {
        console.error("Erreur : ", erreur)
    }
}
*/
//Parser le fichier XML et écrire un fichier JSON. L'objet retourné et une promesse.
/*
async function parserFichierXmlEtEcrireJson(cheminFichierXML: string, cheminFichierJson: string): Promise<void> {
    try {
        //Lire le fichier XML (DRY!)
    
        const donneesXml = await lireFichier(cheminFichierXML, 'utf-8');

        //Parser XML à JSON
        const parser = new xml2js.Parser();
        const donneesParsees = await parser.parseStringPromise(donneesXml);

        await ecrireFichier(cheminFichierJson, JSON.stringify(donneesParsees, null, 2));
        console.log("Fichier JSON créé", cheminFichierJson);
    } catch (erreur) {
        console.error("Erreur : ", erreur);
    }
}
*/
async function lireFichierXML(cheminFichierXML: string): Promise<string | null> {
    try {
        const donneesXml = await lireFichier(cheminFichierXML, 'utf-8');
        return donneesXml;
    } catch (erreur) {
        console.error("Erreur en lisant fichier XML : ", erreur);
        return null;
    }
}

async function parserXmlEnJson(contenuXML: string, cheminFichierJson: string): Promise<void> {
    
    try {
        //Parser XML en JSON
        const parser = new xml2js.Parser();
        const donneesXmlparses = await parser.parseStringPromise(contenuXML);

        //Ecrire un fichier JSON
        await ecrireFichier(cheminFichierJson, JSON.stringify(donneesXmlparses, null, 2));
        console.log("Fichier JSON créé.");
    } catch (erreur) {
        console.error("Erreur rencontré en écrivant le fichier JSON : ", erreur);
    }
}

//Main

//Fichier à parser (./XML/...)
//const cheminFichierXml = "./XML/Suivi insert.bpml";
//const cheminFichierJson ="./JSON/Suivi insert.json";
const repertoireXML = "XML";
//parserFichierXml(cheminFichierXml);
//parserFichierXmlEtEcrireJson(cheminFichierXml, cheminFichierJson);

fs.promises.readdir(repertoireXML)
    .then((fichiersXML) => {
        fichiersXML.forEach((fichierXML) => {
            lireFichierXML("./XML/" + fichierXML)
                .then((contenuXml) => {
                    if (contenuXml !== null) {
                        const fichierSplit: string[] = fichierXML.split('.'); //Isoler nom du fichier sans l'extension
                        return parserXmlEnJson(contenuXml, "./JSON/" + fichierSplit[0] + ".json");
                    } else {
                        console.log("Erreur : la valeur est null");
                        return Promise.resolve(); // Assurer qu'un Promise est retourné
                    }
                })
                .catch((erreur) => console.error("Erreur trouvé : ", erreur));
                    });
    });

/* 
lireFichierXML(cheminFichierXml)
    .then((contenuXml) => {
        if (contenuXml !== null) {
            return parserXmlEnJson(contenuXml, cheminFichierJson);
        } else {
            console.log("Erreur : la valeur est null");
            return Promise.resolve(); // Assurer qu'un Promise est retourné
        }
    })
    .catch((erreur) => console.error("Erreur trouvé : ", erreur));
*/

    
