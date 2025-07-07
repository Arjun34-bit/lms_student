<script>
    export let message = "Verification complete!";
  </script>
  
  <style>
    .verified {
      animation: fadeInUp 1s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }
  
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .icon {
      font-size: 4rem;
      color: green;
    }
  </style>
  
  <div class="verified" style="text-align: center; margin-top: 3rem;">
    <div class="icon">✅</div>
    <h1>Verification Successful</h1>
    <p>{message}</p>
    <div style="text-align: center; margin-top: 2rem;">
        <a href="/auth/login" style="text-decoration: underline;">Return to LoginPage</a>
      </div>
  </div>
  