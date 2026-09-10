import { useMemo } from "react";

const DEFAULTS = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const BACKGROUND = "#07160e";
const TARGET_SELECTOR = "#bg-canvas";

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

// WebGL/Three.js simplex-noise fluid shader tuned for KrishiConnect agricultural palette
const FLUID_SOURCE = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KrishiConnect Fluid Energy Field</title>
    <!-- Three.js (r128) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: ${BACKGROUND};
      }
      #bg-canvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }
      .grain-overlay {
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        opacity: 0.07;
        mix-blend-mode: overlay;
        background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
      }
      .grid-overlay {
        position: fixed;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        opacity: 0.08;
        background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 16px);
      }
    </style>
</head>
<body>
    <canvas id="bg-canvas"></canvas>
    <div id="grain-layer" class="grain-overlay"></div>
    <div id="grid-layer" class="grid-overlay"></div>

    <script>
        (function() {
            const canvas = document.querySelector('#bg-canvas');
            if (!canvas || typeof THREE === 'undefined') return;

            const renderer = new THREE.WebGLRenderer({ 
              canvas: canvas, 
              alpha: true, 
              antialias: false,
              powerPreference: "high-performance"
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);

            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const scene = new THREE.Scene();
            const geometry = new THREE.PlaneGeometry(2, 2);

            const vertexShader = \`
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            \`;

            // Organic simplex-noise fluid shader customized for KrishiConnect's agricultural forest, emerald & golden harvest glow
            const fragmentShader = \`
                uniform float u_time;
                uniform vec2 u_resolution;

                // Compact 2D Simplex Noise
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
                
                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy));
                    vec2 x0 = v - i + dot(i, C.xx);
                    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod289(i);
                    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m * m;
                    m = m * m;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                void main() {
                    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                    uv.x *= u_resolution.x / u_resolution.y;

                    // Deep forest floor base tone (#06140d)
                    vec3 baseColor = vec3(0.024, 0.08, 0.055);

                    // Organic fluid vector distortion
                    vec2 st = uv * 0.7;
                    st += vec2(snoise(st + u_time * 0.038), snoise(st - u_time * 0.038)) * 0.3;

                    // Diagonal aurora beam wave
                    float beam = smoothstep(0.1, 0.8, snoise(vec2(st.x + st.y * 1.35 - u_time * 0.09, u_time * 0.018)));

                    // Agricultural palette: vibrant emerald (#10b981) and lush deep canopy (#22c55e / #1d5a3a)
                    vec3 cEmerald = vec3(0.06, 0.68, 0.42);
                    vec3 cCanopy  = vec3(0.14, 0.55, 0.28);
                    
                    float glowFactor = snoise(uv * 1.3 + u_time * 0.06) * 0.5 + 0.5;
                    vec3 glow = mix(cEmerald, cCanopy, glowFactor);

                    // Subtle warm golden harvest crop shimmer (#c89b3c)
                    vec3 cHarvest = vec3(0.75, 0.58, 0.22);
                    float goldShimmer = smoothstep(0.52, 0.88, snoise(vec2(st.y * 1.4 - u_time * 0.06, st.x * 1.1 + u_time * 0.025)));
                    glow = mix(glow, cHarvest, goldShimmer * 0.28);

                    gl_FragColor = vec4(baseColor + (glow * beam * 0.62), 1.0);
                }
            \`;

            const uniforms = {
                u_time: { value: 0.0 },
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            };

            const material = new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: uniforms
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const clock = new THREE.Clock();
            let animationFrameId;

            function animate() {
                uniforms.u_time.value = clock.getElapsedTime();
                renderer.render(scene, camera);
                animationFrameId = requestAnimationFrame(animate);
            }
            animate();

            function onResize() {
                if (!canvas) return;
                const width = window.innerWidth;
                const height = window.innerHeight;
                renderer.setSize(width, height);
                uniforms.u_resolution.value.set(width, height);
            }

            window.addEventListener('resize', onResize);
            window.addEventListener('orientationchange', onResize);
        })();
    </script>
</body>
</html>`;

function buildFocusedDocument() {
  const targetJson = JSON.stringify([
    { selector: TARGET_SELECTOR, role: "background" },
    { selector: "#grain-layer", role: "texture" },
    { selector: "#grid-layer", role: "texture" },
  ]).replace(/</g, "\\u003c");

  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${BACKGROUND} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"], [data-threeui-role="texture"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; pointer-events: none !important; }
[data-threeui-role="background"] { z-index: 0 !important; }
[data-threeui-role="texture"] { z-index: 1 !important; }
</style>`;

  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 50); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

  return FLUID_SOURCE.replace(/<\/head>/i, `${focusStyle}</head>`).replace(
    /<\/body>/i,
    `${focusScript}</body>`
  );
}

export default function FluidFieldBackground({
  mode = "dark",
  hue = DEFAULTS.hue,
  saturation = DEFAULTS.saturation,
  brightness = DEFAULTS.brightness,
  className = "",
  style = {},
}) {
  const source = useMemo(() => buildFocusedDocument(), []);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={mode}
      title="KrishiConnect Fluid Field Background"
      srcDoc={source}
      sandbox="allow-scripts allow-same-origin"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: BACKGROUND,
        filter,
        ...style,
      }}
    />
  );
}
