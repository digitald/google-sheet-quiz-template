# google-sheet-quiz-template

**Template: App per Quiz con Google Sheets e Apps Script**

Questo repository contiene il codice sorgente per un'applicazione web per quiz (con salvataggio dei risultati) che utilizza Google Sheets come database.

È il codice di accompagnamento per l'articolo del blog \[INSERISCI QUI IL LINK AL TUO ARTICOLO\].

**Caratteristiche**

*   **Database su Google Sheets:** Aggiungi nuovi test semplicemente creando un nuovo foglio (tab).
*   **Accesso Mobile-First:** L'interfaccia è pulita e reattiva.
*   **Salvataggio Risultati:** Una versione "valutata" che salva Nome, Cognome e Punteggio in un foglio Risultati.
*   **Validazione Server-Side:** Il punteggio viene ricalcolato sul server (Codice.gs) per sicurezza, prevenendo manomissioni.

**Istruzioni di Installazione (5 Minuti)**

Per far funzionare questo template, segui questi passaggi:

**1. Crea il Google Sheet**

1.  Crea un nuovo **Foglio Google** nel tuo Google Drive.
2.  Rinominalo (es. "Database Quiz Valutati").

**2. Configura i Fogli (Tab)**

Hai bisogno di due fogli (tab) con intestazioni specifiche:

1.  **Crea il foglio** **Risultati**:
    *   Rinomina il primo foglio in Risultati.
    *   Nella Riga 1, copia e incolla queste intestazioni (da A a F): Timestamp Nome Cognome NomeTest Punteggio Percentuale
2.  **Crea il tuo primo Test (es.** **Test1****)**:
    *   Aggiungi un nuovo foglio e rinominalo Test1.
    *   Nella Riga 1, copia e incolla queste intestazioni (da A a I): ID Domanda OpzioneA OpzioneB OpzioneC OpzioneD RispostaCorretta Suggerimento Correzione
    *   **Importante:** La colonna RispostaCorretta (G) deve contenere la *lettera* dell'opzione giusta (es. 'A', 'B' o 'C').
    *   Aggiungi 2-3 domande di prova nelle righe sottostanti.

**3. Incolla il Codice in Apps Script**

1.  Nel tuo Google Sheet, vai su Estensioni > Apps Script.
2.  Si aprirà un editor. Vedrai un file Codice.gs.
3.  **Copia** il contenuto di Codice.gs da questo repository e **incollalo** nel tuo file, sostituendo tutto.
4.  Crea gli altri due file:
    *   Clicca sul + > HTML e nominalo Quiz.
    *   **Copia** il contenuto di Quiz.html e incollalo.
    *   Clicca sul + > HTML e nominalo Stile.
    *   **Copia** il contenuto di Stile.html e incollalo.
5.  Salva tutti i file (icona 💾).

**4. Pubblica (Deploy) l'Applicazione**

1.  Nell'editor di Apps Script, clicca su Distribuisci > Nuova distribuzione.
2.  Clicca sull'icona **Ingranaggio ⚙️** e seleziona **Applicazione web**.
3.  Compila i campi:
    *   **Descrizione:** Quiz App v1
    *   **Esegui come:** Me (tuo@email.com)
    *   **Chi ha accesso:** **Chiunque** (Questo è FONDAMENTALE per permettere l'accesso anonimo).
4.  Clicca Distribuisci.
5.  Ti chiederà l'**Autorizzazione**. Clicca Autorizza accesso.
6.  Scegli il tuo account.
7.  Clicca su Avanzate e poi su Vai a \[Nome Progetto\] (non sicuro).
8.  Clicca Consenti.

**5. Fatto\!**

Copia l'**URL dell'applicazione web** (.../exec) che ti viene mostrato.

*   **Per accedere a** **Test1****:** Usa l'URL base (.../exec)
*   **Per accedere a un altro test (es.** **TestVideo****):** Crea un nuovo foglio chiamato TestVideo e usa l'URL .../exec?test=TestVideo.

```
