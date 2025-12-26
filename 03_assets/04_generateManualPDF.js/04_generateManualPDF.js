function gerarManualPDF() {
    const doc = new jsPDF('p','pt','a4');

    doc.setFontSize(20);
    doc.text("Manual Visual MVP HumanTrust", 40, 50);

    doc.setFontSize(12);
    const texto = `
Fluxo completo do MVP HumanTrust:

1. Login KYC
2. Seleção do documento (TCC, livro, artigo, relatório, música)
3. Criação no editor minimalista
4. Gravador captura teclado/mouse/timestamp
5. Análise em tempo real via Pyodide
6. Laudo Técnico + Gráfico de Metadados
7. PDF Pro: Documento + Laudo + Gráfico + QR Code + Dados KYC
8. Auditoria Digital: Download / E-mail
9. Auditoria Impressa: Impressão com QR Code para validação
`;
    doc.text(texto, 40, 80, {maxWidth: 520});

    // Inserir diagrama do fluxo
    const img = new Image();
    img.src = "assets/05_diagrama_fluxo.png";
    img.onload = function() {
        doc.addImage(img, 'PNG', 40, 250, 520, 400);
        doc.save("Manual_HumanTrust_MVP.pdf");
    };
}
