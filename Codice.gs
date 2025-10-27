/**
 * Funzione principale che carica la Web App.
 * 'e' contiene i parametri dell'URL, come ?test=Test1
 */
function doGet(e) {
  // Legge il parametro 'test' dall'URL. Se non c'è, usa 'Test1'.
  let nomeTest = e.parameter.test || 'Test1'; 
  
  // Carica il file HTML come un template
  let template = HtmlService.createTemplateFromFile('Quiz');
  
  // Passa la variabile 'nomeTest' all'HTML
  template.nomeTest = nomeTest;
  
  // Costruisce e pubblica l'HTML
  return template.evaluate()
    .setTitle('Quiz App Template')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * Helper per includere altri file (Stile.html) nel template.
 */
function includi(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

/**
 * [ESPOSTA] Chiamata dal client per caricare TUTTI i dati del quiz.
 */
function getDomande(nomeFoglio) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(nomeFoglio);
    
    if (!sheet) {
      throw new Error("Foglio test '" + nomeFoglio + "' non trovato.");
    }
    
    // Legge 9 colonne (A-I)
    const dati = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues();

    const domande = dati.map(riga => {
      // A[0]=ID, B[1]=Domanda, C[2]=OpA, D[3]=OpB, E[4]=OpC, F[5]=OpD
      // G[6]=LetteraCorretta, H[7]=Suggerimento, I[8]=Correzione
      
      let opzioni = [riga[2], riga[3], riga[4]]; 
      if (riga[5] && riga[5].toString().trim() !== "") {
        opzioni.push(riga[5]);
      }
      
      let testoCorretto = '';
      const letteraCorretta = riga[6].toString().toUpperCase().trim();
      
      if (letteraCorretta === 'A') testoCorretto = riga[2];
      else if (letteraCorretta === 'B') testoCorretto = riga[3];
      else if (letteraCorretta === 'C') testoCorretto = riga[4];
      else if (letteraCorretta === 'D') testoCorretto = riga[5];
      
      return {
        id: riga[0],
        domanda: riga[1],
        opzioni: opzioni,
        suggerimento: riga[7],
        rispostaCorretta: testoCorretto,
        correzione: riga[8] || ''
      };
    });
    
    const domandeFiltrate = domande.filter(d => d.domanda && d.domanda.trim() !== '');
    return { domande: domandeFiltrate };

  } catch (e) {
    Logger.log('Errore in getDomande: ' + e.message);
    return { errore: 'Errore nel caricamento dei dati: ' + e.message };
  }
}

/**
 * [ESPOSTA] Riceve i dati, RICONVALIDA il punteggio e salva sul foglio "Risultati".
 */
function salvaRisultati(datiStudente, nomeTest) {
  try {
    const FOGLIO_RISULTATI = "Risultati"; 
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetTest = ss.getSheetByName(nomeTest);
    const sheetRisultati = ss.getSheetByName(FOGLIO_RISULTATI);

    if (!sheetTest) { throw new Error("Foglio test '" + nomeTest + "' non trovato."); }
    if (!sheetRisultati) { throw new Error("Foglio 'Risultati' non trovato."); }
    
    // --- 1. Riconvalida del punteggio ---
    const datiTest = sheetTest.getRange(2, 1, sheetTest.getLastRow() - 1, 7).getValues();
    const mappaRisposteCorrette = {};
    
    datiTest.forEach(riga => {
      if(riga[0] && riga[0].toString().trim() !== "") {
        const id = riga[0];
        const letteraCorretta = riga[6].toString().toUpperCase().trim();
        let testoCorretto = '';
        if (letteraCorretta === 'A') testoCorretto = riga[2];
        else if (letteraCorretta === 'B') testoCorretto = riga[3];
        else if (letteraCorretta === 'C') testoCorretto = riga[4];
        else if (letteraCorretta === 'D') testoCorretto = riga[5];
        mappaRisposteCorrette[id] = testoCorretto;
      }
    });

    let punteggio = 0;
    const totaleDomande = datiStudente.risposte.length;
    
    datiStudente.risposte.forEach(risposta => {
      if (risposta.risposta === mappaRisposteCorrette[risposta.id]) {
        punteggio++;
      }
    });

    // --- 2. Salvataggio dei Dati ---
    const timestamp = new Date();
    const punteggioFormattato = `${punteggio}/${totaleDomande}`;
    const percentuale = Math.round((punteggio / totaleDomande) * 100);

    sheetRisultati.appendRow([
      timestamp,
      datiStudente.nome,
      datiStudente.cognome,
      nomeTest,
      punteggioFormattato,
      percentuale
    ]);
    
    return { success: true, punteggio: punteggioFormattato };

  } catch (e) {
    Logger.log('Errore in salvaRisultati: ' + e.message);
    return { success: false, message: e.message };
  }
}
