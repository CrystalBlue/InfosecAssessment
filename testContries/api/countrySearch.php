<?php
/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
	header('Content-Type: application/json');
 
	$contriesUrl = 'https://restcountries.eu/rest/v2';
	
	$newInput = $_GET["searchQ"];

	// Attempt to query by name or code
	function nameLookup($input) {
		global $contriesUrl;
		$accessUrl = $contriesUrl.'/name/'.$input;
		
		return callAPI($accessUrl);
	}
	
	function codeLookup($input) {
		global $contriesUrl;
		$accessUrl = $contriesUrl.'/alpha/'.$input;
		
		return callAPI($accessUrl);
	}
	
	function callAPI($url) {
		// Create the cURL request
		$curl = curl_init();
		
		// Setup cURL parameters
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json'
		));
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		
		// Execute the cURL request
		$resultJson = curl_exec($curl);
		if(!$resultJson) {
			die("Connection Failure");
		}
		curl_close($curl);
		return $resultJson;
	}
	
	$resultJson = '';
	if (strlen($newInput) == 0) {
		echo "No input";
	} else {
		$resultJson = nameLookup($newInput);
		if (strlen($newInput) > 3) {
			$codeJson = codeLookup($newInput);
			if (strlen($resultJson) <= 0) {
				$resultJson = json_encode(array_merge(json_decode($resultJson,true),json_decode($codeJson, true)));
			}
		}
	}
	
	echo $resultJson;
?>