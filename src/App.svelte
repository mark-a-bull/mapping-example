<style>
	.map :global(.marker-text) {
		width:100%;
		text-align:center;
		font-weight:600;
		background-color:#444;
		color:#EEE;
		border-radius:0.5rem;
	}

	.map :global(.map-marker) {
		width:30px;
		transform:translateX(-50%) translateY(-25%);
	}

</style>

<!-- Styles need by leaflet.js for the mapping portion -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>


<script>
	import {mapAction} from "./map/map.js"
</script>

<div leaflet class="map" style="height:100%;width:100%" use:mapAction />