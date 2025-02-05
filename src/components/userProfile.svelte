<script lang="ts">
	import '../app.css';
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


</style>