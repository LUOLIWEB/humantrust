let log = [];

const editor = document.getElementById("editor");

// Captura de teclado
editor.addEventListener("keydown", (e) => {
    log.push({
        type: "keyboard",
        key: e.key,
        timestamp: Date.now()
    });
});

// Captura de mouse
editor.addEventListener("mousedown", (e) => {
    log.push({
        type: "mouse",
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
    });
});

// Iniciar gravação
function iniciarGravacao() {
    log = [];
    alert("Gravação iniciada!");
}

// Parar e analisar
async function pararEAnalisar() {
    alert("Gravação finalizada, analisando...");

    // Pyodide
    let pyodide = await loadPyodide({indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"});
    await pyodide.loadPackage(['matplotlib', 'json']);

    const pyCode = `
import json
import math

def analisar_eventos(log):
    tempos = [e["timestamp"] for e in log]
    tempos.sort()
    duracao = (tempos[-1] - tempos[0])/1000 if len(tempos)>1 else 0
    total = len(log)
    return {"duracao": duracao, "total_eventos": total}

log = json.loads('${JSON.stringify(log)}')
resultado = analisar_eventos(log)
resultado
`;

    const resultado = await pyodide.runPythonAsync(pyCode);
    console.log("Resultado da análise:", resultado);

    alert("Análise concluída! Confira console para detalhes.");
}
