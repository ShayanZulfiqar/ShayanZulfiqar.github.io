export const globeConfig = {
  pointSize: 1,                  // Size of each point on the globe
  globeColor: "#1d072e",         // Base color of the globe
  showAtmosphere: true,           // Whether to show atmosphere glow
  atmosphereColor: "#ffffff",     // Color of atmosphere
  atmosphereAltitude: 0.1,        // Thickness of atmosphere
  emissive: "#000000",            // Emissive color of globe material
  emissiveIntensity: 0.1,         // How strong the emissive glow is
  shininess: 0.9,                 // Shininess of globe material
  polygonColor: "rgba(255,255,255,0.7)", // Country polygon overlay color
  ambientLight: "#ffffff",        // Ambient light color
  directionalLeftLight: "#ffffff", // Directional light from left
  directionalTopLight: "#ffffff",  // Directional light from top
  pointLight: "#ffffff",           // Point light color
  arcTime: 2000,                   // Animation duration for arcs
  arcLength: 0.9,                  // Length of arcs
  rings: 1,                        // Number of animated rings
  maxRings: 3,                     // Maximum ring radius
  initialPosition: { lat: 0, lng: 0 }, // Initial rotation position
  autoRotate: true,                // Should globe auto-rotate
  autoRotateSpeed: 1,              // Speed of auto-rotation
};
