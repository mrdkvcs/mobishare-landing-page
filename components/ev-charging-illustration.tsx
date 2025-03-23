"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function EVChargingIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#f8f9fa")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Responsive handling
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create EV Charging Station
    // Base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 1)
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -1.5
    scene.add(base)

    // Charging station body
    const stationGeometry = new THREE.BoxGeometry(1, 2.5, 0.8)
    const stationMaterial = new THREE.MeshPhongMaterial({ color: 0x007aad })
    const station = new THREE.Mesh(stationGeometry, stationMaterial)
    station.position.y = -0.25
    scene.add(station)

    // Screen
    const screenGeometry = new THREE.PlaneGeometry(0.6, 0.4)
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.set(0, 0.3, 0.41)
    scene.add(screen)

    // Charging cable
    const cablePoints = []
    cablePoints.push(new THREE.Vector3(0.4, -0.5, 0.4))
    cablePoints.push(new THREE.Vector3(0.8, -0.8, 0.5))
    cablePoints.push(new THREE.Vector3(1.2, -1, 0.3))
    cablePoints.push(new THREE.Vector3(1.5, -1.2, 0))

    const cableCurve = new THREE.CatmullRomCurve3(cablePoints)
    const cableGeometry = new THREE.TubeGeometry(cableCurve, 20, 0.05, 8, false)
    const cableMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 })
    const cable = new THREE.Mesh(cableGeometry, cableMaterial)
    scene.add(cable)

    // Charging handle
    const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32)
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    const handle = new THREE.Mesh(handleGeometry, handleMaterial)
    handle.position.set(1.5, -1.2, 0)
    handle.rotation.x = Math.PI / 2
    scene.add(handle)

    // Car (simplified)
    const carBodyGeometry = new THREE.BoxGeometry(2.5, 0.8, 1.2)
    const carBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x0c1d32 })
    const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial)
    carBody.position.set(3, -1.1, 0)
    scene.add(carBody)

    // Car roof
    const carRoofGeometry = new THREE.BoxGeometry(1.5, 0.6, 1)
    const carRoofMaterial = new THREE.MeshPhongMaterial({ color: 0x0c1d32 })
    const carRoof = new THREE.Mesh(carRoofGeometry, carRoofMaterial)
    carRoof.position.set(2.8, -0.4, 0)
    scene.add(carRoof)

    // Car wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32)
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 })

    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel1.position.set(2.2, -1.5, 0.6)
    wheel1.rotation.z = Math.PI / 2
    scene.add(wheel1)

    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel2.position.set(3.8, -1.5, 0.6)
    wheel2.rotation.z = Math.PI / 2
    scene.add(wheel2)

    const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel3.position.set(2.2, -1.5, -0.6)
    wheel3.rotation.z = Math.PI / 2
    scene.add(wheel3)

    const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel4.position.set(3.8, -1.5, -0.6)
    wheel4.rotation.z = Math.PI / 2
    scene.add(wheel4)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the entire scene slightly for a 3D effect
      scene.rotation.y = Math.sin(Date.now() * 0.0005) * 0.2

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      // Dispose of geometries and materials
      ;[
        baseGeometry,
        stationGeometry,
        screenGeometry,
        cableGeometry,
        handleGeometry,
        carBodyGeometry,
        carRoofGeometry,
        wheelGeometry,
      ].forEach((geometry) => geometry.dispose())
      ;[
        baseMaterial,
        stationMaterial,
        screenMaterial,
        cableMaterial,
        handleMaterial,
        carBodyMaterial,
        carRoofMaterial,
        wheelMaterial,
      ].forEach((material) => material.dispose())
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

