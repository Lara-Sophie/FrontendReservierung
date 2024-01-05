<template>
    <div class="welcome-container">
        <!-- Hier wird das Bild als Hintergrund eingefügt -->
        <div class="background-image"></div>

        <div class="content">
            <h1 class="industrial-title">Willkommen!</h1>
            <p class="industrial-text">Genieße deine Zeit auf unserer Website.</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'WelcomePage',
    data() {
        return {};
    },
};
</script>

<style scoped>
/* Industrial Look Styling für Welcome Page */
.welcome-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.background-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-image: url('/path/to/your/image.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
}

.content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 50px 20px;
    color: #fff;
}

.industrial-title {
    font-size: 30px;
    margin-bottom: 20px;
}

.industrial-text {
    font-size: 18px;
}
</style>
