export const loadScript = (url, id, callback) => {
	var script = document.getElementById("scriptId");
  	if (!script) {
	    script = document.createElement("script");
        script.id = id;
        script.src = url;
	    document.body.appendChild(script);
  
        if (callback) {
            script.onload = callback;
        }
	}
};