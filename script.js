function ekspansi(text) {
    const words = text.toLowerCase().split(" ");

    const hasil = words.map((word) => {
        if (word.length === 0) return "";

        const firstChar = word[0];
        const sisa = word.slice(1);

        if ('aiueo'.includes(firstChar)) {
            return sisa + firstChar + "u";
        } else {
            return sisa + firstChar + "ar";
        }
    });

    return hasil.join(" ");
}

function permutasi(text) {
    const processedText = text.toLowerCase().replace(/\s/g, '_');
    const chars = processedText.split("");
    
    if (chars.length < 5) return processedText;

    const pola = [1, 0, 2, 4, 3];
    let result = "";

    for (let i = 0; i < 5; i++) {
        result += chars[pola[i]];
    }

    if (chars.length > 5) {
        const sisaChars = chars.slice(5);
        
        if (sisaChars.length >= 6) {
            const modified = [...sisaChars];
            [modified[3], modified[4]] = [modified[4], modified[3]];
            result += modified.join("");
        } else {
            result += sisaChars.join("");
        }
    }

    return result;
}

function pemampatan(text) {
    const processedText = text.toLowerCase().replace(/\s/g, '_');
    const chars = processedText.split("");
    
    let sisaKarakter = "";
    let karakterDicoret = "";

    for (let i = 0; i < chars.length; i++) {
        if ((i + 1) % 5 === 0) {
            karakterDicoret += chars[i];
        } else {
            sisaKarakter += chars[i];
        }
    }

    return sisaKarakter + "#" + karakterDicoret;
}

function blocking(text) {
    const processedText = text.toLowerCase().replace(/\s/g, '_');
    
    const blockSize = 5;
    const textLength = processedText.length;
    const numRows = Math.ceil(textLength / blockSize);

    const matrix = [];
    let charIndex = 0;

    for (let col = 0; col < blockSize; col++) {
        matrix[col] = [];
        for (let row = 0; row < numRows; row++) {
            if (charIndex < textLength) {
                matrix[col][row] = processedText[charIndex];
                charIndex++;
            } else {
                matrix[col][row] = '_';
            }
        }
    }

    let encrypted = '';

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < 4; col++) {
            if (matrix[col] && matrix[col][row]) {
                encrypted += matrix[col][row];
            }
        }

        if (row < numRows - 1) {
            encrypted += '_';
        }
    }

    return encrypted.toUpperCase();
}

