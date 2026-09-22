#!/usr/bin/env python3
"""Ripristina l'arco inferiore del marchio FS, tagliato in fase di export.

Nessun elemento viene inventato: centro, raggi, spessori, passo e lunghezza
dei trattini sono misurati sulla porzione integra dell'originale.
"""
import math
from PIL import Image, ImageDraw

SRC = 'marchio-fs.png'
OUT = 'marchio-fs-completo.png'

CX = CY = 1049.5
INK = (17, 17, 17)
S = 4  # supersampling

# misurati sull'originale
ANELLI = [(898, 906), (1009, 1018)]   # cerchi sottili interrotti
DASH_R = (939, 977)                   # fascia dei trattini
DASH_N = 92                           # trattini sul giro completo
DASH_PHASE = 0.8                      # gradi, centro del primo trattino
DASH_LEN = 1.584                      # gradi, arco di un trattino
TAGLIO_Y = 1838                       # ultima riga di disegno superstite

src = Image.open(SRC).convert('RGB')
W, H = src.size

over = Image.new('L', (W * S, H * S), 0)
d = ImageDraw.Draw(over)
cx, cy = CX * S, CY * S


def anello(r_int, r_est, a0, a1):
    """Settore anulare fra due raggi, da a0 a a1 (gradi, y verso il basso).

    Si usa arc() con spessore: pieslice sovrapposti si cancellerebbero
    a vicenda quando un anello esterno passa sopra a uno interno.
    """
    R = r_est * S
    d.arc([cx - R, cy - R, cx + R, cy + R], a0, a1,
          fill=255, width=int(round((r_est - r_int) * S)))


# 1 · i due cerchi sottili: si ridisegna solo il settore mancante, con margine
for r_int, r_est in ANELLI:
    # semiampiezza dell'arco perduto per quel raggio
    dy = TAGLIO_Y - CY
    a = math.degrees(math.asin(min(1.0, dy / r_int)))
    anello(r_int, r_est, a - 0.4, 180 - a + 0.4)

# 2 · i trattini caduti nel settore tagliato
for k in range(DASH_N):
    c = DASH_PHASE + k * 360.0 / DASH_N
    y_c = CY + DASH_R[1] * math.sin(math.radians(c))
    if y_c <= TAGLIO_Y:
        continue  # trattino già presente nell'originale
    anello(DASH_R[0], DASH_R[1], c - DASH_LEN / 2, c + DASH_LEN / 2)

over = over.resize((W, H), Image.LANCZOS)

out = src.copy()
tinta = Image.new('RGB', (W, H), INK)
out.paste(tinta, (0, 0), over)
out.save(OUT)

# controllo: il disegno arriva ora al fondo del cerchio?
g = out.convert('L')
px = g.load()
bot = max(y for y in range(H) if any(px[x, y] < 200 for x in range(W)))
print('bordo inferiore del disegno:', bot, '(atteso ~2068)')
for r in (902, 1013):
    buchi = 0
    for i in range(3600):
        a = 2 * math.pi * i / 3600
        x, y = CX + r * math.cos(a), CY + r * math.sin(a)
        if px[int(x), int(y)] >= 200:
            buchi += 1
    print('anello r=%d  punti scoperti: %d/3600' % (r, buchi))
n = 0
for i in range(7200):
    a = 2 * math.pi * i / 7200
    x, y = CX + 958 * math.cos(a), CY + 958 * math.sin(a)
    if px[int(x), int(y)] < 200:
        n += 1
print('copertura fascia trattini: %.3f (attesa ~0.40)' % (n / 7200))
