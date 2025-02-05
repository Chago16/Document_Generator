<script lang="ts">
	
	import { onMount } from 'svelte';
	import { activePage, userStore } from '../lib/store.js';
	import { goto } from '$app/navigation';
	
	let user: { _id: string; username: string; email: string } | null = null;
	
	// Subscribe to the store
	userStore.subscribe(value => {
		user = value;
	});

	onMount(() => {
		const token = localStorage.getItem('token');

		// Clear token to prevent subsequent reloads
		localStorage.removeItem('token');

		if (token) {
			location.reload();
		}
	});


	let { children } = $props();
	// svelte-ignore non_reactive_update
	let navbarActive = true;  // Tracks navbar activeness
  	let inactivityTimer: number | undefined;      // Timer for inactivity
  	const inactivityTime = 2000; 

	// // Define a user variable to store the fetched data
	// let user: { _id: string; username: string; email: string } | null = null;
	
	// let username: '';
	// let email: '';

	onMount(async () => {
		try {
			const response = await fetch('/api/login', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data = await response.json();
			console.log(data)

			if (response.ok) {
				// Store the user data in the `user` variable
				console.log(data.user);

				userStore.set(data.user);
			} else {
				console.error('Failed to fetch user data:', data.message);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

		resetInactivityTimer(); // Start the inactivity timer when the component is mounted
	});

  	// Function to reset the inactivity timer MAIN FUNCTION
	function resetInactivityTimer() {
		clearTimeout(inactivityTimer);  // Clear the previous timer
		inactivityTimer = setTimeout(setNavbarInactive, inactivityTime) as unknown as number;  // Set a new timer for 10 seconds
		const navBar = document.getElementById("navigation-bar");
		navBar?.classList.remove('inactive');
		const navBarItem = document.querySelectorAll('.navigation-item');
		navBarItem.forEach(item => {
		item.classList.remove("inactive-item");  
  		console.log(item.classList);    
		});
	}

	// Function to handle inactivity SECONDARY FUNCTION CALLED BY RESET FUNC
	function setNavbarInactive() {
		navbarActive = false;
		console.log("navbarActive:" + navbarActive);
		const navBar = document.getElementById("navigation-bar");
		navBar?.classList.add('inactive');
		const navBarItem = document.querySelectorAll('.navigation-item');
		navBarItem.forEach(item => {
		item.classList.add("inactive-item");  
  		console.log(item.classList);    
		});
	}

	// Event listeners to track user activity
	function handleMouseEnter() {
		navbarActive = true;  // Navbar is active when hovered
		console.log("Navbar is active");
		resetInactivityTimer();
	}

	function handleClick() {
		navbarActive = true;  // Navbar is active when clicked
		console.log("Navbar is active");
		resetInactivityTimer();
	}

	function goToTemplates() {
        activePage.set('templates'); // Set current active page to templates
        goto('/main/templates'); // Navigate to templates page
    }

	function handleLogout() {
		activePage.set('home'); // Ensure the activePage is reset to 'home'
		// Clear localStorage and redirect to login page
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		goto('/');
	}
</script>

<div class="account">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button id="logout" class="logout" on:click={handleLogout}>
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.2931 27.2L25.2343 27.2C25.9831 27.2 26.7013 26.905 27.2308 26.3799C27.7603 25.8548 28.0578 25.1426 28.0578 24.4L28.0578 7.60001C28.0578 6.85741 27.7603 6.14522 27.2308 5.62011C26.7013 5.09501 25.9831 4.80001 25.2343 4.80001L20.2931 4.80001M19.9422 16L3.94218 16M3.94218 16L10.0557 22.4M3.94218 16L10.0557 9.60001"
                stroke="black"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>
    <div id="account-det" class="account-det">
        <h3 id="account-name">{user ? user.username : 'Loading...'}
        </h3>
        <p id="account-email">{user ? user.email : 'Loading...'}
        </p>
    </div>
</div>

<style>
	:global(body) {
		margin: 0px;
	}

	main {
		height: 95vh;
		margin: 0px;
	}

	.wrapper-container {
		margin-top: -15px;
		height: min-content;
		display: flex;
		flex-direction: column;
		z-index: 1;
	}

	.header {
		display: flex;
		flex-direction: row;
		position: fixed;
		height: 22%;
		width: 100%;
		background: linear-gradient(to bottom, #ffffff, #ffffff, #ffffff, #ffffff00);
		z-index: 2;
		margin-left: -9px;
		margin-top: 5px;
		padding-right: 50px;
	}

	.header .logo {
		width: 55px;
		margin-top: -30px;
		margin-left: 40px;
	}

	.header .create-account {
		width: 91%;
		display: flex;
		justify-content: space-between; /* Ensures items are on opposite sides */
		padding-right: 58px;
	}

	.header .create {
		display: flex;
		height: 139px;
		min-width: 379px;
		padding: 0;
		transform: translateX(5px) translateY(-15px);
		background: url('/assets/createNewBar.svg') no-repeat;
		background-size: 379px;
		justify-content: center;
		align-items: center;
		transition: transform 0.3s ease;
	}

	.header .create:hover {
		transform: translateX(5px) translateY(5px);
		cursor: pointer;
	}

	.header .create .create-contents {
		display: flex;
		margin-top: 30px;
		margin-left: -8px;
	}

	.create-contents p {
		margin-left: 30px;
		margin-top: 11px;
		font-size: 22px;
	}

	.header .account {
		width: min-content;
		display: flex; /* Flexbox for the account section */
		justify-content: flex-end; /* Ensures it aligns to the right */
		align-items: center; /* Vertically centers items */
		margin-top: -45px;
	}

	.account button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 15px 0px 0px 25px;
		height: 40px;
		width: 50px;
		font-family: 'Telegraf UltraBold';
		font-size: 14px;
		background-color: rgba(255, 255, 255, 0);
		border: 0px;
		border-radius: 7px;
		transition: 0.3s ease;
	}

	.account button svg {
		width: 25px;
		height: 25px;
		margin-right: 20px;
	}

	.account button svg:hover path {
		stroke: #023dfe;
		cursor: pointer;
	}

	.header .account .account-det {
		display: flex;
		flex-direction: column;
		margin-top: 15px;
		white-space: nowrap;
		width: max-content;
	}

	.account-det h3 {
		font-family: 'Telegraf UltraBold';
		font-size: 18px;
		margin: 0;
		padding: 0;
	}

	.account-det p {
		margin: 0;
		font-family: 'Telegraf Regular';
	}

	.navigation-container {
		position: fixed;
		padding: 0;
		height: min-content;
		width: 133px;
		transform: translateX(-12px) translateY(110px);
		z-index: 3;
		margin-left: 9px;
	}

	#navigation-bar {
		transition: opacity 0.5s ease; /* Smooth transition for opacity */
		transform: translateX(-26px);
	}

	.inactive {
		opacity: 0; /* Example: dim the navbar when inactive */
	}

	.inactive-item p {
		color: #1b1b1b;
		transition: color 0.5s ease;
	}

	.inactive-item .icon {
		fill: #1b1b1b;
		transition: fill 0.5s ease;
	}

	.activePage p {
		color: #023dfe;
	}

	.activePage .icon {
		fill: #023dfe;
	}

	.content-container {
		margin: 25px 0 0 0;
	}

	.navigation-contents {
		top: 0;
		z-index: 2;
		position: absolute; /* Positions content on top of navbar */
		margin-left: 35px;
		margin-top: 65px;
		display: flex;
		flex-direction: column;
		margin-bottom: 0;
	}

	.navigation-contents ul {
		list-style: none; /* Removes the black dot */
		padding: 0; /* Optional: Removes any default padding */
		margin: 0; /* Optional: Removes any default margin */
	}

	.navigation-contents a {
		text-decoration: none;
	}

	.navigation-item {
		margin-bottom: 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: color 0.5s ease;
	}

	.navigation-item svg {
		height: 18px;
	}

	.icon {
		fill: #eef2f8;
		margin: auto;
	}

	.nav-label {
		font-family: 'Telegraf UltraBold';
		color: #eef2f8;
	}

	.navigation-contents p {
		font-size: 14px;
	}

	.navigation-item:hover p {
		color: #1b1b1b;
	}

	.navigation-item:hover .icon {
		fill: #1b1b1b;
	}

	.wrapper-container .content-container {
		transform: translateY(120px);
		margin-left: 133px;
		width: 91%;
	}

	.currentNav {
		position: absolute;
		top: var(--top-value, 15px);
		left: 22px;
		transition: top 0.3s ease;
	}

	.currentNav svg {
		width: 112px;
	}
</style>