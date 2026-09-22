# Marchio FS — versione con il cerchio chiuso

## Il problema

Il file del marchio arrivato in sessione era **tagliato**: su una tela di 2100×2100 il
disegno si fermava alla riga **y = 1838**, con un taglio orizzontale netto. Mancavano
l'arco inferiore di due cerchi e diciassette trattini della corona esterna, e il
cerchio risultava **aperto in basso**. Il difetto si è propagato a tutte le riduzioni
(280 px e 150 px) e quindi a tutti i materiali timbrati.

## Il ripristino

`../ripara-marchio.py` ricostruisce la parte mancante **sulla geometria misurata
sull'originale**, non su una ricostruzione a occhio:

| grandezza | valore misurato |
|---|---|
| centro | (1049,5 · 1049,5) |
| cerchio esterno | r 1009–1018 |
| cerchio mediano | r 898–906 |
| cerchio interno | r 698–705 (era già integro) |
| fascia dei trattini | r 939–977 |
| trattini sul giro | 92, passo 3,913°, arco 1,584°, fase 0,8° |
| inchiostro | #111111 |

Che il difetto fosse un taglio e non una scelta grafica è dimostrato dal fatto che le
due interruzioni — ampie 57,8° sul cerchio mediano e 77,6° su quello esterno — hanno
gli estremi **alla stessa ordinata**, y ≈ 1839: una riga orizzontale, non un arco.

Controllo dopo il ripristino: 0 punti scoperti su 3600 su entrambi gli anelli,
copertura della fascia dei trattini 0,411 (attesa ≈ 0,40).

## I file

| file | uso |
|---|---|
| `marchio-fs.png` | 2100 px, originale ripristinato |
| `marchio-fs-small.png` | 280 px, per i .docx (`md2docx.js`) |
| `marchio-mini.png` | 150 px, per i Google Documenti |
| `marchio-mini-b64.txt` | il 150 px in base64, incorporato nell'HTML da `gem2doc.py` |
| `marchio-b64.txt` | il 280 px in base64 |

**Se in futuro compare il file sorgente** (SVG, Canva o l'export originale integro),
va preferito a questo: qui gli archi inferiori sono ricalcolati, e per quanto la
geometria sia corretta restano un ripristino.
