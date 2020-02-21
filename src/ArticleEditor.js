import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "react-images-upload";
import { fileStorageService } from "./_services/file.storage.service.js";
import { authenticationService } from "./_services/authentication.service.js";
import { articleService } from "./_services/article.service.js";
import { config } from "./config.js";

class ArticleEditor extends Component {
	constructor(props) {
		super(props);
        
        this.state = { 
            id: undefined,
            headline: "",
			alias: "",
			title: "",
			description: "",
			preview: "",
			content: "",
            active: true,
            image: undefined,

            selectedImageFile: undefined,

            error: "",
            isLoading: false,
		};

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);

        this.imageUploaderProps = {
            defaultImages: undefined,
            singleImage: true,
            withPreview: true,
            withIcon: true,
            buttonText: "Choose image",
            onChange: this.handleImageChange,
            imgExtension: [".jpg", ".png", ".gif"], 
            maxFileSize: 5242880,
            label: "",
        };
	}

    get id() { 
        return this.props.match.params.id || this.state.id; 
    }

    get imageUrl() {
        return this.state.image ? config.fileStorageBaseURL + "/" + this.state.image : undefined; 
    }

	handleImageChange(imageFiles, imageDataURLs) {
        var imageFile;
        if (imageFiles.length > 1) {
            imageFile = imageFiles[imageFiles.length - 1];
        } else if (imageFiles.length === 1) {
            imageFile = imageFiles[0];
        }

        this.setState({selectedImageFile: imageFile});
    }

	handleEditorChange = (e) => {
		this.setState({content: e.target.getContent()});
	}

	handleSave = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        fileStorageService.store(this.state.selectedImageFile)
            .then(response => { 
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({ isLoading: false });
                    if ([401, 403].indexOf(response.status) !== -1) {
                        authenticationService.logout();
                        this.props.history.push("/login");
                    }

                    return;
                }
            }).then(storedImageFileData => {
                this.saveArticle(storedImageFileData.name);
            }).catch(error => this.setState({ error: error.message, isLoading: false }));
    }
    
    saveArticle(imageFileName) {
        const article = {
            id: this.id,
            headline: this.state.headline,
            alias: this.state.alias,
            title: this.state.title,
            description: this.state.description,
            preview: this.state.preview,
            content: this.state.content,
            active: this.state.active,
            image: imageFileName,
        };
        
        articleService.save(article)
            .then(response => { 
                this.setState({ isLoading: false });
                if (response.ok) {
                    return response.json();
                } else {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        authenticationService.logout();
                        this.props.history.push("/login");
                    }

                    return;
                }
            }).then(data => {
                this.setState({ id: data.id });
                this.props.history.push("/article/editor/" + data.id);
                this.showArticle();
            }).catch(error => this.setState({ error: error.message, isLoading: false }));
    }

    showArticle() {
        if (this.id) {
            articleService.one(this.id)
                .then(response => { 
                    this.setState({ isLoading: false });
                    if (response.ok) {
                        return response.json();
                    } else {
                        if ([401, 403].indexOf(response.status) !== -1) {
                            authenticationService.logout();
                            this.props.history.push("/login");
                        }

                        return;
                    }
                }).then(data => {
                    this.setState({
                        id: data.id,
                        headline: data.headline,
                        alias: data.alias,
                        title: data.title,
                        description: data.description,
                        preview: data.preview,
                        content: data.content,
                        active: data.active,
                        image: data.image,
                    });

                    const imageUrl = this.imageUrl;
                    if (imageUrl) {
                        this.imageUploaderProps.defaultImages = [ imageUrl ];
                        this.forceUpdate();
                    }
                }).catch(error => this.setState({ error: error.message, isLoading: false }));
        }
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
		this.setState({active: e.target.value === "on"});
	}

	componentDidMount() {
        this.showArticle();
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
						<ImageUploader {...this.imageUploaderProps} />
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
								images_upload_url: "/api/file-storage/store-file"
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

export default ArticleEditor;
