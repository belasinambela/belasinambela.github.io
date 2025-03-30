document.addEventListener('DOMContentLoaded', function() {
    // Data dummy untuk dashboard
    if (document.getElementById('historyTableBody')) {
        const diagnosisHistory = JSON.parse(localStorage.getItem('diagnosisHistory')) || [];
        const historyTableBody = document.getElementById('historyTableBody');
        
        if (diagnosisHistory.length > 0) {
            diagnosisHistory.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.date}</td>
                    <td>${getAgeLabel(item.age)}</td>
                    <td>${item.symptoms.map(s => getSymptomLabel(s)).join(', ')}</td>
                    <td>${item.disease}</td>
                    <td><span class="badge badge-primary">${item.accuracy}</span></td>
                `;
                historyTableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center;">Belum ada riwayat diagnosis</td>`;
            historyTableBody.appendChild(row);
        }
    }
    
    // Chart untuk dashboard
    if (document.getElementById('chartCanvas')) {
        const ctx = document.getElementById('chartCanvas').getContext('2d');
        const diagnosisChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Hari-6', 'Hari-5', 'Hari-4', 'Hari-3', 'Hari-2', 'Kemarin', 'Hari Ini'],
                datasets: [{
                    label: 'Jumlah Diagnosis',
                    data: [12, 19, 15, 20, 14, 18, 7],
                    backgroundColor: '#4A6FA5',
                    borderColor: '#4A6FA5',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Fungsi helper
    function getAgeLabel(ageKey) {
        const ages = {
            '0-1': '0-1 Tahun',
            '1-5': '1-5 Tahun',
            '5-12': '5-12 Tahun'
        };
        return ages[ageKey] || ageKey;
    }
    
    function getSymptomLabel(symptomKey) {
        const symptoms = {
            'diare': 'Diare',
            'muntah': 'Muntah',
            'demam': 'Demam',
            'sakit_perut': 'Sakit Perut',
            'nafsu_makan_turun': 'Nafsu Makan Turun'
        };
        return symptoms[symptomKey] || symptomKey;
    }
});