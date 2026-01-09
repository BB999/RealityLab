import * as THREE from 'three';

/**
 * Starfield モジュール
 * 星空を表現（小さな球体で実装）
 */
export function createStarfield(group, params = {}) {
  // パラメータを安全な範囲にクランプ
  const count = Math.min(params.count || 100, 300);
  const color = params.color || '#ffffff';
  const size = Math.min(Math.max(params.size || 0.05, 0.01), 0.1);
  const spread = Math.min(Math.max(params.spread || 0.5, 0.2), 1.0);  // 最大1mに制限
  const twinkle = params.twinkle !== false;

  const starColor = new THREE.Color(color);
  const geometry = new THREE.SphereGeometry(size, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: starColor,
    transparent: true,
    opacity: 0.9
  });

  const stars = [];
  const phases = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = spread * (0.3 + Math.random() * 0.7);

    const star = new THREE.Mesh(geometry, material.clone());
    star.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    star.scale.setScalar(0.5 + Math.random() * 0.5);

    group.add(star);
    stars.push(star);
    phases.push(Math.random() * Math.PI * 2);
  }

  let time = 0;

  return {
    update(deltaTime) {
      if (!twinkle) return;
      time += deltaTime * 2;

      for (let i = 0; i < stars.length; i++) {
        const alpha = 0.5 + 0.5 * Math.sin(time + phases[i]);
        stars[i].material.opacity = alpha;
      }
    },
    dispose() {
      geometry.dispose();
      for (const star of stars) {
        star.material.dispose();
      }
    }
  };
}

/**
 * Fireworks モジュール
 * 打ち上げ花火を表現（球体で実装、WebXR対応）
 */
export function createFireworks(group, params = {}) {
  // パラメータを安全な範囲にクランプ
  const rate = Math.min(Math.max(params.rate || 0.5, 0.2), 2.0);
  const maxParticles = Math.min(params.particleBudget || 200, 300);
  const colors = params.colors || ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'];
  const explosionSize = Math.min(Math.max(params.explosionSize || 0.5, 0.2), 1.0);
  const gravity = params.gravity || 0.5;

  // 共有ジオメトリ
  const sphereGeometry = new THREE.SphereGeometry(0.015, 6, 6);

  // パーティクルプール
  const particles = [];
  for (let i = 0; i < maxParticles; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    });
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.visible = false;
    group.add(mesh);
    particles.push({
      mesh,
      active: false,
      vx: 0, vy: 0, vz: 0,
      life: 0, maxLife: 0
    });
  }

  let timeSinceLastLaunch = 0;
  let activeCount = 0;

  function launchFirework() {
    const colorHex = colors[Math.floor(Math.random() * colors.length)];
    const color = new THREE.Color(colorHex);
    const centerX = (Math.random() - 0.5) * 0.3;
    const centerY = (Math.random() - 0.5) * 0.3;
    const centerZ = (Math.random() - 0.5) * 0.3;
    const particleCount = 20 + Math.floor(Math.random() * 20);

    for (let i = 0; i < particleCount; i++) {
      const particle = particles.find(p => !p.active);
      if (!particle) break;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = explosionSize * (0.3 + Math.random() * 0.4);

      particle.active = true;
      particle.mesh.visible = true;
      particle.mesh.position.set(centerX, centerY, centerZ);
      particle.mesh.material.color.copy(color);
      particle.mesh.material.opacity = 1.0;
      particle.vx = speed * Math.sin(phi) * Math.cos(theta);
      particle.vy = speed * Math.sin(phi) * Math.sin(theta);
      particle.vz = speed * Math.cos(phi);
      particle.life = 1.0;
      particle.maxLife = 1.0 + Math.random() * 0.5;
      activeCount++;
    }
  }

  return {
    update(deltaTime) {
      timeSinceLastLaunch += deltaTime;
      if (timeSinceLastLaunch >= rate && activeCount < maxParticles * 0.7) {
        launchFirework();
        timeSinceLastLaunch = 0;
      }

      for (const particle of particles) {
        if (!particle.active) continue;

        particle.vy -= gravity * deltaTime;
        particle.mesh.position.x += particle.vx * deltaTime;
        particle.mesh.position.y += particle.vy * deltaTime;
        particle.mesh.position.z += particle.vz * deltaTime;
        particle.life -= deltaTime / particle.maxLife;

        if (particle.life <= 0) {
          particle.active = false;
          particle.mesh.visible = false;
          activeCount--;
          continue;
        }

        particle.mesh.material.opacity = particle.life;
        const scale = 0.5 + particle.life * 0.5;
        particle.mesh.scale.setScalar(scale);
      }
    },
    dispose() {
      sphereGeometry.dispose();
      for (const particle of particles) {
        particle.mesh.material.dispose();
      }
    },
    launch() {
      launchFirework();
    }
  };
}
