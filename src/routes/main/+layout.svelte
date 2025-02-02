<script lang='ts'>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { activePage } from '../../lib/store.js';
	import { goto } from '$app/navigation';

	let { children } = $props();
	// svelte-ignore non_reactive_update
	let navbarActive = true;  // Tracks navbar activeness
  	let inactivityTimer: number | undefined;      // Timer for inactivity
  	const inactivityTime = 2000; 

	// onMount(() => {
	// 	if (window.location.pathname !== '/') {
	// 	goto('/');
	// 	}
	// });

	onMount(() => {
		resetInactivityTimer();  // Start the inactivity timer when the component is mounted
	});

  	// Function to reset the inactivity timer MAIN FUNCTION
	function resetInactivityTimer() {
		clearTimeout(inactivityTimer);  // Clear the previous timer
		inactivityTimer = setTimeout(setNavbarInactive, inactivityTime);  // Set a new timer for 10 seconds
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
		goto('/'); // Navigates to /routes on logout
	}
</script>
  

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<main>

	<div class="header">
		<img src="/logo/logoIcon.svg" class="logo" alt="Dikta Logo">
		<div class="create-account">
			<div class="create" on:click={goToTemplates}>
				<div class="create-contents">
					<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M23 15.3333V30.6666M15.3333 23H30.6667M42.1667 23C42.1667 33.5854 33.5855 42.1666 23 42.1666C12.4146 42.1666 3.83334 33.5854 3.83334 23C3.83334 12.4145 12.4146 3.83331 23 3.83331C33.5855 3.83331 42.1667 12.4145 42.1667 23Z" stroke="#EEF2F8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					<p class="nav-label">Create New</p>
				</div>
			</div>
			
			<div class="account">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button id="logout" class="logout" on:click={handleLogout}>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.2931 27.2L25.2343 27.2C25.9831 27.2 26.7013 26.905 27.2308 26.3799C27.7603 25.8548 28.0578 25.1426 28.0578 24.4L28.0578 7.60001C28.0578 6.85741 27.7603 6.14522 27.2308 5.62011C26.7013 5.09501 25.9831 4.80001 25.2343 4.80001L20.2931 4.80001M19.9422 16L3.94218 16M3.94218 16L10.0557 22.4M3.94218 16L10.0557 9.60001" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<div id="account-det" class="account-det">
					<h3 id="account-name">Account Name</h3>
					<p id="account-email">account@email.com</p>
				</div>
			</div>
		</div>
	</div>

	<div class="wrapper-container">
		
			<div class="content-container">
				{@render children()}
			</div>	

			<div class="navigation-container">
				
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore event_directive_deprecated -->
				<div id="navigation-bar" class:inactive={!navbarActive}> 
					<svg width="183" height="610" viewBox="0 0 183 835" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.000137329 0L134 27.5C170.5 36 183 65.8858 183 93.5V484H0.000137329V0Z" fill="#023DFE"/>
						<path d="M-1.52588e-05 835L134 807.5C170.5 799 183 769.114 183 741.5V351H-1.52588e-05V835Z" fill="#023DFE"/>
						</svg>
				</div>
				
				<div id="currentNav" class="currentNav" style="--top-value: 
				{$activePage === 'home' ? '-8px' :
				$activePage === 'templates' ? '78px' :
				$activePage === 'mydocs' ? '164px' :  
				$activePage === 'details' ? '250px' : 
				$activePage === 'contact' ? '336px' : 
				$activePage === 'about' ? '420px' : '15px'}">
					<svg width="165" height="199" viewBox="0 0 165 199" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M165 0C165 25.4313 165 37.7558 143.348 40.0543C121.696 42.3528 46.4535 48.1901 46.4535 48.1901C0 52.1342 0.254927 68.8873 0 87.614V107.542L165 107.542V0Z" fill="white"/>
						<path d="M165 199C164.993 171.661 165.071 156.502 143.423 153.859C121.775 151.217 46.4535 142.2 46.4535 142.2C0 136.057 0.254927 121.503 0 102.776V82.8485H164.971L165 199Z" fill="white"/>
						</svg>
				</div>

				<div class="navigation-contents">
					<nav>
						<ul>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main" on:click={() => activePage.set('home')} class={$activePage === 'home' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_104_187)">
								<path  class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M0.454546 8.63557C0.164634 8.90579 0 9.28429 0 9.6806V17.8571C0 19.0406 0.95939 20 2.14286 20H8.57143V15.7143C8.57143 14.9253 9.21103 14.2857 10 14.2857C10.789 14.2857 11.4286 14.9253 11.4286 15.7143V20H17.8571C19.0406 20 20 19.0406 20 17.8571V9.6806C20 9.28429 19.8354 8.90579 19.5454 8.63557L10.4649 0.17196C10.1974 -0.0573198 9.80264 -0.0573201 9.53514 0.17196L0.454546 8.63557Z" fill="#1B1B1B"/>
								</g>
								<defs>
								<clipPath id="clip0_104_187">
								<rect width="20" height="20" fill="white"/>
								</clipPath>
								</defs>
								</svg>
								
							<p class="nav-label">Home</p>
						</span>
					</a></li>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main/templates" on:click={() => activePage.set('templates')} class={$activePage === 'templates' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore event_directive_deprecated -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M1.78571 2.23212C1.31211 2.23212 0.857911 2.42026 0.523023 2.75513C0.188137 3.09003 0 3.54422 0 4.01783V20.0893C0 20.7996 0.282205 21.481 0.784536 21.9834C1.28686 22.4857 1.96816 22.7678 2.67857 22.7678H21.875C22.7037 22.7678 23.4986 22.4385 24.0846 21.8525C24.6707 21.2664 25 20.4716 25 19.6428V8.03569C25 7.54258 24.6002 7.14283 24.1071 7.14283H22.3554V18.6768C22.3554 19.2932 21.8557 19.7928 21.2393 19.7928C20.6229 19.7928 20.1232 19.2932 20.1232 18.6768V6.68463C20.1232 6.66621 20.1236 6.6479 20.1245 6.62971V4.01783C20.1245 3.54422 19.9364 3.09003 19.6014 2.75513C19.2666 2.42026 18.8123 2.23212 18.3388 2.23212H1.78571ZM4.97595 7.20806C4.97595 6.71496 5.3757 6.31521 5.8688 6.31521H13.9045C14.3976 6.31521 14.7974 6.71496 14.7974 7.20806V11.6723C14.7974 12.1655 14.3976 12.5652 13.9045 12.5652H5.8688C5.3757 12.5652 4.97595 12.1655 4.97595 11.6723V7.20806ZM4.75273 17.4107C4.75273 16.7943 5.25241 16.2946 5.8688 16.2946H13.9045C14.5209 16.2946 15.0206 16.7943 15.0206 17.4107C15.0206 18.0271 14.5209 18.5268 13.9045 18.5268H5.8688C5.25241 18.5268 4.75273 18.0271 4.75273 17.4107Z" fill="#1B1B1B"/>
								</svg>				
							<p class="nav-label">Templates</p>
						</span>
					</a></li>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main/mydocs" on:click={() => activePage.set('mydocs')} class={$activePage === 'mydocs' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore event_directive_deprecated -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M4.46428 0C3.75388 0 3.07256 0.282205 2.57024 0.784536C2.06792 1.28686 1.78571 1.96818 1.78571 2.67857V22.3214C1.78571 23.0318 2.06792 23.7132 2.57024 24.2155C3.07256 24.7179 3.75387 25 4.46428 25H20.5357C21.2461 25 21.9275 24.7179 22.4298 24.2155C22.9321 23.7132 23.2143 23.0318 23.2143 22.3214V9.82143C23.2143 9.58463 23.1202 9.35752 22.9528 9.19009L14.0242 0.261512C13.8568 0.0940686 13.6297 0 13.3928 0H4.46428ZM6.68378 10.4911C7.2937 10.4911 7.8469 10.8488 8.09717 11.405L8.9284 13.2525L9.75995 11.4049C10.0102 10.8487 10.5634 10.4911 11.1733 10.4911C12.0293 10.4911 12.7232 11.185 12.7232 12.0409V18.75C12.7232 19.3664 12.2235 19.8661 11.6071 19.8661C10.9907 19.8661 10.491 19.3664 10.491 18.75V15.2193L10.4498 15.311C10.1803 15.9096 9.58483 16.2946 8.92833 16.2946C8.27174 16.2946 7.67621 15.9096 7.40681 15.3108L7.36606 15.2202V18.75C7.36606 19.3664 6.86638 19.8661 6.24999 19.8661C5.6336 19.8661 5.13392 19.3664 5.13392 18.75V12.0409C5.13392 11.185 5.82781 10.4911 6.68378 10.4911ZM18.0803 11.6071C18.0803 10.9907 17.5807 10.4911 16.9643 10.4911C16.3479 10.4911 15.8482 10.9907 15.8482 11.6071V16.0712H15.1786C14.8174 16.0712 14.4919 16.2887 14.3537 16.6224C14.2155 16.956 14.2919 17.3401 14.5472 17.5954L16.3329 19.3811C16.5004 19.5486 16.7275 19.6427 16.9643 19.6427C17.2011 19.6427 17.4282 19.5486 17.5956 19.3811L19.3814 17.5954C19.6368 17.3401 19.713 16.956 19.5748 16.6224C19.4366 16.2887 19.1111 16.0712 18.75 16.0712H18.0803V11.6071Z" fill="#1B1B1B"/>
								</svg>				
							<p class="nav-label">My Docs</p>
						</span>
					</a></li>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main/details" on:click={() => activePage.set('details')} class={$activePage === 'details' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore event_directive_deprecated -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_104_200)">
								<path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M14.9553 25H2.67857C1.19924 25 0 23.8007 0 22.3214V2.67857C0 1.19924 1.19924 0 2.67857 0H22.3214C23.8007 0 25 1.19924 25 2.67857V14.9545H16.0714C15.455 14.9545 14.9553 15.4542 14.9553 16.0706V25ZM17.1874 23.8839L23.8848 17.1866H17.1874V23.8839Z" fill="#1B1B1B"/>
								</g>
								<defs>
								<clipPath id="clip0_104_200">
								<rect width="25" height="25" fill="white"/>
								</clipPath>
								</defs>
								</svg>				
							<p class="nav-label">Details</p>
						</span>
					</a></li>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main/contact" on:click={() => activePage.set('contact')} class={$activePage === 'contact' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore event_directive_deprecated -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M20.4687 0.120484H4.87426C3.78007 0.120229 2.72847 0.547151 1.94437 1.31034C1.16014 2.07366 0.704961 3.11301 0.675777 4.20699L0.675262 4.24556V22.6659L0.67527 22.6707C0.676535 23.7823 1.11873 24.8484 1.90497 25.6345C2.69233 26.422 3.76024 26.8644 4.87374 26.8644H20.4448L20.4694 26.8646L20.4943 26.8644H22.3033C23.1021 26.8644 23.7497 26.2168 23.7497 25.4179C23.7497 24.6191 23.1021 23.9715 22.3033 23.9715H21.9159V21.0239C22.2362 20.8665 22.5317 20.6565 22.7887 20.3992C23.4041 19.784 23.7497 18.9494 23.7497 18.0792V3.40162C23.7497 2.53141 23.4041 1.69683 22.7887 1.0815C22.1735 0.466172 21.3388 0.120484 20.4687 0.120484ZM3.95053 23.5891C3.70568 23.3441 3.56812 23.012 3.56812 22.6659C3.56815 22.3197 3.7057 21.9876 3.95053 21.7427C4.19538 21.4979 4.52746 21.3604 4.87374 21.3604H19.023V23.9715H4.87374C4.52746 23.9715 4.19538 23.8338 3.95053 23.5891ZM15.5425 16.0554C14.864 16.2154 14.1521 16.1552 13.51 15.8836C10.9157 14.3279 8.74473 12.1569 7.18901 9.56261C6.91982 8.92013 6.86094 8.20893 7.0208 7.53094C7.18064 6.85295 7.55102 6.24296 8.07887 5.7884L8.55448 5.3128C8.72053 5.1059 8.96013 4.97121 9.22321 4.9369C9.48627 4.90259 9.75241 4.9713 9.96596 5.12869L11.5002 6.66291C11.6576 6.87648 11.7263 7.14262 11.692 7.40568C11.6577 7.66874 11.523 7.90836 11.3161 8.07441C11.1092 8.24044 10.9745 8.48007 10.9402 8.74313C10.9059 9.00618 10.9746 9.27233 11.132 9.4859L13.5868 11.9407C13.8003 12.0981 14.0664 12.1668 14.3295 12.1325C14.5926 12.0981 14.8322 11.9635 14.9982 11.7566C15.1643 11.5497 15.4039 11.415 15.667 11.3807C15.93 11.3464 16.1962 11.4151 16.4097 11.5724L17.944 13.1067C18.1013 13.3202 18.1701 13.5864 18.1358 13.8494C18.1014 14.1125 17.9668 14.3521 17.7599 14.5182L17.2842 14.9938C16.8311 15.5236 16.2211 15.8954 15.5425 16.0554Z" fill="#1B1B1B"/>
								</svg>
							<p class="nav-label">Contact Us</p>
						</span>
					</a></li>
					<li>
						<!-- svelte-ignore event_directive_deprecated -->
						<a href="/main/about" on:click={() => activePage.set('about')} class={$activePage === 'about' ? 'activePage' : ''}>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore event_directive_deprecated -->
						<span class="navigation-item" class:inactive-item={!navbarActive} on:mouseenter={handleMouseEnter}>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M2.60141 0.450562C1.16469 0.450562 0 1.61526 0 3.05197V16.5992C0 18.0359 1.1647 19.2005 2.60141 19.2005H9.79118L8.83546 21.8709H7.14282C6.40316 21.8709 5.80354 22.4705 5.80354 23.2102C5.80354 23.9498 6.40316 24.5495 7.14282 24.5495H17.8571C18.5968 24.5495 19.1964 23.9498 19.1964 23.2102C19.1964 22.4705 18.5968 21.8709 17.8571 21.8709H16.1645L15.2088 19.2005H22.3986C23.8354 19.2005 25 18.0359 25 16.5992V3.05197C25 1.61526 23.8354 0.450562 22.3986 0.450562H2.60141ZM8.933 11.4028C8.50086 10.9633 7.79423 10.9573 7.3547 11.3894C6.91518 11.8216 6.9092 12.5282 7.34134 12.9677C8.40298 14.0475 10.1926 14.9595 12.5 14.9595C14.8074 14.9595 16.597 14.0475 17.6587 12.9677C18.0909 12.5282 18.0848 11.8216 17.6453 11.3894C17.2058 10.9573 16.4991 10.9633 16.067 11.4028C15.4274 12.0533 14.2123 12.7273 12.5 12.7273C10.7877 12.7273 9.57259 12.0533 8.933 11.4028ZM10.7426 7.14742C10.7426 7.90251 10.1305 8.51462 9.37543 8.51462C8.62036 8.51462 8.00825 7.90251 8.00825 7.14742C8.00825 6.39235 8.62036 5.78024 9.37543 5.78024C10.1305 5.78024 10.7426 6.39235 10.7426 7.14742ZM15.625 8.51462C16.3801 8.51462 16.9922 7.90251 16.9922 7.14742C16.9922 6.39235 16.3801 5.78024 15.625 5.78024C14.8699 5.78024 14.2578 6.39235 14.2578 7.14742C14.2578 7.90251 14.8699 8.51462 15.625 8.51462Z" fill="#023DFE"/>
								</svg>
							<p class="nav-label">About Us</p>
						</span>
					</a></li>
						</ul>
					</nav>
				</div> <!-- Nav Bar Contents Closing Div -->
			</div><!-- Nav Bar Container Closing Div -->		
	</div> <!-- Wrapper Container Closing Div -->
