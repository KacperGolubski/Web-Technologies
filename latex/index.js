const matrixSizeSelect = document.getElementById("matrix_size");
const matrixFieldsContainer = document.getElementById("matrix_fields");
const matrixOperations = document.getElementById("operation_type");

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
    if(matrixSizeSelect.value === "2") {
        let m00 = parseFloat(document.getElementById("m00").value);
        let m01 = parseFloat(document.getElementById("m01").value);
        let m10 = parseFloat(document.getElementById("m10").value);
        let m11 = parseFloat(document.getElementById("m11").value);
        if(isNaN(m00) || isNaN(m01) || isNaN(m10) || isNaN(m11)) {
            alert("Uzupełnij wszsytkie pola");
            return;
        }
        let result = m00 * m11 - m10 * m01;
        if(matrixOperations.value === "determinant"){
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
        } else if (matrixOperations.value === "inverse") {
            if (result === 0){
                alert("Wyznacznik macierzy jest równy 0. Macierz nie ma macierzy odwrotnej");
                return;
            }
            let inv00 = m11/result;
            let inv01 = -m01/result;
            let inv10 = -m10/result;
            let inv11 = m00/result;
            let latexString = `
            Krok 1: Wzór na macierz odwrotną 2x2:
            $$ A^{-1} = \\frac{1}{\\det A} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} $$
            
            Krok 2: Podstawiamy Twoje liczby:
            $$ A^{-1} = \\frac{1}{${result}} \\begin{bmatrix} ${m11} & ${-m01} \\\\ ${-m10} & ${m00} \\end{bmatrix} $$
            
            Krok 3: Wynik końcowy:
            $$ A^{-1} = \\begin{bmatrix} ${inv00} & ${inv01} \\\\ ${inv10} & ${inv11} \\end{bmatrix} $$
            `;

            document.getElementById("solution_steps").innerHTML = latexString;
            if (window.MathJax) { MathJax.typesetPromise(); }
        }

    }
    else if (matrixSizeSelect.value === "3"){
        let m00 = parseFloat(document.getElementById("m00").value);
        let m01 = parseFloat(document.getElementById("m01").value);
        let m02 = parseFloat(document.getElementById("m02").value);
        let m10 = parseFloat(document.getElementById("m10").value);
        let m11 = parseFloat(document.getElementById("m11").value);
        let m12 = parseFloat(document.getElementById("m12").value);
        let m20 = parseFloat(document.getElementById("m20").value);
        let m21 = parseFloat(document.getElementById("m21").value);
        let m22 = parseFloat(document.getElementById("m22").value);
        if(isNaN(m00) || isNaN(m01) || isNaN(m02) || isNaN(m10) || isNaN(m11) || isNaN(m12) || isNaN(m20) || isNaN(m21) || isNaN(m22)) {
            alert("Uzupełnij wszsytkie pola");
            return;
        }
        let result = m00*m11*m22 + m01*m12*m20 + m02*m10*m21 - (m20*m11*m02 + m21*m12*m00 + m22*m10*m01);
        let latexString = `
        Krok 1: Wzór na wyznacznik macierzy 3x3 (Reguła Sarrusa):
        $$ \\det \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - (ceg + afh + bdi) $$
        
        Krok 2: Podstawiamy Twoje liczby:
        $$ \\det \\begin{bmatrix} ${m00} & ${m01} & ${m02} \\\\ ${m10} & ${m11} & ${m12} \\\\ ${m20} & ${m21} & ${m22} \\end{bmatrix} = $$
        $$ (${m00} \\cdot ${m11} \\cdot ${m22}) + (${m01} \\cdot ${m12} \\cdot ${m20}) + (${m02} \\cdot ${m10} \\cdot ${m21}) - ((${m02} \\cdot ${m11} \\cdot ${m20}) + (${m00} \\cdot ${m12} \\cdot ${m21}) + (${m01} \\cdot ${m10} \\cdot ${m22})) $$
        
        Krok 3: Wynik końcowy:
        $$ Wyznacznik = ${result} $$
        `;
        document.getElementById("solution_steps").innerHTML = latexString;
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        }
});
