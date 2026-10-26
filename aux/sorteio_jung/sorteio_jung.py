import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import secrets
from datetime import datetime

TEMAS = [
    ('Capítulo 7', 'Temas oníricos comuns', '135–150'),
    ('Capítulo 8 — Parte I', 'A moldura do sonho — parte I', '151–155'),
    ('Capítulo 8 — Parte II', 'A moldura do sonho — parte II', '156–162'),
    ('Capítulo 9', 'O simbolismo em alquimia e conclusão', '163–170'),
]

class SorteioApp:
    def __init__(self, root):
        self.root = root
        root.title('Sorteio do Seminário • Jung')
        root.geometry('900x720')
        root.minsize(740, 650)
        root.configure(bg='#101827')
        self.resultado = []
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TEntry', padding=9, font=('Segoe UI', 12))
        main = tk.Frame(root, bg='#101827', padx=32, pady=26)
        main.pack(fill='both', expand=True)
        tk.Label(main, text='SORTEIO DO SEMINÁRIO', fg='#7DD3FC', bg='#101827', font=('Segoe UI', 12, 'bold')).pack(anchor='w')
        tk.Label(main, text='Jung e a Interpretação dos Sonhos', fg='white', bg='#101827', font=('Segoe UI', 24, 'bold')).pack(anchor='w', pady=(6, 5))
        tk.Label(main, text='4 participantes  •  Capítulos 7, 8 e 9  •  James A. Hall', fg='#B6C4D8', bg='#101827', font=('Segoe UI', 11)).pack(anchor='w', pady=(0, 20))
        tk.Label(main, text='Digite os nomes dos quatro alunos', fg='white', bg='#101827', font=('Segoe UI', 13, 'bold')).pack(anchor='w', pady=(0, 10))
        grid = tk.Frame(main, bg='#101827')
        grid.pack(fill='x')
        self.campos = []
        for i in range(4):
            cell = tk.Frame(grid, bg='#101827')
            cell.grid(row=i//2, column=i%2, sticky='ew', padx=(0 if i%2 == 0 else 12, 0), pady=7)
            tk.Label(cell, text=f'Aluno {i+1}', fg='#B6C4D8', bg='#101827', font=('Segoe UI', 10)).pack(anchor='w', pady=(0, 4))
            entry = ttk.Entry(cell)
            entry.pack(fill='x')
            self.campos.append(entry)
        grid.columnconfigure(0, weight=1)
        grid.columnconfigure(1, weight=1)
        botoes = tk.Frame(main, bg='#101827')
        botoes.pack(fill='x', pady=18)
        tk.Button(botoes, text='🎲  REALIZAR SORTEIO', command=self.sortear, bg='#38BDF8', fg='#07111E', activebackground='#7DD3FC', relief='flat', padx=18, pady=11, font=('Segoe UI', 11, 'bold'), cursor='hand2').pack(side='left')
        tk.Button(botoes, text='Salvar resultado em PDF', command=self.salvar_pdf, bg='#25344B', fg='white', relief='flat', padx=15, pady=11, font=('Segoe UI', 10), cursor='hand2').pack(side='left', padx=12)
        tk.Label(main, text='RESULTADO DO SORTEIO', fg='#7DD3FC', bg='#101827', font=('Segoe UI', 11, 'bold')).pack(anchor='w', pady=(4, 10))
        self.saida = tk.Frame(main, bg='#101827')
        self.saida.pack(fill='both', expand=True)
        self.mostrar_inicial()
        tk.Label(main, text='Cada aluno recebe um tema. O capítulo 8 foi dividido em duas partes, conforme o roteiro do seminário.', fg='#B6C4D8', bg='#101827', font=('Segoe UI', 9), wraplength=780).pack(anchor='w', pady=(12, 0))

    def limpar_saida(self):
        for item in self.saida.winfo_children():
            item.destroy()

    def mostrar_inicial(self):
        self.limpar_saida()
        tk.Label(self.saida, text='Os resultados aparecerão aqui após o sorteio.', bg='#1C293D', fg='#C6D4E7', font=('Segoe UI', 12), pady=28).pack(fill='x')

    def sortear(self):
        nomes = [e.get().strip() for e in self.campos]
        if any(not n for n in nomes):
            messagebox.showwarning('Nomes incompletos', 'Preencha os nomes dos quatro alunos.')
            return
        if len({n.casefold() for n in nomes}) != 4:
            messagebox.showwarning('Nomes repetidos', 'Informe quatro nomes diferentes.')
            return
        ordem = list(TEMAS)
        secrets.SystemRandom().shuffle(ordem)
        self.resultado = list(zip(nomes, ordem))
        self.limpar_saida()
        for nome, (cap, titulo, paginas) in self.resultado:
            card = tk.Frame(self.saida, bg='#1C293D', padx=15, pady=10)
            card.pack(fill='x', pady=4)
            tk.Label(card, text=nome, bg='#1C293D', fg='white', font=('Segoe UI', 12, 'bold')).pack(anchor='w')
            tk.Label(card, text=f'{cap}  •  {titulo}  •  páginas {paginas}', bg='#1C293D', fg='#A5DDFB', font=('Segoe UI', 10), wraplength=760, justify='left').pack(anchor='w', pady=(3, 0))

    def salvar_pdf(self):
        if not self.resultado:
            messagebox.showinfo('Sem resultado', 'Realize o sorteio antes de salvar.')
            return
        try:
            from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
            from reportlab.lib import colors
            from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
            from reportlab.lib.enums import TA_CENTER
            from reportlab.lib.pagesizes import A4
            from reportlab.lib.units import cm
        except ImportError:
            messagebox.showerror('Biblioteca ausente', 'Instale a biblioteca PDF com: pip install reportlab')
            return
        caminho = filedialog.asksaveasfilename(defaultextension='.pdf', filetypes=[('PDF', '*.pdf')], initialfile='resultado_sorteio_jung.pdf')
        if not caminho:
            return
        doc = SimpleDocTemplate(caminho, pagesize=A4, rightMargin=1.8*cm, leftMargin=1.8*cm, topMargin=2*cm, bottomMargin=2*cm)
        styles = getSampleStyleSheet()
        styles.add(ParagraphStyle(name='JungTitle', parent=styles['Title'], fontSize=18, leading=23, textColor=colors.HexColor('#142C49'), alignment=TA_CENTER, spaceAfter=14))
        styles.add(ParagraphStyle(name='JungCell', parent=styles['Normal'], fontSize=9, leading=13))
        story = [Paragraph('Resultado do Sorteio — Seminário Jung', styles['JungTitle']), Paragraph('Jung e a Interpretação dos Sonhos — James A. Hall', styles['Normal']), Spacer(1, 12), Paragraph(f'Data: {datetime.now():%d/%m/%Y %H:%M}', styles['Normal']), Spacer(1, 18)]
        dados = [[Paragraph('<b>Aluno</b>', styles['JungCell']), Paragraph('<b>Conteúdo</b>', styles['JungCell']), Paragraph('<b>Páginas</b>', styles['JungCell'])]]
        for nome, (cap, titulo, paginas) in self.resultado:
            dados.append([Paragraph(nome.replace('&', '&amp;').replace('<', '&lt;'), styles['JungCell']), Paragraph(f'<b>{cap}</b><br/>{titulo}', styles['JungCell']), Paragraph(paginas, styles['JungCell'])])
        tabela = Table(dados, colWidths=[4.3*cm, 8.5*cm, 2.3*cm], repeatRows=1, hAlign='LEFT')
        tabela.setStyle(TableStyle([('BACKGROUND', (0,0), (-1,0), colors.HexColor('#DDEFFC')), ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F4F8FC')]), ('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 12), ('TOPPADDING', (0,0), (-1,-1), 12), ('LINEBELOW', (0,0), (-1,-1), 0.3, colors.HexColor('#CBD5E1'))]))
        story.append(tabela)
        story.extend([Spacer(1, 20), Paragraph('O capítulo 8 foi dividido em duas partes, conforme o roteiro do seminário.', styles['Normal'])])
        try:
            doc.build(story)
            messagebox.showinfo('PDF salvo', f'Arquivo salvo em:\n{caminho}')
        except Exception as exc:
            messagebox.showerror('Erro ao salvar', str(exc))

if __name__ == '__main__':
    janela = tk.Tk()
    SorteioApp(janela)
    janela.mainloop()
