(function($){ 
	var $fileBox = null; 
	$(function() { 
		init(); 
	}) 

	function init() { 
		$fileBox = $('.input-file'); 
		fileLoad(); 
	} 

	function fileLoad() { 
		var maxsize  = 4 * 1024 * 1024;

		$.each($fileBox, function(idx){ 
			var $this = $fileBox.eq(idx), 
					$btnUpload = $this.find('[type="file"]'), 
					$label = $this.find('.file-label'); 
					$btnUpload.on('change', function() { 
						var $target = $(this), 
							fileName = $target.val(), 
							$fileText = $target.siblings('.file-name'); 
						var ext = fileName.split('.').pop().toLowerCase();
						var filesize =  $(this)[0].files[0].size;

						if($.inArray(ext, ['png','gif','tif','bmp','jpg','jpeg']) == -1) {
							alert('정해진 이미지 파일만 첨부 가능합니다.');
							return;
						}

						//파일 크기
						if(filesize > maxsize){
							alert("4MB 이하 이미지만 첨부 가능합니다.");
							$fileText.val(""); 
							return;
						}

						$fileText.val(fileName); 
					}) 
			$btnUpload.on('focusin focusout', function(e) { 
				e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus'); 
			}) 
		}) 
	} 
})(jQuery);