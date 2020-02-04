import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react';
import ImageUploader from 'react-images-upload';

class Article extends Component {
    constructor(props) {
		super(props);
		this.state = { images: [] };
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(imageFiles, imageDataURLs) {
		this.setState({
            images: this.state.images.concat(imageFiles),
        });
	}

    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }

    handleSave = (e) => {
        let id = this.props.match.params.id;
        let action = id ? "update/" + id  : "create";
        let endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/admin/article/" + action;
        let formData = new FormData();
        formData.append('image', this.state.images[this.state.images.length - 1]);

        console.log('Article save endpoint URL: ' + endpointUrl);

        fetch(endpointUrl, {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        ).then(
            success => console.log(success)
        ).catch(
            error => console.log(error)
        );

        console.log('Article was saved');
    }

    render() {
		return (
			<div>
				<h1 class="mt-4">Article</h1>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="headlineInput" placeholder="Headline" />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="titleInput" placeholder="Title" aria-describedby="titleHelp" />
                        <small id="titleHelp" class="form-text text-muted">For SEO purposes: goes directly to "title" tag</small>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="previewInput" rows="6" placeholder="Preview"></textarea>
                    </div>

                    <div class="form-group">
                        <textarea class="form-control" id="descriptionInput" rows="3" placeholder="Description" aria-describedby="descriptionHelp"></textarea>
                        <small id="descriptionHelp" class="form-text text-muted">For SEO purposes: goes directly to "description" tag</small>
                    </div>
                    <div class="form-group">
                        <ImageUploader
                            // defaultImages = {[]}
                            singleImage = {true}
                            withPreview = {true}
                            withIcon = {true}
                            buttonText = 'Choose image'
                            onChange = {this.onDrop}
                            imgExtension = {['.jpg', '.png', '.gif']}
                            maxFileSize = {5242880}
                            label = {""}
                        />
                    </div>
                    <div class="form-group">
                        <Editor
                            initialValue = "<p>Article content</p>"
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
                                images_upload_url: '/api/admin/image/upload'
                            }}
                            onChange = { this.handleEditorChange }
                        />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-lg btn-primary btn-block" onClick={this.handleSave}>Save</button>
                    </div>
                </form>
			</div>
		);
    }
}
 
export default Article;
