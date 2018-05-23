<?php
$ctaBookingContent     = BOOKING_CONTENT;
if($page == $page_bookings->url && $resbook_id){

    $extra_qs = '';
    
    if($_POST){

        $booking_date = $_POST['check-in'];

        if(validate_date($booking_date, 'd/m/Y'))
        {
            $booking_date_obj = date_create_from_format('d/m/Y', $booking_date);

            $extra_qs .= '&amp;dd='.$booking_date_obj->format('d').'&amp;mm='.$booking_date_obj->format('m').'&amp;yyyy='.$booking_date_obj->format('Y');
            $date = $booking_date == '' ? date('d M Y') : $booking_date;
            
        }
    }

    $resbookURL = fetch_value("SELECT `url` FROM `resbook_version` WHERE `version` = {$resbook_version}");
    $combinedURL = sprintf($resbookURL, $resbook_id);

    $tags_arr['content'] .= <<< H
    <div class="row">
        <div class="col-xs-12 text-center">
            <iframe style="background-color:transparent;height:450px;width:100%;margin-top:30px;" class="iframe" src="{$combinedURL}&iframe=1&center=true{$extra_qs}" frameborder="0" scrolling="no"></iframe>
            
        </div>
        
    </div>
    <div class="container">
        <div class="col-xs-12 text-center">
        $ctaBookingContent 
        </div>
    </div>
    
H;
    
}

?>