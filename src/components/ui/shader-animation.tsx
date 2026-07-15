"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;

      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv =
          (gl_FragCoord.xy * 2.0 - resolution.xy) /
          min(resolution.x, resolution.y);

        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);

        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] +=
              lineWidth * float(i * i) /
              abs(
                fract(
                  t -
                  0.01 * float(j) +
                  float(i) * 0.01
                ) * 5.0 -
                length(uv) +
                mod(uv.x + uv.y, 0.2)
              );
          }
        }

        gl_FragColor = vec4(
          color[0],
          color[1],
          color[2],
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
        value: 1,
      },
      resolution: {
        value: new THREE.Vector2(),
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    })

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )

    renderer.setClearColor(0x000000)

    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"

    container.appendChild(renderer.domElement)

    const resizeRenderer = () => {
      const width = container.clientWidth
      const height = container.clientHeight

      if (width === 0 || height === 0) {
        return
      }

      renderer.setSize(width, height, false)

      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      )
    }

    const resizeObserver = new ResizeObserver(resizeRenderer)

    resizeObserver.observe(container)
    resizeRenderer()

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let animationFrameId = 0

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate)

      uniforms.time.value += 0.05

      renderer.render(scene, camera)
    }

    if (prefersReducedMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    return () => {
      resizeObserver.disconnect()

      window.cancelAnimationFrame(animationFrameId)

      scene.remove(mesh)

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden bg-black"
    />
  )
}