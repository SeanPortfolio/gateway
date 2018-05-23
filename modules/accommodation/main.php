<?php
$ctaAccomBookingBtn = ACCOMMODATION_BOOKING_BTN;

$currencyIconView='<i class="'.$currencyIcon.'" aria-hidden="true"></i>';

if($page_url == $page_accommodation->url)
{
	
	if($option1)
	{
		require_once 'inc/single.php';
	}
	
	else{
		
		require_once 'inc/list.php';
	}
}

?>