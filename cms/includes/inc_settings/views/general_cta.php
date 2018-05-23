<?php

$contentCtaView = '';

$arrCtaContentItems = fetch_all("SELECT  `id`,
	`label`,
    `key`,
    `content`,
    `default_content`,
    `field_type`,
    `max_length`,
    `max_info`,
    `rank`
FROM `general_cta`
ORDER BY `rank`, `key`");


if(!empty($arrCtaContentItems)){

	$ctaFormView = '';

	foreach ($arrCtaContentItems as $ctaKey => $ctaItem) {
		$ctaInd        = $ctaItem['id'];
		$ctaLabel      = $ctaItem['label'];
		$ctaKey        = $ctaItem['key'];
		$ctaContent    = $ctaItem['content'];
		$ctaFieldType  = $ctaItem['field_type'];
		$maxLength     = $ctaItem['max_length'];
		$maxToolTip    = $ctaItem['max_info'];
		if($maxToolTip) {
		    $maxToolTip = <<<TIP
<span data-title="{$maxToolTip}" data-placement="right" data-toggle="tooltip"></span>
TIP;

        }

	$ctaFieldView = ''; 

	if($ctaFieldType == 'I'){

		$ctaFieldView .= <<< HTML
			<input type="text" style="width:450px;" id="cta-item-{$ctaKey}" name="cta[$ctaInd]" value="{$ctaContent}" maxlength="{$maxLength}">
HTML;

	} else if($ctaFieldType == 'T') {

		$ctaFieldView .= <<< HTML
			<textarea id="cta-item-{$ctaKey}" name="cta[$ctaInd]" style="width:450px; height:100px;resize:none;" maxlength="{$maxLength}">{$ctaContent}</textarea>
HTML;

	} else if($ctaFieldType == 'E') {

		$ctaFieldView .= <<< HTML
			<textarea id="cta-item-{$ctaKey}" name="cta[$ctaInd]" style="width:450px; height:100px;resize:none;" maxlength="{$maxLength}">{$ctaContent}</textarea>
			<script>
	            CKEDITOR.replace( "cta-item-{$ctaKey}",
	            {
	                toolbar : 'MyToolbar',
	                forcePasteAsPlainText : true,
	                resize_enabled : false,
	                height : 200,
	                filebrowserBrowseUrl : jsVars.dataManagerUrl
	            });               
	        </script>   
HTML;

	}

	$ezicomFormView .= <<< HTML
				<tr>
	                <td width="200" valign="top"><label for="{$ctaKey}" >{$ctaLabel}{$maxToolTip}</label></td>
			        <td>
			            {$ctaFieldView}
			        </td>
	            </tr>
HTML;


	}

	if(!empty($ezicomFormView))
	{
		$contentCtaView = <<< HTML

		<table width="100%" border="0" cellspacing="0" cellpadding="6">
		{$ezicomFormView}
		</table>

HTML;

	}

}

?>