function substitusi(text) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + 10) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + 10) % 26) + 65);
            }
        }
        return char;
    }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const btnEnkripsi = document.getElementById("btnEnkripsi");
    if (btnEnkripsi) {
        btnEnkripsi.addEventListener("click", function() {
            const inputText = document.getElementById("inputText").value.trim();

            if (!inputText) {
                document.getElementById("output").innerHTML = `
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                            <p class="text-red-700">⚠️ Masukkan dulu teksnya ya.</p>
                        </div>
                    </div>
                `;
                return;
            }

            const hasilEkspansi = ekspansi(inputText);
            const hasilPermutasi = permutasi(inputText);
            const hasilPemampatan = pemampatan(inputText);
            const hasilBlocking = blocking(inputText);
            const hasilSubstitusi = substitusi(inputText);

            const result = `
                <div class="space-y-4">
                    <div class="border-b border-gray-200 pb-4">
                        <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
                            <i class="fas fa-font mr-2 text-blue-500"></i>
                            Input Plaintext
                        </h3>
                        <p class="text-gray-700 bg-gray-50 p-3 rounded-lg font-mono">${inputText}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
                                <i class="fas fa-expand-alt mr-2"></i>
                                Ekspansi
                            </h4>
                            <p class="text-blue-700 font-mono text-sm">${hasilEkspansi}</p>
                        </div>

                        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                                <i class="fas fa-random mr-2"></i>
                                Permutasi
                            </h4>
                            <p class="text-green-700 font-mono text-sm">${hasilPermutasi}</p>
                        </div>

                        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h4 class="font-semibold text-yellow-800 mb-2 flex items-center">
                                <i class="fas fa-compress-alt mr-2"></i>
                                Pemampatan
                            </h4>
                            <p class="text-yellow-700 font-mono text-sm">${hasilPemampatan}</p>
                        </div>

                        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h4 class="font-semibold text-purple-800 mb-2 flex items-center">
                                <i class="fas fa-table-cells-large mr-2"></i>
                                Blocking
                            </h4>
                            <p class="text-purple-700 font-mono text-sm">${hasilBlocking}</p>
                        </div>

                        <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <h4 class="font-semibold text-indigo-800 mb-2 flex items-center">
                                <i class="fas fa-exchange-alt mr-2"></i>
                                Substitusi
                            </h4>
                            <p class="text-indigo-700 font-mono text-sm">${hasilSubstitusi}</p>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("output").innerHTML = result;
        });
    }
});

function visualizeMatrix(matrix, numRows, blockSize) {
    let html = `
        <div class="mb-4">
            <p class="text-sm text-gray-600 mb-2">Matriks ${numRows}×${blockSize} (diisi vertikal):</p>
        </div>
    `;
    
    html += '<div class="overflow-x-auto">';
    html += '<table class="min-w-full border border-gray-300 rounded-lg overflow-hidden">';
    
    // Header kolom
    html += '<thead class="bg-gray-100">';
    html += '<tr><th class="px-4 py-3 border border-gray-300 font-semibold text-gray-700"></th>';
    for (let col = 0; col < blockSize; col++) {
        html += `<th class="px-4 py-3 border border-gray-300 font-semibold text-gray-700">Kol ${col + 1}</th>`;
    }
    html += '</tr></thead>';
    
    // Isi matriks
    html += '<tbody>';
    for (let row = 0; row < numRows; row++) {
        html += `<tr><th class="px-4 py-3 border border-gray-300 bg-gray-50 font-semibold text-gray-700">Baris ${row + 1}</th>`;
        for (let col = 0; col < blockSize; col++) {
            const cellClass = matrix[col][row] === '_' ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-800';
            html += `<td class="px-4 py-3 border border-gray-300 text-center font-mono ${cellClass}">${matrix[col][row]}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table></div>';
    
    // Urutan pengisian
    html += `
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
                <i class="fas fa-sort-amount-down mr-2"></i>
                Urutan Pengisian Vertikal
            </h4>
            <p class="text-blue-700 font-mono text-sm">`;
    
    let order = [];
    for (let col = 0; col < blockSize; col++) {
        for (let row = 0; row < numRows; row++) {
            if (matrix[col] && matrix[col][row]) {
                order.push(matrix[col][row]);
            }
        }
    }
    html += order.join(' → ') + '</p></div>';

    document.getElementById("matrix-container").innerHTML = html;
}

function processText() {
    const plaintext = document.getElementById("plaintext").value;
    
    const processedText = plaintext.toLowerCase().replace(/\s/g, '_');
    document.getElementById("preprocessing").innerHTML = 
        `Teks setelah preprocessing: <strong>"${processedText}"</strong><br>Panjang teks: ${processedText.length} karakter`;

    const blockSize = 5;
    const textLength = processedText.length;
    const numRows = Math.ceil(textLength / blockSize);

    const matrix = [];
    let charIndex = 0;

    for (let col = 0; col < blockSize; col++) {
        matrix[col] = [];
        for (let row = 0; row < numRows; row++) {
            if (charIndex < textLength) {
                matrix[col][row] = processedText[charIndex];
                charIndex++;
            } else {
                matrix[col][row] = '_';
            }
        }
    }

    visualizeMatrix(matrix, numRows, blockSize);

    let readingSteps = '';
    let encrypted = '';

    for (let row = 0; row < numRows; row++) {
        readingSteps += `Baris ${row + 1}: `;
        let rowChars = '';

        for (let col = 0; col < 4; col++) {
            if (matrix[col] && matrix[col][row]) {
                rowChars += matrix[col][row] + ' ';
                encrypted += matrix[col][row];
            }
        }
        readingSteps += rowChars.trim() + '<br>';

        if (row < numRows - 1) {
            encrypted += '_';
        }
    }

    document.getElementById("reading-steps").innerHTML = readingSteps;

    document.getElementById("output").textContent = encrypted.toUpperCase();
}

function resetForm() {
    document.getElementById("plaintext").value = '';
    document.getElementById("preprocessing").innerHTML = '';
    document.getElementById("matrix-container").innerHTML = '';
    document.getElementById("reading-steps").innerHTML = '';
    document.getElementById("output").textContent = '';
}

if (window.location.pathname.includes('blocking.html')) {
    window.onload = processText;
}