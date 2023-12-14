"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const xml2js = __importStar(require("xml2js"));
const lireFichier = util.promisify(fs.readFile);
const ecrireFichier = util.promisify(fs.writeFile);
function parserFichierXmlEtEcrireJson(cheminFichierXML, cheminFichierJson) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const donneesXml = yield lireFichier(cheminFichierXML, 'utf-8');
            const parser = new xml2js.Parser();
            const donneesParsees = yield parser.parseStringPromise(donneesXml);
            yield ecrireFichier(cheminFichierJson, JSON.stringify(donneesParsees, null, 2));
            console.log("Fichier JSON créé", cheminFichierJson);
        }
        catch (erreur) {
            console.error("Erreur : ", erreur);
        }
    });
}
const cheminFichierXml = "./XML/Suivi insert.bpml";
const cheminFichierJson = "./JSON/Suivi insert.json";
parserFichierXmlEtEcrireJson(cheminFichierXml, cheminFichierJson);
