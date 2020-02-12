import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "react-images-upload";
import { fileStorageService } from "./_services/file.storage.service.js";

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
        e.preventDefault();
        // this.saveArticle();
        fileStorageService.store(this.state.images[this.state.images.length - 1]);
    }
    
    saveArticle() {
        const id = this.props.match.params.id;
		const action = id ? "update/" + id  : "create";
		const endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/admin/article/" + action;
		
		const formData = new FormData();
		formData.append("headline", this.state.headline);
		formData.append("alias", this.state.alias);
		formData.append("title", this.state.title);
		formData.append("description", this.state.description);
		formData.append("preview", this.state.preview);
		formData.append("content", this.state.content);
		formData.append("active", this.state.active);

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
				<h1 className="mt-4">Article</h1>
				<form>
					<div className="form-group">
						<input type="text" className="form-control" id="headlineInput" placeholder="Headline" value={this.state.headline} onChange={this.handleHeadlineChange} />
					</div>

					<div className="form-group">
						<input type="text" className="form-control" id="aliasInput" placeholder="Alias" aria-describedby="aliasHelp" value={this.state.alias} onChange={this.handleAliasChange} />
						<small id="aliasHelp" className="form-text text-muted">For SEO purposes: human readable URL</small>
					</div>

					<div className="form-group">
						<input type="text" className="form-control" id="titleInput" placeholder="Title" aria-describedby="titleHelp" value={this.state.title} onChange={this.handleTitleChange} />
						<small id="titleHelp" className="form-text text-muted">For SEO purposes: goes directly to "meta title" tag</small>
					</div>
					
					<div className="form-group">
						<textarea className="form-control" id="descriptionInput" rows="3" placeholder="Description" aria-describedby="descriptionHelp" onChange={this.handleDescriptionChange} value={this.state.description}></textarea>
						<small id="descriptionHelp" className="form-text text-muted">For SEO purposes: goes directly to "meta description" tag</small>
					</div>
					
					<div className="form-group">
						<textarea className="form-control" id="previewInput" rows="6" placeholder="Preview" onChange={this.handlePreviewChange} value={this.state.preview}></textarea>
					</div>
					<div className="form-group">
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
					<div className="form-group">
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
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="activeCheck" onChange={this.handleActiveChange} checked={this.state.active}/>
						<label className="form-check-label" htmlFor="activeCheck">Active</label>
					</div>
					<div className="form-group">
						<button className="btn btn-lg btn-primary btn-block" onClick={this.handleSave}>Save</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Article;
