document.addEventListener('DOMContentLoaded', function() {
    // Data penyakit pencernaan pada anak
    const diseases = {
        "diare_akut": {
            name: "Diare Akut",
            accuracy: "85%",
            description: "Diare akut adalah buang air besar encer lebih dari 3 kali dalam 24 jam dengan durasi kurang dari 14 hari. Penyebab utama adalah infeksi virus (rotavirus), bakteri (E.coli, Salmonella), atau parasit (Giardia).",
            treatment: [
                "Berikan oralit untuk mencegah dehidrasi",
                "Teruskan pemberian ASI atau susu formula",
                "Berikan makanan lunak seperti bubur atau pisang",
                "Hindari makanan berlemak dan berserat tinggi",
                "Jika disebabkan bakteri, mungkin perlu antibiotik"
            ],
            prevention: [
                "Cuci tangan dengan sabun sebelum makan dan setelah BAB",
                "Berikan ASI eksklusif untuk bayi 0-6 bulan",
                "Pastikan makanan dan minuman bersih dan matang",
                "Berikan vaksin rotavirus untuk pencegahan"
            ]
        },
        "gastroenteritis": {
            name: "Gastroenteritis",
            accuracy: "78%",
            description: "Peradangan pada lambung dan usus yang biasanya disebabkan oleh infeksi virus (norovirus, rotavirus) atau bakteri. Ditandai dengan diare, muntah, dan kadang demam.",
            treatment: [
                "Istirahat yang cukup",
                "Berikan cairan sedikit tapi sering untuk hindari dehidrasi",
                "Gunakan oralit atau larutan gula garam",
                "Berikan makanan lunak setelah muntah berhenti",
                "Hindari susu sapi sementara jika intoleransi laktosa sekunder"
            ],
            prevention: [
                "Kebersihan personal dan lingkungan",
                "Hindari kontak dengan penderita",
                "Vaksinasi rotavirus",
                "Pastikan makanan disimpan dan dimasak dengan benar"
            ]
        },
        "konstipasi": {
            name: "Konstipasi (Sembelit)",
            accuracy: "72%",
            description: "Kesulitan buang air besar dengan frekuensi kurang dari 3 kali seminggu, feses keras, dan kadang disertai nyeri saat BAB. Penyebab umum termasuk kurang serat, kurang cairan, atau perubahan pola makan.",
            treatment: [
                "Tingkatkan asupan serat (buah, sayur, whole grain)",
                "Perbanyak minum air putih",
                "Latihan toilet training yang teratur",
                "Pijat perut dengan gerakan melingkar searah jarum jam",
                "Jika perlu, gunakan laksatif sesuai anjuran dokter"
            ],
            prevention: [
                "Diet tinggi serat sejak dini",
                "Cukup minum air setiap hari",
                "Biasakan rutinitas BAB setiap hari",
                "Aktivitas fisik yang cukup"
            ]
        },
        "intoleransi_laktosa": {
            name: "Intoleransi Laktosa",
            accuracy: "65%",
            description: "Ketidakmampuan mencerna laktosa (gula dalam susu) karena kekurangan enzim laktase. Gejala muncul setelah konsumsi produk susu berupa diare, kembung, dan sakit perut.",
            treatment: [
                "Hindari produk susu sapi untuk sementara",
                "Gunakan susu bebas laktosa atau susu nabati",
                "Produk fermentasi seperti yogurt biasanya lebih toleran",
                "Suplemen enzim laktase jika diperlukan"
            ],
            prevention: [
                "Kenali dan hindari makanan mengandung laktosa",
                "Baca label makanan dengan cermat",
                "Untuk bayi, gunakan formula khusus bebas laktosa"
            ]
        },
        "kolik": {
            name: "Kolik",
            accuracy: "60%",
            description: "Kondisi pada bayi ditandai tangisan berlebihan lebih dari 3 jam sehari, 3 hari seminggu, selama lebih dari 3 minggu. Penyebab pasti tidak diketahui, mungkin terkait pencernaan atau sistem saraf yang belum matang.",
            treatment: [
                "Gendong dan ayun bayi dengan lembut",
                "Gunakan suara white noise atau suara 'sshh'",
                "Pijat perut bayi dengan lembut",
                "Coba posisi menyusui yang berbeda",
                "Jika menyusui, ibu hindari makanan yang mungkin memicu gas"
            ],
            prevention: [
                "Sendawakan bayi setelah menyusu",
                "Hindari overfeeding",
                "Gunakan botol anti-kolik jika minum susu formula",
                "Ciptakan lingkungan yang tenang dan nyaman"
            ]
        }
    };

    // Rule-based reasoning untuk diagnosis
    function diagnoseDisease(symptoms, age) {
        // Aturan diagnosis
        if (symptoms.includes('diare') && symptoms.includes('muntah') && symptoms.includes('demam')) {
            return 'gastroenteritis';
        } else if (symptoms.includes('diare') && symptoms.length === 1 && age === '0-1') {
            return 'diare_akut';
        } else if (symptoms.includes('sakit_perut') && symptoms.includes('nafsu_makan_turun') && !symptoms.includes('diare')) {
            return 'konstipasi';
        } else if (symptoms.includes('diare') && symptoms.includes('sakit_perut') && age !== '0-1') {
            return 'intoleransi_laktosa';
        } else if (symptoms.includes('muntah') && age === '0-1' && symptoms.length < 3) {
            return 'kolik';
        } else {
            // Default jika tidak ada yang cocok
            return 'diare_akut';
        }
    }

    // Tambah gejala
    let symptomCount = 1;
    const addSymptomBtn = document.getElementById('addSymptom');
    const symptomsContainer = document.getElementById('symptomsContainer');
    
    if (addSymptomBtn) {
        addSymptomBtn.addEventListener('click', function() {
            symptomCount++;
            const newSymptom = document.createElement('div');
            newSymptom.className = 'symptom-item';
            newSymptom.innerHTML = `
                <div class="form-group">
                    <label for="symptom${symptomCount}">Gejala ${symptomCount}</label>
                    <select id="symptom${symptomCount}" class="symptom-select" required>
                        <option value="">Pilih gejala</option>
                        <option value="diare">Diare (BAB cair lebih dari 3x/hari)</option>
                        <option value="muntah">Muntah-muntah</option>
                        <option value="demam">Demam (>37.5°C)</option>
                        <option value="sakit_perut">Sakit perut</option>
                        <option value="nafsu_makan_turun">Nafsu makan menurun</option>
                    </select>
                </div>
            `;
            symptomsContainer.appendChild(newSymptom);
        });
    }

    // Form diagnosis
    const diagnosisForm = document.getElementById('diagnosisForm');
    if (diagnosisForm) {
        diagnosisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const age = document.getElementById('age').value;
            const symptoms = [];
            
            // Kumpulkan semua gejala yang dipilih
            document.querySelectorAll('.symptom-select').forEach(select => {
                if (select.value) symptoms.push(select.value);
            });
            
            if (age && symptoms.length > 0) {
                // Lakukan diagnosis
                const diseaseKey = diagnoseDisease(symptoms, age);
                const disease = diseases[diseaseKey];
                
                // Simpan riwayat diagnosis (simulasi)
                const diagnosisHistory = JSON.parse(localStorage.getItem('diagnosisHistory')) || [];
                diagnosisHistory.push({
                    date: new Date().toLocaleString(),
                    age: age,
                    symptoms: symptoms,
                    disease: disease.name,
                    accuracy: disease.accuracy
                });
                localStorage.setItem('diagnosisHistory', JSON.stringify(diagnosisHistory));
                
                // Redirect ke halaman hasil dengan parameter
                window.location.href = `result.html?disease=${diseaseKey}`;
            }
        });
    }

    // Tampilkan hasil diagnosis
    const resultContent = document.getElementById('resultContent');
    if (resultContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const diseaseKey = urlParams.get('disease');
        
        if (diseaseKey && diseases[diseaseKey]) {
            const disease = diseases[diseaseKey];
            
            resultContent.innerHTML = `
                <h3 class="result-disease">${disease.name}</h3>
                <span class="result-accuracy">Akurasi: ${disease.accuracy}</span>
                <p class="result-desc">${disease.description}</p>
                
                <div class="result-treatment">
                    <h4><i class="fas fa-medkit"></i> Penanganan</h4>
                    <ul>
                        ${disease.treatment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="result-prevention">
                    <h4><i class="fas fa-shield-alt"></i> Pencegahan</h4>
                    <ul>
                        ${disease.prevention.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="result-note">
                    <p><strong>Catatan:</strong> Hasil diagnosis ini merupakan prediksi awal berdasarkan gejala yang dimasukkan. Untuk diagnosis yang lebih akurat, harap konsultasikan dengan dokter anak.</p>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-error">
                    <h3><i class="fas fa-exclamation-triangle"></i> Tidak dapat memuat hasil diagnosis</h3>
                    <p>Silahkan coba lakukan diagnosis kembali atau hubungi dokter anak untuk konsultasi lebih lanjut.</p>
                </div>
            `;
        }
    }
});