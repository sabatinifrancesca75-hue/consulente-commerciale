#!/usr/bin/env python3
"""Converte un .md del corso in HTML impaginato, pronto per Google Documenti.

Palette del marchio, timbro in chiusura. Gestisce titoli, paragrafi,
elenchi, tabelle, citazioni, blocchi di codice e separatori.

    python3 md2doc.py <file.md> <out.html> ["occhiello"]
"""
import html as H
import os
import re
import sys

QUI = os.path.dirname(os.path.abspath(__file__))
STAMP = open(os.path.join(QUI, 'marchio', 'marchio-mini-b64.txt')).read().strip()

OCRA, VERDE, INK, MUTED = '#B5701A', '#5F7F4E', '#2E2A25', '#7A6A55'
CREMA, CREMA2, BORDO = '#F6F2E8', '#FBF9F3', '#DCD2BF'


def inline(s):
    s = H.escape(s)
    s = re.sub(r'`([^`]+)`',
               r'<span style="font-family:Consolas,monospace; font-size:9.5pt">\1</span>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', s)
    s = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', s)
    return s


def tabella(righe):
    """righe: lista di stringhe markdown che cominciano e finiscono con |."""
    def celle(r):
        return [c.strip() for c in r.strip().strip('|').split('|')]
    testa = celle(righe[0])
    corpo = [celle(r) for r in righe[2:]]
    o = ['<table width="100%%" cellpadding="7" cellspacing="0" '
         'style="border-collapse:collapse; margin:10px 0; font-size:10pt">' % ()]
    o.append('<tr bgcolor="%s">' % CREMA)
    for c in testa:
        o.append('<td style="border:1px solid %s"><b>%s</b></td>' % (BORDO, inline(c)))
    o.append('</tr>')
    for r in corpo:
        o.append('<tr>')
        for c in r:
            o.append('<td style="border:1px solid %s; vertical-align:top">%s</td>'
                     % (BORDO, inline(c)))
        o.append('</tr>')
    o.append('</table>')
    return o


def converti(md):
    righe = md.split('\n')
    o, i = [], 0
    while i < len(righe):
        l = righe[i]
        s = l.strip()

        if not s:
            i += 1
            continue

        # blocco di codice
        if s.startswith('```'):
            blocco = []
            i += 1
            while i < len(righe) and not righe[i].strip().startswith('```'):
                blocco.append(righe[i])
                i += 1
            i += 1
            o.append('<table width="100%%" cellpadding="14" cellspacing="0" bgcolor="%s" '
                     'style="border:1px solid %s; margin:10px 0"><tr><td>' % (CREMA, BORDO))
            o.append('<pre style="font-family:Consolas,\'Courier New\',monospace; '
                     'font-size:9.5pt; line-height:1.38; margin:0; color:%s; '
                     'white-space:pre-wrap">%s</pre>' % (INK, H.escape('\n'.join(blocco))))
            o.append('</td></tr></table>')
            continue

        # tabella
        if s.startswith('|') and i + 1 < len(righe) and set(righe[i + 1].strip()) <= set('|-: '):
            blocco = []
            while i < len(righe) and righe[i].strip().startswith('|'):
                blocco.append(righe[i])
                i += 1
            o += tabella(blocco)
            continue

        # separatore
        if re.fullmatch(r'-{3,}', s):
            o.append('<hr style="border:0; border-top:1px solid %s; margin:16px 0">' % BORDO)
            i += 1
            continue

        # citazione
        if s.startswith('>'):
            blocco = []
            while i < len(righe) and righe[i].strip().startswith('>'):
                blocco.append(righe[i].strip().lstrip('>').strip())
                i += 1
            testo = ' '.join(x for x in blocco if x)
            o.append('<table width="100%%" cellpadding="12" cellspacing="0" bgcolor="%s" '
                     'style="border-left:4px solid %s; margin:10px 0"><tr><td>'
                     '<p style="margin:0; line-height:1.45">%s</p>'
                     '</td></tr></table>' % (CREMA2, OCRA, inline(testo)))
            continue

        # titoli
        m = re.match(r'^(#{1,4})\s+(.*)', s)
        if m:
            liv, testo = len(m.group(1)), m.group(2)
            if liv == 1:
                i += 1
                continue  # il titolo va nell'intestazione
            dim = {2: '15pt', 3: '12.5pt', 4: '11pt'}[liv]
            col = OCRA if liv == 2 else VERDE
            o.append('<h%d style="color:%s; font-size:%s; margin:20px 0 7px 0">%s</h%d>'
                     % (liv, col, dim, inline(testo), liv))
            i += 1
            continue

        # elenchi
        if re.match(r'^[-*]\s+', s) or re.match(r'^\d+\.\s+', s):
            ordinato = bool(re.match(r'^\d+\.\s+', s))
            tag = 'ol' if ordinato else 'ul'
            o.append('<%s style="margin:6px 0 10px 0">' % tag)
            while i < len(righe):
                t = righe[i].strip()
                if re.match(r'^[-*]\s+', t) or re.match(r'^\d+\.\s+', t):
                    voce = re.sub(r'^([-*]|\d+\.)\s+', '', t)
                    o.append('<li style="margin-bottom:5px; line-height:1.45">%s</li>'
                             % inline(voce))
                    i += 1
                elif not t:
                    break
                else:
                    break
            o.append('</%s>' % tag)
            continue

        # paragrafo
        o.append('<p style="margin:0 0 9px 0; line-height:1.5">%s</p>' % inline(s))
        i += 1
    return o


