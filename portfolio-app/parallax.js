class ParallaxImage {
    constructor(container, imageUrl, depthUrl) {
        this.container = container;
        this.imageUrl = imageUrl;
        this.depthUrl = depthUrl;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '10';
        this.canvas.style.opacity = '0';
        this.canvas.style.transition = 'opacity 0.5s ease';

        this.container.appendChild(this.canvas);
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }
        console.log('WebGL initialized for', this.imageUrl);

        this.program = null;
        this.textures = {};
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.imageAspect = 1;
        this.isRunning = false;

        this.init();
    }

    async init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Shaders
        const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y; // Flip Y manually
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fsSource = `
      precision mediump float;
      uniform sampler2D uImage;
      uniform sampler2D uDepth;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uImageAspect;
      varying vec2 vUv;

      void main() {
        float canvasAspect = uResolution.x / uResolution.y;
        float imageAspect = uImageAspect;
        
        // Cover logic
        vec2 scale = vec2(1.0);
        if (canvasAspect > imageAspect) {
            scale.y = imageAspect / canvasAspect;
        } else {
            scale.x = canvasAspect / imageAspect;
        }

        vec2 uv = (vUv - 0.5) * scale + 0.5;

        // Sample depth
        float depth = texture2D(uDepth, uv).r;
        
        // Parallax
        vec2 parallax = uMouse * depth * 0.06; 

        vec4 color = texture2D(uImage, uv + parallax);
        gl_FragColor = color;
      }
    `;

        this.program = this.createProgram(vsSource, fsSource);

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]), this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        try {
            console.log('Loading textures...');
            const [imageTex, depthTex, imgObj] = await Promise.all([
                this.loadTexture(this.imageUrl),
                this.loadTexture(this.depthUrl),
                this.loadImage(this.imageUrl)
            ]);

            this.textures.image = imageTex;
            this.textures.depth = depthTex;
            this.imageAspect = imgObj.width / imgObj.height;
            console.log('Image Aspect:', this.imageAspect);

            this.start();
            this.canvas.style.opacity = '1';
            console.log('Parallax started successfully');
        } catch (e) {
            console.error('Failed to load textures', e);
        }
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    loadTexture(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const tex = this.gl.createTexture();
                this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);

                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

                resolve(tex);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    createProgram(vsSource, fsSource) {
        const vs = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
        const fs = this.compileShader(this.gl.FRAGMENT_SHADER, fsSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program link error:', this.gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    start() {
        this.isRunning = true;

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            // Invert X as requested ("rotation opposite to mouse movement" -> "follow")
            // Previously x, -y. Now -x, -y.
            this.targetMouse = { x: -x, y: -y };
        });

        this.container.addEventListener('mouseleave', () => {
            this.targetMouse = { x: 0, y: 0 };
        });

        this.animate();
    }

    animate() {
        if (!this.isRunning) return;
        requestAnimationFrame(() => this.animate());

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

        this.render();
    }

    render() {
        // Auto-resize if display size changes
        const displayWidth = this.container.clientWidth;
        const displayHeight = this.container.clientHeight;
        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }

        this.gl.useProgram(this.program);

        const uMouseLoc = this.gl.getUniformLocation(this.program, 'uMouse');
        const uResolutionLoc = this.gl.getUniformLocation(this.program, 'uResolution');
        const uImageAspectLoc = this.gl.getUniformLocation(this.program, 'uImageAspect');
        const uImageLoc = this.gl.getUniformLocation(this.program, 'uImage');
        const uDepthLoc = this.gl.getUniformLocation(this.program, 'uDepth');

        this.gl.uniform2f(uMouseLoc, this.mouse.x, this.mouse.y);
        this.gl.uniform2f(uResolutionLoc, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(uImageAspectLoc, this.imageAspect);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.image);
        this.gl.uniform1i(uImageLoc, 0);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.depth);
        this.gl.uniform1i(uDepthLoc, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}

window.ParallaxImage = ParallaxImage;
