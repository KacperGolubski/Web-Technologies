const matrixSizeSelect = document.getElementById("matrix_size");
const matrixFieldsContainer = document.getElementById("matrix_fields");

matrixSizeSelect.addEventListener("change", function() {
    let size = matrixSizeSelect.value;

    if (size === "2") {
        matrixFieldsContainer.innerHTML = `
            <input type="number" id="m00" value="1">
            <input type="number" id="m01" value="2">
            <br>
            <input type="number" id="m10" value="3">
            <input type="number" id="m11" value="4">
        `;
    } else if (size === "3") {
        matrixFieldsContainer.innerHTML = `
            <input type="number" id="m00" value="1">
            <input type="number" id="m01" value="2">
            <input type="number" id="m02" value="3">
            <br>
            <input type="number" id="m10" value="4">
            <input type="number" id="m11" value="5">
            <input type="number" id="m12" value="6">
            <br>
            <input type="number" id="m20" value="7">
            <input type="number" id="m21" value="8">
            <input type="number" id="m22" value="9">
        `;
    }
});

const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", function() {
    let m00 = parseFloat(document.getElementById("m00").value);
    let m01 = parseFloat(document.getElementById("m01").value);
    let m10 = parseFloat(document.getElementById("m10").value);
    let m11 = parseFloat(document.getElementById("m11").value);
    let result = m00 * m11 - m10 * m01;
    let latexString = `
    Krok 1: Wzór na wyznacznik macierzy 2x2: 
    $$ \\det \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = a \\cdot d - b \\cdot c $$

    Krok 2: Podstawiamy Twoje liczby: 
    $$ \\det \\begin{bmatrix} ${m00} & ${m01} \\\\ ${m10} & ${m11} \\end{bmatrix} = ${m00} \\cdot ${m11} - ${m01} \\cdot ${m10} $$
    
    Krok 3: Wynik końcowy: 
    $$ Wyznacznik = ${result} $$
    `;

    document.getElementById("solution_steps").innerHTML = latexString;
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
    console.log("Moja macierz 2x2:");
    console.log(m00, m01);
    console.log(m10, m11);
});