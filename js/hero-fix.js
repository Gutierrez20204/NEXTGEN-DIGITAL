// ===== SOLUCIÓN JAVASCRIPT PARA HERO BACKGROUND =====

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // Array de rutas posibles para la imagen
        const imagePaths = [
            'images/hero-bg-test.jpg',
            'images/hero-bg.jpg',
            '../images/hero-bg-test.jpg',
            '../images/hero-bg.jpg',
            '/images/hero-bg-test.jpg',
            '/images/hero-bg.jpg',
            './images/hero-bg-test.jpg',
            './images/hero-bg.jpg'
        ];
        
        // Función para probar si una imagen existe
        function testImage(path) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(path);
                img.onerror = () => resolve(null);
                img.src = path;
            });
        }
        
        // Probar todas las rutas
        async function findWorkingImage() {
            for (let path of imagePaths) {
                const workingPath = await testImage(path);
                if (workingPath) {
                    console.log('✅ Imagen encontrada en:', workingPath);
                    return workingPath;
                }
            }
            console.log('❌ No se encontró la imagen de fondo');
            return null;
        }
        
        // Aplicar la imagen que funcione
        findWorkingImage().then(workingPath => {
            if (workingPath) {
                heroSection.style.backgroundImage = `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('${workingPath}')`;
            } else {
                // Fallback con gradiente
                heroSection.style.backgroundImage = 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), linear-gradient(45deg, #667eea, #764ba2)';
            }
        });
    }
});

// Función adicional para verificar el estado de la imagen
function checkHeroImage() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const computedStyle = window.getComputedStyle(heroSection);
        const backgroundImage = computedStyle.backgroundImage;
        console.log('Estado actual del hero:', backgroundImage);
        
        // Verificar si la imagen se está cargando
        if (backgroundImage.includes('hero-bg.jpg')) {
            console.log('✅ Imagen de fondo detectada');
        } else {
            console.log('❌ Imagen de fondo no detectada');
        }
    }
}

// Ejecutar verificación después de 2 segundos
setTimeout(checkHeroImage, 2000);