</main>

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
  background: url("/assets/createNewBar.svg") no-repeat;
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

.account button{
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

.account button svg:hover path{
  	stroke: #023DFE;
	cursor: pointer;
}

.header .account .account-det {
	display: flex;
    flex-direction: column;
	margin-top: 15px;
	white-space: nowrap;
    width: max-content;
}

.account-det h3{
	font-family: 'Telegraf UltraBold';
	font-size: 18px;
	margin: 0;
	padding: 0;
}

.account-det p{
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
  transition: opacity 0.5s ease;  /* Smooth transition for opacity */
  transform: translateX(-26px);
}

.inactive {
    opacity: 0;  /* Example: dim the navbar when inactive */
}

.inactive-item p {
	color: #1B1B1B;
	transition: color 0.5s ease;
}

.inactive-item .icon {
	fill: #1B1B1B;
	transition: fill 0.5s ease;
}

.activePage p {
	color: #023DFE;
}

.activePage .icon {
	fill: #023DFE;
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
    fill: #EEF2F8;
    margin: auto;
}

.nav-label {
    font-family: 'Telegraf UltraBold';
	color: #EEF2F8;
}

.navigation-contents p { 
	font-size: 14px;
}

.navigation-item:hover p {
	color: #1B1B1B;
}

.navigation-item:hover .icon {
	fill: #1B1B1B;
}

.wrapper-container .content-container {
	transform: translateY(120px);
	margin-left: 133px;
	width: 91%;
}

.currentNav{
	position: absolute;
	top: var(--top-value, 15px);
	left: 22px; 
	transition: top 0.3s ease;
}

.currentNav svg{
	width: 112px;
}
</style>