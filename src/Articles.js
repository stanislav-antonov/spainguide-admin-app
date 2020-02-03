import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react';

class Articles extends Component {
    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }
    
    render() {
		return (
			<div>
				<h1 class="mt-4">Articles</h1>
                <Editor
                    initialValue = "<p>This is the initial content of the editor</p>"
                    init = {{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | image | help',
                        
                        // https://www.tiny.cloud/docs/plugins/image/
                        images_upload_url: '/image/upload'
                    }}
                    onChange = { this.handleEditorChange }
                />
			</div>
		);
    }
}
 
export default Articles;
