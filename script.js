document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Disease Data
    const diseases = [
        {
            title: "Demam pada Bayi",
            description: "Panduan mengatasi demam pada bayi baru lahir hingga 1 tahun",
            category: "bayi",
            image: "https://via.placeholder.com/400x225?text=Demam+Bayi"
        },
        {
            title: "Diare Akut",
            description: "Penanganan pertama diare akut pada anak usia 1-5 tahun",
            category: "balita",
            image: "https://via.placeholder.com/400x225?text=Diare+Balita"
        },
        {
            title: "Cacar Air",
            description: "Gejala, perawatan, dan pencegahan cacar air pada anak",
            category: "anak",
            image: "https://via.placeholder.com/400x225?text=Cacar+Air"
        },
        {
            title: "Kolik pada Bayi",
            description: "Mengatasi bayi menangis terus menerus karena kolik",
            category: "bayi",
            image: "https://via.placeholder.com/400x225?text=Kolik+Bayi"
        },
        {
            title: "ISPA pada Balita",
            description: "Infeksi saluran pernapasan akut pada usia 1-5 tahun",
            category: "balita",
            image: "https://via.placeholder.com/400x225?text=ISPA+Balita"
        },
        {
            title: "Alergi Makanan",
            description: "Mengenali dan mengatasi alergi makanan pada anak",
            category: "anak",
            image: "https://via.placeholder.com/400x225?text=Alergi+Makanan"
        }
    ];
    
    // Render Diseases
    const diseaseGrid = document.querySelector('.disease-grid');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let activeCategory = 'all';
    
    function renderDiseases() {
        diseaseGrid.innerHTML = '';
        
        const filteredDiseases = activeCategory === 'all' 
            ? diseases 
            : diseases.filter(disease => disease.category === activeCategory);
        
        filteredDiseases.forEach(disease => {
            const diseaseCard = document.createElement('div');
            diseaseCard.className = 'disease-card';
            diseaseCard.innerHTML = `
                <div class="disease-image" style="background-image: url('${disease.image}')"></div>
                <div class="disease-content">
                    <span class="disease-category category-${disease.category}">${disease.category}</span>
                    <h3>${disease.title}</h3>
                    <p>${disease.description}</p>
                    <div class="disease-meta">
                        <span><i class="far fa-clock"></i> 5 min read</span>
                        <span><i class="far fa-eye"></i> 1.2k</span>
                    </div>
                </div>
            `;
            diseaseGrid.appendChild(diseaseCard);
        });
    }
    
    // Tab Filtering
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            renderDiseases();
        });
    });
    
    // Initial Render
    renderDiseases();
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});