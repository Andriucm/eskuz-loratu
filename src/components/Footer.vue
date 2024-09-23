<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-left">
                <p>&copy; {{ currentYear }} Eskuz Loratu</p>
            </div>
            <div class="footer-center">
                <p>Eskerrik asko gure orria bisitatzeagatik!</p>
            </div>
            <div class="footer-right">
                <a href="https://www.instagram.com/eskuz_loratu/" target="_blank" aria-label="Instagram">
                    @eskuz_loratu
                </a>
            </div>
        </div>
    </footer>
</template>


<style scoped>
.footer {
        background-color: var(--color-fondo);
    padding: 20px 0;
    border-top: 2px solid var(--color-gris-claro);
}

.footer-content {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.footer-left,
.footer-center,
.footer-right {
    margin-bottom: 10px;
}

.footer-left p,
.footer-center p {
    margin: 0;
    font-family: var(--font-family-secondary);
    color: var(--color-gris-oscuro);
    font-size: 14px;
}

.footer-right a {
    display: flex;
    align-items: center;
}

.footer-right {
    transition: fill 0.3s ease-in-out;
}

.footer-right a:hover {
    fill: var(--color-turquesa);
}

@media (min-width: 768px) {
    .footer-content {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: left;
    }

    .footer-left,
    .footer-center,
    .footer-right {
        margin-bottom: 0;
    }
}
</style>
