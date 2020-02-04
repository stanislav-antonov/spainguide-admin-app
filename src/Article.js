import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "react-images-upload";

class Article extends Component {
    constructor(props) {
		super(props);
		this.state = { 
            images: [],
            headline: "",
            alias: "",
            title: "",
            description: "",
            preview: "",
            content: "",
            active: true
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
	}

	handleImageChange(imageFiles, imageDataURLs) {
        this.setState({images: this.state.images.concat(imageFiles)});
	}

    handleEditorChange = (e) => {
        this.setState({content: e.target.getContent()});
    }

    handleSave = (e) => {
        let id = this.props.match.params.id;
        let action = id ? "update/" + id  : "create";
        let endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/admin/article/" + action;
        
        let formData = new FormData();
        formData.append("headline", this.state.headline);
        formData.append("alias", this.state.alias);
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("preview", this.state.preview);
        formData.append("image", this.state.images[this.state.images.length - 1]);
        formData.append("content", this.state.content);
        formData.append("active", this.state.active);

        console.log("Article save endpoint URL: " + endpointUrl);

        fetch(endpointUrl, {
            method: "POST",
            body: formData
        }).then(
            response => response.json()
        ).then(
            success => console.log(success)
        ).catch(
            error => console.log(error)
        );

        console.log("Article was saved");
    }

    handleHeadlineChange = (e) => {
        this.setState({headline: e.target.value});
    }

    handleAliasChange = (e) => {
        this.setState({alias: e.target.value});
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }
    
    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    }

    handlePreviewChange = (e) => {
        this.setState({preview: e.target.value});
    }

    handleActiveChange = (e) => {
        this.setState({active: e.target.value});
    }

    componentDidMount() {
        this.setState({
            headline: "Loaded Headline",
            alias: "Loaded Alias",
            title: "Loaded Title",
            description: "Loaded Description",
            preview: "Loaded Preview",
            content: "Loaded Content",
            active: false,
        });
    }

    render() {
		return (
			<div>
				<h1 class="mt-4">Article</h1>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="headlineInput" placeholder="Headline" value={this.state.headline} onChange={this.handleHeadlineChange} />
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" id="aliasInput" placeholder="Alias" aria-describedby="aliasHelp" value={this.state.alias} onChange={this.handleAliasChange} />
                        <small id="aliasHelp" class="form-text text-muted">For SEO purposes: human readable URL</small>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" id="titleInput" placeholder="Title" aria-describedby="titleHelp" value={this.state.title} onChange={this.handleTitleChange} />
                        <small id="titleHelp" class="form-text text-muted">For SEO purposes: goes directly to "meta title" tag</small>
                    </div>
                    
                    <div class="form-group">
                        <textarea class="form-control" id="descriptionInput" rows="3" placeholder="Description" aria-describedby="descriptionHelp" onChange={this.handleDescriptionChange} value={this.state.description}></textarea>
                        <small id="descriptionHelp" class="form-text text-muted">For SEO purposes: goes directly to "meta description" tag</small>
                    </div>
                    
                    <div class="form-group">
                        <textarea class="form-control" id="previewInput" rows="6" placeholder="Preview" onChange={this.handlePreviewChange} value={this.state.preview}></textarea>
                    </div>
                    <div class="form-group">
                        <ImageUploader
                            // defaultImages = {[]}
                            singleImage = {true}
                            withPreview = {true}
                            withIcon = {true}
                            buttonText = "Choose image"
                            onChange = {this.handleImageChange}
                            imgExtension = {[".jpg", ".png", ".gif"]}
                            maxFileSize = {5242880}
                            label = {""}
                        />
                    </div>
                    <div class="form-group">
                        <Editor
                            value = { this.state.content }
                            init = {{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount"
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | image | help",
                                
                                // https://www.tiny.cloud/docs/plugins/image/
                                images_upload_url: "/api/admin/image/upload"
                            }}
                            onChange = { this.handleEditorChange }
                        />
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="activeCheck" onChange={this.handleActiveChange} checked={this.state.active}/>
                        <label class="form-check-label" for="activeCheck">Active</label>
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
