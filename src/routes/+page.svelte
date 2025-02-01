<script>
    import { goto } from '$app/navigation';
  
    function goToHome() {
      goto('/main'); // Adjust based on your actual homepage path
    }
  </script>
  
  <button on:click={goToHome}>Go to Homepage</button>