def build(path, out, occhiello='EDU-GENAI 2 · INCONTRO 5'):
    md = open(path).read()
    righe = md.split('\n')
    titolo = righe[0].lstrip('# ').strip()

    # sottotitolo: la prima riga in corsivo dopo il titolo
    sotto = ''
    for l in righe[1:6]:
        if l.strip().startswith('*') and l.strip().endswith('*'):
            sotto = l.strip().strip('*').strip()
            break

    corpo = '\n'.join(righe[1:])
    if sotto:
        corpo = corpo.replace('*%s*' % sotto, '', 1)
    # via il piè di pagina: lo sostituisce il timbro
    corpo = re.sub(r'\n---\s*\n\*Materiale del corso[^\n]*\n?\s*$', '\n', corpo)

    h = ['<html><body style="font-family:Calibri; color:%s; font-size:11pt">' % INK]
    h.append('<table width="100%%" cellpadding="0" cellspacing="0"><tr>'
             '<td style="border-bottom:3px solid %s; padding-bottom:8px">' % OCRA)
    h.append('<p style="margin:0; font-size:8.5pt; letter-spacing:2px; color:%s">'
             '<b>%s</b></p>' % (VERDE, H.escape(occhiello)))
    h.append('<h1 style="margin:6px 0 2px 0; font-size:23pt; color:%s">%s</h1>'
             % (INK, inline(titolo)))
    if sotto:
        h.append('<p style="margin:0; font-size:12pt; color:%s"><i>%s</i></p>'
                 % (MUTED, inline(sotto)))
    h.append('</td></tr></table>')
    h.append('<p style="margin:10px 0 18px 0; font-size:9.5pt; color:%s">'
             '<i>Prof.ssa Francesca Sabatini — Snodo Formativo VOLTERRA AI-MASTER HUB</i></p>'
             % MUTED)
    h += converti(corpo)
    h.append('<p style="text-align:center; margin-top:26px">'
             '<img src="data:image/png;base64,%s" width="105" height="105"></p>' % STAMP)
    h.append('<p style="text-align:center; font-size:8.5pt; color:%s; margin:0">'
             '<i>Materiale del corso Edu-GenAI 2 — Snodo VOLTERRA AI-MASTER HUB</i></p>' % MUTED)
    h.append('</body></html>')

    testo = '\n'.join(h)
    open(out, 'w').write(testo)
    return len(testo)


if __name__ == '__main__':
    occ = sys.argv[3] if len(sys.argv) > 3 else 'EDU-GENAI 2 · INCONTRO 5'
    print(sys.argv[2], build(sys.argv[1], sys.argv[2], occ))
