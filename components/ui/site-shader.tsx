"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

// Fragment shader — animated concentric rings rotating slowly. We mute the
// final mix so the effect stays subtle behind the rest of the site.
const FRAGMENT_SHADER = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec3 uBackgroundColor;
  uniform float uIntensity;

  mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
  float variation(vec2 v1, vec2 v2, float strength, float speed){
    return sin(dot(normalize(v1), normalize(v2)) * strength + iTime * speed) / 100.0;
  }
  vec3 paintCircle(vec2 uv, vec2 center, float rad, float width){
    vec2 diff = center - uv;
    float len = length(diff);
    len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
    len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
    float circle = smoothstep(rad - width, rad, len) - smoothstep(rad, rad + width, len);
    return vec3(circle);
  }
  void main(){
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // Aspect correction so rings stay round on any viewport ratio.
    float aspect = iResolution.x / iResolution.y;
    uv.x = (uv.x - 0.5) * aspect + 0.5;

    float mask = 0.0;
    float radius = 0.35;
    vec2 center = vec2(0.5);
    mask += paintCircle(uv, center, radius, 0.035).r;
    mask += paintCircle(uv, center, radius - 0.018, 0.01).r;
    mask += paintCircle(uv, center, radius + 0.018, 0.005).r;

    vec2 v = rotate2d(iTime) * (uv - 0.5);
    // Blue-leaning palette to fit the brand.
    vec3 foregroundColor = vec3(v.x * 0.3 + 0.2, v.y * 0.5 + 0.35, 0.7 - v.y * v.x);

    vec3 color = mix(uBackgroundColor, foregroundColor, mask * uIntensity);
    color = mix(color, vec3(1.0), paintCircle(uv, center, radius, 0.003).r * uIntensity);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Shader compilation error");
  }
  return shader;
}

export function SiteShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Skip WebGL on mobile and tablet
    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;
    if (isSmallScreen) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    let program: WebGLProgram | null = null;
    try {
      program = gl.createProgram();
      if (!program) throw new Error("Could not create program");
      gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(
        program,
        compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER),
      );
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link error");
      }
    } catch (err) {
      console.warn("[SiteShader] init failed:", err);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    const bgLoc = gl.getUniformLocation(program, "uBackgroundColor");
    const intensityLoc = gl.getUniformLocation(program, "uIntensity");

    // #05060a → ~ (0.020, 0.024, 0.039)
    gl.uniform3fv(bgLoc, new Float32Array([0.02, 0.024, 0.039]));
    // 1.0 = original colors, < 1 = faded toward background. Tuned for site-wide use.
    gl.uniform1f(intensityLoc, 0.7);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let raf: number | null = null;
    const start = performance.now();
    const tick = (now: number) => {
      gl.uniform1f(iTimeLoc, (now - start) * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };

    // Page Visibility API: pause rAF when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        if (raf !== null) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (raf === null && !reducedMotion) {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      // Single static draw.
      gl.uniform1f(iTimeLoc, 0);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.useProgram(null);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 block h-full w-full"
    />
  );
}
