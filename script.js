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
    
    const pola = [1, 0, 2, 4, 3]; 
    let result = "";

    for (let i = 0; i < chars.length; i += 5) {
        const block = chars.slice(i, i + 5);
        
        if (block.length === 5) {
            for (let j = 0; j < 5; j++) {
                result += block[pola[j]];
            }
        } else {
            result += block.join("");
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
    
    const blockSize = 5; // kolom
    const textLength = processedText.length;
    const numRows = Math.ceil(textLength / blockSize); // baris
    
    // Padding dengan underscore
    const totalChars = numRows * blockSize;
    const paddedText = processedText.padEnd(totalChars, '_');
    
    // Buat matrix dan isi per KOLOM (atas ke bawah)
    const matrix = Array.from({length: numRows}, () => []);
    
    let charIndex = 0;
    for (let col = 0; col < blockSize; col++) {
        for (let row = 0; row < numRows; row++) {
            matrix[row][col] = paddedText[charIndex];
            charIndex++;
        }
    }
    
    // Baca per BARIS dan gabung dengan underscore
    let encrypted = '';
    for (let row = 0; row < numRows; row++) {
        let rowStr = '';
        for (let col = 0; col < blockSize; col++) {
            rowStr += matrix[row][col];
        }
        
        // Hapus trailing underscore di setiap baris kecuali baris terakhir
        if (row < numRows - 1) {
            rowStr = rowStr.replace(/_+$/, '');
        }
        
        encrypted += rowStr;
        
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