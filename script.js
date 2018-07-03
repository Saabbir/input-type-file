var input   = document.querySelector('input');
var preview = document.querySelector('.preview');

input.addEventListener('change', updateImageDisplay);

var supportedFileTypes = input.getAttribute('accept');
supportedFileTypes = supportedFileTypes.split(', ');

function validFileType(file) {
	for (var i = 0; i < supportedFileTypes.length; i++) {
		if ( file.type === supportedFileTypes[i] ) {
			return true;
		}
	}
	
	return false;
}

function returnFileSize(number) {
	if ( number < 1024 ) {
		return number.toFixed(1) + ' Bytes';
	} else if ( number >= 1024 && number < (1024 * 1024) ) {
		return ( number / 1024 ).toFixed(1) + ' KB';
	} else if ( number >= (1024 * 1024) ) {
		return ( number / (1024 * 1024).toFixed(1) ) + ' MB';
	}
}

function updateImageDisplay() {
	
	while ( preview.firstChild ) {
		preview.removeChild( preview.firstChild );
	}
	
	if ( input.files.length === 0 ) {
		var para = document.createElement('p');
		para.textContent = 'No files currently selected for upload';
		preview.appendChild(para);
	} else {
		var list = document.createElement('ol');
		preview.appendChild(list);
		
		for (var i = 0; i < input.files.length; i++) {
			
			var listItem = document.createElement('li');
			var para = document.createElement('p');
			
			if ( validFileType( input.files[i] ) ) {
				para.innerHTML = `
					<span class="file_name">${input.files[i].name}</span>
					<span class="file_size">${returnFileSize(input.files[i].size)}</span>
				`;

				var image = document.createElement('img');
				image.src = window.URL.createObjectURL(input.files[i]);
				image.className = 'preview_image'
				listItem.appendChild(image);
			} else {
				para.textContent = `${input.files[i].name}: Not a valid file type. Update your selection.`;
			}
			
			listItem.appendChild(para);
			list.appendChild(listItem);
		}
	}
}