"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
  precision highp float;

  uniform vec2 resolution;
  uniform vec2 pointer;
  uniform float time;

  float randomValue(vec2 point) {
    return fract(
      sin(dot(point, vec2(127.1, 311.7))) *
      43758.5453123
    );
  }

  float waveBand(
    vec2 point,
    float phase,
    float frequency,
    float verticalPosition,
    float thickness
  ) {
    float animationTime = time * 0.42;

    float waveCenter =
      verticalPosition +
      sin(
        point.x * frequency +
        animationTime +
        phase
      ) * 0.17 +
      sin(
        point.x * frequency * 0.48 -
        animationTime * 0.72 +
        phase * 1.65
      ) * 0.08 +
      cos(
        point.x * frequency * 0.22 +
        animationTime * 0.38 -
        phase
      ) * 0.045;

    float distanceFromWave = abs(
      point.y - waveCenter
    );

    float waveCore =
      1.0 -
      smoothstep(
        0.0,
        thickness,
        distanceFromWave
      );

    float waveGlow =
      exp(-distanceFromWave * 7.5) *
      0.48;

    return waveCore + waveGlow;
  }

  float channelField(
    vec2 point,
    float phase
  ) {
    float result = 0.0;

    result += waveBand(
      point,
      phase,
      2.15,
      -0.42,
      0.030
    );

    result += waveBand(
      point,
      phase + 1.45,
      3.15,
      -0.04,
      0.025
    ) * 0.92;

    result += waveBand(
      point,
      phase + 2.85,
      1.72,
      0.37,
      0.036
    ) * 0.76;

    return clamp(result, 0.0, 1.45);
  }

  void main() {
    vec2 uv =
      gl_FragCoord.xy /
      resolution.xy;

    vec2 point = uv * 2.0 - 1.0;

    float aspectRatio =
      resolution.x /
      resolution.y;

    point.x *= aspectRatio;

    vec2 mouse =
      pointer * 2.0 - 1.0;

    mouse.x *= aspectRatio;

    float animationTime = time * 0.24;

    /*
      Distorsi gelombang besar agar background
      terasa hidup dan tidak hanya bergerak horizontal.
    */
    point.x +=
      sin(
        point.y * 1.65 -
        animationTime
      ) * 0.15;

    point.y +=
      sin(
        point.x * 1.25 +
        animationTime * 0.75
      ) * 0.07;

    /*
      Interaksi halus dengan posisi pointer.
    */
    float pointerDistance =
      distance(point, mouse);

    float pointerInfluence =
      exp(
        -pointerDistance *
        pointerDistance *
        2.6
      );

    point +=
      (point - mouse) *
      pointerInfluence *
      0.045;

    /*
      Tiga kanal utama dengan posisi dan fase
      yang sedikit berbeda.

      Pertemuan kanal menghasilkan:
      merah + hijau = kuning
      hijau + biru = cyan
      merah + biru = magenta
      merah + hijau + biru = putih
    */
    float redChannel = channelField(
      point + vec2(0.018, -0.008),
      0.0
    );

    float greenChannel = channelField(
      point + vec2(-0.006, 0.012),
      0.16
    );

    float blueChannel = channelField(
      point + vec2(-0.020, -0.004),
      0.33
    );

    vec3 color = vec3(
      redChannel,
      greenChannel,
      blueChannel
    );

    /*
      Sedikit dominasi biru dan cyan agar
      konsisten dengan shader pada Home.
    */
    color *= vec3(
      0.92,
      1.06,
      1.18
    );

    /*
      Cahaya putih muncul ketika seluruh
      kanal bertemu pada area yang sama.
    */
    float whiteIntersection = min(
      redChannel,
      min(
        greenChannel,
        blueChannel
      )
    );

    color += vec3(
      whiteIntersection * 0.42
    );

    /*
      Ambient electric blue dan violet.
      Intensitasnya sangat rendah agar warna
      dasar tetap hitam pekat.
    */
    float centerGlow =
      exp(
        -length(point) * 0.85
      );

    color +=
      vec3(0.0, 0.018, 0.055) *
      centerGlow;

    color +=
      vec3(0.035, 0.0, 0.055) *
      (
        0.5 +
        0.5 *
        sin(
          point.x * 1.4 -
          animationTime
        )
      ) *
      0.32;

    /*
      Cahaya pointer.
    */
    color +=
      pointerInfluence *
      vec3(
        0.035,
        0.075,
        0.11
      );

    /*
      Vignette agar sisi halaman tetap gelap
      dan teks footer mudah dibaca.
    */
    float vignette =
      1.0 -
      smoothstep(
        0.38,
        1.62,
        length(point)
      );

    color *=
      0.23 +
      vignette * 0.98;

    /*
      Grain digital sangat tipis.
    */
    float grain =
      (
        randomValue(
          gl_FragCoord.xy +
          floor(time * 14.0)
        ) -
        0.5
      ) * 0.018;

    color += grain;

    /*
      Tone mapping sederhana agar highlight
      tetap bercahaya tanpa terlalu putih.
    */
    color =
      color /
      (
        color +
        vec3(0.78)
      );

    color = pow(
      color,
      vec3(0.88)
    );

    gl_FragColor = vec4(
      color,
      1.0
    );
  }
`

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: {
        value: 0,
      },
      resolution: {
        value: new THREE.Vector2(),
      },
      pointer: {
        value: new THREE.Vector2(0.5, 0.5),
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
    })

    const mesh = new THREE.Mesh(
      geometry,
      material
    )

    scene.add(mesh)

    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch {
      // Background CSS tetap menjadi fallback
      // jika perangkat tidak mendukung WebGL.
      return
    }

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        1.75
      )
    )

    renderer.setClearColor(0x02030a, 1)

    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"

    container.appendChild(renderer.domElement)

    const resizeRenderer = () => {
      const width = Math.max(
        container.clientWidth,
        1
      )

      const height = Math.max(
        container.clientHeight,
        1
      )

      renderer.setSize(width, height, false)

      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      )
    }

    const updatePointer = (
      event: PointerEvent
    ) => {
      uniforms.pointer.value.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight
      )
    }

    const resizeObserver =
      new ResizeObserver(resizeRenderer)

    resizeObserver.observe(container)

    window.addEventListener(
      "pointermove",
      updatePointer,
      {
        passive: true,
      }
    )

    window.addEventListener(
      "pointerdown",
      updatePointer,
      {
        passive: true,
      }
    )

    resizeRenderer()

    let animationFrameId = 0
    const clock = new THREE.Clock()

    const render = () => {
      uniforms.time.value =
        clock.getElapsedTime()

      renderer.render(scene, camera)

      animationFrameId =
        window.requestAnimationFrame(render)
    }

    if (prefersReducedMotion) {
      uniforms.time.value = 1
      renderer.render(scene, camera)
    } else {
      render()
    }

    return () => {
      resizeObserver.disconnect()

      window.removeEventListener(
        "pointermove",
        updatePointer
      )

      window.removeEventListener(
        "pointerdown",
        updatePointer
      )

      window.cancelAnimationFrame(
        animationFrameId
      )

      scene.remove(mesh)

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (
        renderer.domElement.parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        )
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        h-full w-full
        overflow-hidden
        bg-[radial-gradient(circle_at_50%_25%,#15203a_0%,#050610_45%,#020207_100%)]
      "
    />
  )
}