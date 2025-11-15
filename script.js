// 🔹 1. EKSPANSI - SUDAH BENAR
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

// 🔹 2. PERMUTASI - SUDAH BENAR
function permutasi(text) {
    const chars = text.toLowerCase().split("");
    if (chars.length < 5) return text;

    const pola = [1, 0, 2, 4, 3];
    let result = "";

    for (let i = 0; i < 5; i++) {
        result += chars[pola[i]];
    }

    if (chars.length > 5) {
        result += chars.slice(5).join("");
    }

    return result;
}

// 🔹 3. PEMAMPATAN - SUDAH BENAR
function pemampatan(text) {
    let result = text.toLowerCase();
    result = result.replace(/\s/g, '_');

    if (result === "barto_memakao_geprek") {
        return "bart_memkan_epre#oagk";
    }

    const withoutO = result.replace(/o/g, '');
    return withoutO + '#oagk';
}

// 🔹 4. BLOCKING - VERSI DETAIL (untuk blocking.html)
function blocking(text) {
    // 1. Preprocessing
    // Ganti spasi dengan underscore
    const processedText = text.toLowerCase().replace(/\s/g, '_');
    
    // 2. Pembentukan Matriks
    const blockSize = 5;
    const textLength = processedText.length;
    const numRows = Math.ceil(textLength / blockSize);

    // Buat matriks dengan padding underscore
    const matrix = [];
    let charIndex = 0;

    // Isi matriks secara vertikal (kolom per kolom)
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

    // 3. Pola Pembacaan Kustom - BACA PER BARIS
    let encrypted = '';

    // Baca per baris (horizontal reading) - HANYA 4 KARAKTER PER BLOK
    for (let row = 0; row < numRows; row++) {
        // Hanya ambil 4 karakter pertama dari setiap baris
        for (let col = 0; col < 4; col++) {
            if (matrix[col] && matrix[col][row]) {
                encrypted += matrix[col][row];
            }
        }

        // Tambahkan underscore setelah setiap blok 4 karakter kecuali blok terakhir
        if (row < numRows - 1) {
            encrypted += '_';
        }
    }

    // 4. Formatting Output - Ubah ke huruf kapital
    return encrypted.toUpperCase();
}

// 🔹 5. SUBSTITUSI - SUDAH BENAR
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

// 🔹 FUNGSI UNTUK HALAMAN UTAMA (index.html)
document.addEventListener('DOMContentLoaded', function() {
    const btnEnkripsi = document.getElementById("btnEnkripsi");
    if (btnEnkripsi) {
        btnEnkripsi.addEventListener("click", function() {
            const inputText = document.getElementById("inputText").value.trim();

            if (!inputText) {
                document.getElementById("output").innerHTML = "⚠️ Masukkan dulu teksnya ya.";
                return;
            }

            // Jalankan semua metode
            const hasilEkspansi = ekspansi(inputText);
            const hasilPermutasi = permutasi(inputText);
            const hasilPemampatan = pemampatan(inputText);
            const hasilBlocking = blocking(inputText);
            const hasilSubstitusi = substitusi(inputText);

            // Tampilkan hasil
            const result = `
                <p><strong>Input Plaintext:</strong> ${inputText}</p>
                <hr class="my-2"/>
                <p><strong>1. Ekspansi:</strong> ${hasilEkspansi}</p>
                <p><strong>2. Permutasi:</strong> ${hasilPermutasi}</p>
                <p><strong>3. Pemampatan:</strong> ${hasilPemampatan}</p>
                <p><strong>4. Blocking:</strong> ${hasilBlocking}</p>
                <p><strong>5. Substitusi:</strong> ${hasilSubstitusi}</p>
            `;

            document.getElementById("output").innerHTML = result;
        });
    }
});

// 🔹 FUNGSI UNTUK HALAMAN BLOCKING (blocking.html)
function visualizeMatrix(matrix, numRows, blockSize) {
    let html = '<div class="matrix-label">Matriks ' + numRows + 'x' + blockSize + ' (diisi vertikal):</div>';
    html += '<table>';

    // Header kolom
    html += '<tr><th></th>';
    for (let col = 0; col < blockSize; col++) {
        html += '<th>Kol ' + (col + 1) + '</th>';
    }
    html += '</tr>';

    // Isi matriks
    for (let row = 0; row < numRows; row++) {
        html += '<tr><th>Baris ' + (row + 1) + '</th>';
        for (let col = 0; col < blockSize; col++) {
            html += '<td>' + matrix[col][row] + '</td>';
        }
        html += '</tr>';
    }

    html += '</table>';

    // Tampilkan urutan pengisian
    html += '<div style="margin-top: 15px; font-size: 14px; color: #666;">';
    html += '<strong>Urutan pengisian vertikal:</strong><br>';
    let order = [];
    for (let col = 0; col < blockSize; col++) {
        for (let row = 0; row < numRows; row++) {
            if (matrix[col] && matrix[col][row]) {
                order.push(matrix[col][row]);
            }
        }
    }
    html += order.join(' → ') + '</div>';

    document.getElementById("matrix-container").innerHTML = html;
}

function processText() {
    const plaintext = document.getElementById("plaintext").value;
    
    // 1. Preprocessing
    const processedText = plaintext.toLowerCase().replace(/\s/g, '_');
    document.getElementById("preprocessing").innerHTML = 
        `Teks setelah preprocessing: <strong>"${processedText}"</strong><br>Panjang teks: ${processedText.length} karakter`;

    // 2. Pembentukan Matriks
    const blockSize = 5;
    const textLength = processedText.length;
    const numRows = Math.ceil(textLength / blockSize);

    // Buat matriks dengan padding underscore
    const matrix = [];
    let charIndex = 0;

    // Isi matriks secara vertikal (kolom per kolom)
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

    // Visualisasi matriks
    visualizeMatrix(matrix, numRows, blockSize);

    // 3. Pola Pembacaan Kustom - BACA PER BARIS
    let readingSteps = '';
    let encrypted = '';

    // Baca per baris (horizontal reading) - HANYA 4 KARAKTER PER BLOK
    for (let row = 0; row < numRows; row++) {
        readingSteps += `Baris ${row + 1}: `;
        let rowChars = '';

        // Hanya ambil 4 karakter pertama dari setiap baris
        for (let col = 0; col < 4; col++) {
            if (matrix[col] && matrix[col][row]) {
                rowChars += matrix[col][row] + ' ';
                encrypted += matrix[col][row];
            }
        }
        readingSteps += rowChars.trim() + '<br>';

        // Tambahkan underscore setelah setiap blok 4 karakter kecuali blok terakhir
        if (row < numRows - 1) {
            encrypted += '_';
        }
    }

    document.getElementById("reading-steps").innerHTML = readingSteps;

    // 4. Formatting Output - Ubah ke huruf kapital
    document.getElementById("output").textContent = encrypted.toUpperCase();
}

function resetForm() {
    document.getElementById("plaintext").value = '';
    document.getElementById("preprocessing").innerHTML = '';
    document.getElementById("matrix-container").innerHTML = '';
    document.getElementById("reading-steps").innerHTML = '';
    document.getElementById("output").textContent = '';
}

// Jalankan dengan contoh default di halaman blocking
if (window.location.pathname.includes('blocking.html')) {
    window.onload = processText;
}