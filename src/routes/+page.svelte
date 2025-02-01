<script>
  import { goto } from '$app/navigation';

  let showRegister = false;

  function goToHome() {
    goto('/main');
  }

  function showRegisterScreen(event) {
    event.preventDefault();
    showRegister = true;
  }

  function hideRegisterScreen(event) {
    event.preventDefault();
    showRegister = false;
  }
</script>

  <div class="banner-login-wrapper">
      <div class="banner-wrapper">
          <div class="logo">
              <img src="assets/logoLogin.svg" alt="">
          </div>
          <div class="animation-banner">
              <div class="banner">
                  <div class="slider" style="--quantity: 5">
                      <div class="item" style="--position: 1"><img src="assets/Automation.png" alt=""></div>
                      <div class="item" style="--position: 2"><img src="assets/Template.png" alt=""></div>
                      <div class="item" style="--position: 3"><img src="assets/Knowledge.png" alt=""></div>
                      <div class="item" style="--position: 4"><img src="assets/Intelligent.png" alt=""></div>
                      <div class="item" style="--position: 5"><img src="assets/Dynamic.png" alt=""></div>
                  </div>
              </div>
              <div class="content">
                  <div class="logoName"></div>
                  <div class="cover1"></div>
                  <div class="cover2"></div>
              </div>
          </div>
          <div class="tagline">
              <h3>An AI-Powered Document Generation Platform for Enhanced Productivity and Personalized Automation</h3>
          </div>
      </div>
  
      <div class="login">
          <div class="header">
              <div class="header-text">
                  <h1>Welcome.</h1>
                  <h3>Please enter your details</h3>
              </div>
          </div>
  
          <div class="login-input">
              <div class="login-input-text">
                  <input type="email" name="emailLogin">
                  <p>Email</p>
              </div>
              <div class="login-input-text">
                  <input type="text" name="userLogin">
                  <p>User Name</p>
              </div>
              <div class="login-input-text">
                  <input type="password" name="passLogin">
                  <p>Password</p>
              </div>

              <div class="login-input-text">
                <button on:click={goToHome}>Log in</button>
              </div>
          </div>
  
          <div class="register-link">
              <div class="register-link-text">
                <h3>Dont have an account? <a href="#" on:click={showRegisterScreen}>Register</a></h3>
              </div>
          </div>
      </div>
      {#if showRegister}
      <div class="register-screen">
          <div class="register">
              <div class="header">
                  <div class="register-header-text">
                      <h1>Register</h1>
                      <h3>Please enter your details</h3>
                  </div>
              </div>
      
              <div class="register-input">
                  <div class="register-input-text">
                      <input type="email" name="emailRegister">
                      <p>Email</p>
                  </div>
                  <div class="register-input-text">
                      <input type="text" name="userRegister">
                      <p>User Name</p>
                  </div>
                  <div class="register-input-text">
                      <input type="password" name="passRegister">
                      <p>Password</p>
                  </div>
                  <div class="register-input-text">
                      <input type="password" name="confirmPassRegister">
                      <p>Confirm Password</p>
                  </div>
  
                  <div class="register-input-text">
                      <button>Sign up</button>
                  </div>
              </div>
      
              <div class="login-link">
                  <div class="login-link-text">
                    <h3>Already have an account? <a href="#" on:click={hideRegisterScreen}>Log in</a></h3>
                  </div>
              </div>
          </div>
      </div> 
      {/if}  
  </div>


<style>
  :global(body) {
    margin: 0;
  }

  .banner-login-wrapper{
      display: flex;
      flex-direction: row;
      background: #1b1b1b;
  }

  .banner-wrapper{
      width: 65%;
      height: 100dvh;
      background: linear-gradient(to bottom, #023DFE, #EEF2F8, #EEF2F8);
      border-top-right-radius: 90px;
  }

  .logo{
      width: 100%;
      padding-top: 30px;
      padding-left: 30px;
      margin-bottom: 70px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }

  .banner {
      width: 100%;
      height: 300px;
      text-align: center;
      overflow: hidden;
      position: relative;
      padding-top: 80px;
  }

  .banner .slider{
      position: absolute;
      width: 200px;
      height: 250px;
      left: calc(50% - 100px);
      transform-style: preserve-3d;
      transform: perspective(700px);
      animation: autoRun 13s linear infinite;
      z-index: 2;
  }

  @keyframes autoRun{
      from{
          transform: perspective(400px) rotateZ(-16deg) rotateX(-30deg) rotateY(0deg)
      }
      to{
          transform: perspective(400px) rotateZ(-16deg) rotateX(-30deg) rotateY(360deg)
      }
  }

  .banner .slider .item {
      position: absolute;
      height: 50px;
      inset: 0 0 0 0;
      transform: 
          rotateY(calc((var(--position) - 1) *(360 / var(--quantity)) * 1deg))
          translateZ(210px);
          
      
  }

  .banner .slider .item img {
      width: 100%;
      object-fit: fit;
      
  }

  .content .logoName {
      background: url('assets/logoName.png') no-repeat;
      width: 450px;
      height: 181px;
      position: absolute;
      left: 270px;
      top: 230px;
      background-size:100% 100% ;
      background-position: middle left;
      z-index: 1;
  }

  .content .cover1 {
      background: url('assets/logoName.png') no-repeat;
      width: 450px;
      height: 181px;
      position: absolute;
      left: 270px;
      top: 230px;
      background-size:100% 100% ;
      background-position: middle left;
      z-index: 3;
      clip-path: inset(0% 40% 30% 0%);
  }

  .content .cover2 {
      background: url('assets/logoName.png') no-repeat;
      width: 450px;
      height: 181px;
      position: absolute;
      left: 270px;
      top: 230px;
      background-size:100% 100% ;
      background-position: middle left;
      z-index: 3;
      clip-path: inset(0% 80% 0% 0%);
  }


  .tagline{
      width: 640px;
      display: flex;
      justify-content: flex-start;
      align-items: left;
      text-align: left;
      margin-top: -20px;
      padding-left: 180px;
  }

  .tagline h3{
      font-size:24px;
      font-family: Telegraf;
      font-weight: 500;
  }

  .login{
      width: 35%;
      height: 100dvh;
      background: #1b1b1b;
  }

  .header-text{
      padding: 70px 70px 20px 70px;
      color: #EEF2F8;
  }

  .header-text h1{
      font-family: Poppins;
      font-size: 60px;
      color:#023DFE;
      margin-bottom: 0px;
  }

  .header-text h3{
      font-family: Telegraf;
      font-weight: 100;
      margin-top: 0px;
      margin-left: 10px;
  }

  .login-input{
      padding: 10px 70px 20px 70px;
      color: #EEF2F8;
      font-family: Telegraf;
  }

  .login-input input{
      width: 97%;
      height: 25px;
      border-radius: 10px;
      background-color: #EEF2F8;
      padding-left: 10px;
  }

  .login-input p{
      margin-top: 5px;
      margin-left: 10px;
      color: #EEF2F8;
  }

  .login-input button{
      width: 100%;
      height: 50px;
      margin-top: 20px;
      border-radius: 10px;
      font-family: Telegraf;
      font-size: 20px;
      color: #EEF2F8;
      background-color: #023DFE;
  }

  .register-link-text{
      font-family: Telegraf;
      color: #EEF2F8;
      padding: 30px 70px 20px 70px;
      text-align: center;
  }

  .register-link-text h3{
      font-weight: 100;
  }

  .register-link-text a{
      color: #023DFE;
      font-weight: 500;
      cursor: pointer;
  }

  .register-screen{
      width: 100dvw;
      height: 100dvh;
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      z-index: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  .register-screen .register{
      position: relative;
      width: 500px;
      height: 600px;
      background: linear-gradient(to bottom, #EEF2F8, #8E8E8E);
      color: #1b1b1b;
      border-top-right-radius: 10px;
      border-top-left-radius: 60px;
      border-bottom-right-radius: 60px;
      border-bottom-left-radius: 10px;
  }

  .register-header-text{
      padding: 00px 70px 00px 70px;
      color: #1b1b1b;
  }

  .register-header-text h1{
      font-family: Poppins;
      font-size: 60px;
      color:#023DFE;
      margin-bottom: 0px;
  }

  .register-header-text h3{
      font-family: Telegraf;
      font-weight: 100;
      margin-top: 0px;
      margin-left: 10px;
  }

  .register-input{
      padding: 10px 70px 20px 70px;
      font-family: Telegraf;
  }

  .register-input input{
      width: 97%;
      height: 25px;
      border-radius: 10px;
      background-color: #EEF2F8;
      padding-left: 10px;
  }

  .register-input p{
      margin-top: 5px;
      margin-left: 10px;
  }

  .register-input button{
      width: 100%;
      height: 50px;
      margin-top: 20px;
      border-radius: 10px;
      font-family: Telegraf;
      font-size: 20px;
      color: #EEF2F8;
      background-color: #023DFE;
  }

  .login-link-text{
      font-family: Telegraf;
      color: #1b1b1b;
      padding: 0px 70px 0px 70px;
      text-align: center;
      margin-top: -30px;
  }

  .login-link-text h3{
      font-weight: 100;
  }

  .login-link-text a{
      color: #023DFE;
      font-weight: 500;
      cursor: pointer;
  }

</style>