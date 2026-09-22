import re, html as H, sys, os

STAMP = open('marchio-mini-b64.txt').read().strip()
OCRA, VERDE, INK, MUTED = '#B5701A', '#5F7F4E', '#2E2A25', '#7A6A55'
CREMA, CREMA2, BORDO = '#F6F2E8', '#FBF9F3', '#DCD2BF'

def inline(s):
    s = H.escape(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', s)
    return s

def build(path, out):
    src = open(path).read().splitlines()
    title = src[0].lstrip('# ').strip()
    meta  = next(l for l in src if l.startswith('**')).strip()
    m = re.match(r'\*\*(.+?)\*\*\s*·\s*(.*)', meta)
    nome, ctx = (m.group(1), m.group(2)) if m else (meta, '')

    # sezioni
    txt = '\n'.join(src)
    sec_cambiato = re.search(r'## Cosa è cambiato\n(.*?)\n---', txt, re.S).group(1).strip()
    prompt = re.search(r'```\n(.*?)\n```', txt, re.S).group(1)
    sec_prima = re.search(r'## Prima di usarla\n(.*?)\n---', txt, re.S).group(1).strip()
    nota = re.search(r'\n\*(Se preferisci[^\n]*)\*\n', txt)

    def blocco(lines):
        out, ul = [], False
        for l in lines.split('\n'):
            l = l.strip()
            if not l: continue
            if l.startswith('- '):
                if not ul: out.append('<ul style="margin:6px 0">'); ul = True
                out.append('<li style="margin-bottom:5px">%s</li>' % inline(l[2:]))
            elif re.match(r'^\d+\. ', l):
                if not ul: out.append('<ul style="margin:6px 0">'); ul = True
                out.append('<li style="margin-bottom:5px">%s</li>' % inline(re.sub(r'^\d+\. ','',l)))
            else:
                if ul: out.append('</ul>'); ul = False
                out.append('<p style="margin:0 0 9px 0; line-height:1.45">%s</p>' % inline(l))
        if ul: out.append('</ul>')
        return '\n'.join(out)

    h = []
    h.append('<html><body style="font-family:Calibri; color:%s; font-size:11pt">' % INK)
    # intestazione
    h.append('<table width="100%%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:3px solid %s; padding-bottom:8px">' % OCRA)
    h.append('<p style="margin:0; font-size:8.5pt; letter-spacing:2px; color:%s"><b>EDU-GENAI 2 · REVISIONE DELLA GEM PERSONALE</b></p>' % VERDE)
    h.append('<h1 style="margin:6px 0 2px 0; font-size:24pt; color:%s">%s</h1>' % (INK, H.escape(title.replace(' — versione rivista',''))))
    h.append('<p style="margin:0; font-size:12pt; color:%s"><b>%s</b> · %s</p>' % (MUTED, H.escape(nome), H.escape(ctx)))
    h.append('</td></tr></table>')
    h.append('<p style="margin:10px 0 18px 0; font-size:9.5pt; color:%s"><i>Revisione a cura della formatrice — Prof.ssa Francesca Sabatini</i></p>' % MUTED)
    # cosa è cambiato
    h.append('<h2 style="color:%s; font-size:15pt; margin:0 0 8px 0">Cosa è cambiato</h2>' % OCRA)
    h.append(blocco(sec_cambiato))
    # prompt
    h.append('<p style="page-break-before:always; margin:0"></p>')
    h.append('<h2 style="color:%s; font-size:15pt; margin:22px 0 8px 0">Le istruzioni da copiare</h2>' % OCRA)
    h.append('<table width="100%%" cellpadding="8" cellspacing="0" bgcolor="%s"><tr><td>'
             '<p style="margin:0; color:#FFFFFF; font-size:10.5pt"><b>Seleziona tutto il riquadro qui sotto</b> e incollalo nel campo «Istruzioni» della tua Gem, sostituendo il testo attuale.</p>'
             '</td></tr></table>' % VERDE)
    h.append('<table width="100%%" cellpadding="16" cellspacing="0" bgcolor="%s" style="border:1px solid %s"><tr><td>' % (CREMA, BORDO))
    h.append('<pre style="font-family:Consolas,\'Courier New\',monospace; font-size:9.5pt; line-height:1.38; margin:0; color:%s; white-space:pre-wrap">%s</pre>' % (INK, H.escape(prompt)))
    h.append('</td></tr></table>')
    if nota:
        h.append('<p style="margin:8px 0 0 0; font-size:9.5pt; color:%s"><i>%s</i></p>' % (MUTED, inline(nota.group(1))))
    # prima di usarla
    h.append('<h2 style="color:%s; font-size:15pt; margin:24px 0 8px 0">Prima di usarla</h2>' % OCRA)
    h.append('<table width="100%%" cellpadding="14" cellspacing="0" bgcolor="%s" style="border-left:4px solid %s"><tr><td>' % (CREMA2, OCRA))
    h.append(blocco(sec_prima))
    h.append('</td></tr></table>')
    # sigillo
    h.append('<p style="text-align:center; margin-top:26px"><img src="data:image/png;base64,%s" width="105" height="105"></p>' % STAMP)
    h.append('<p style="text-align:center; font-size:8.5pt; color:%s; margin:0"><i>Materiale del corso Edu-GenAI 2 — Snodo VOLTERRA AI-MASTER HUB</i></p>' % MUTED)
    h.append('</body></html>')
    open(out,'w').write('\n'.join(h))
    return len('\n'.join(h))

base='/home/user/consulente-commerciale/progetto-snodi/corsi/edu-genai-2/gem-corsisti/'
for src,out in [('gem-carla-lettere.md','doc-carla.html'),('gem-katia-inglese.md','doc-katia.html'),
                ('gem-ilaria-arte-disegno.md','doc-ilaria.html'),('gem-chiara-matematica-fisica.md','doc-chiara.html')]:
    print(out, build(base+src, out))
