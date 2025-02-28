/*
 * @Description: three视图
 * @Author: ldx
 * @Date: 2023-10-26 09:21:40
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 17:46:40
 */
import { createApp } from 'vue'
import * as THREE from 'three'
import PowerPopup from './powerPopup.vue'
import LinePopup from './linePopup.vue'
import $Bus from '@/utils/eventBus'
// import CameraControls from 'camera-controls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { LoadingBar } from './LoadingBar'
// CameraControls.install({ THREE: THREE })
const config = {
  /** 环境光 */
  AMBIENT_LIGHT_COLOR: 0xe4e4e4,
  /** 平行光 */
  DIRECTIONAL_LIGHT_COLOR: 0xffffff,
  /** 投影空间大小 */
  SCALE: 130,
}

const BLOOM_SCENE = 1
const SKYBOX_LAYER = 2 // 新增天空盒图层

const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)

const skyboxLayer = new THREE.Layers() // 新增天空盒图层
skyboxLayer.set(SKYBOX_LAYER)

const params = {
  threshold: 0.1, // 提高阈值，减少辉光范围
  strength: 0.4, // 降低强度，使辉光更柔和
  radius: 0.06, // 稍微减小半径
  exposure: 0.6, // 降低曝光度
}

const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
const materials = {}
const mouse = new THREE.Vector2()

// 创建画布来处理图片数据
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const updateMaterialMap = (child) => {
  // 获取原始贴图
  const originalTexture = child.material.map

  // 设置画布尺寸为贴图尺寸
  canvas.width = originalTexture.image.width
  canvas.height = originalTexture.image.height

  // 将原始贴图绘制到画布上
  ctx.drawImage(originalTexture.image, 0, 0)

  // 下载原始贴图
  // const originalLink = document.createElement('a')
  // originalLink.download = `original_${child.name}.png`
  // originalLink.href = canvas.toDataURL('image/png')
  // originalLink.click()

  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // 修改每个像素的颜色为红色，保持原有的alpha值
  for (let i = 0; i < data.length; i += 4) {
    // console.log('data===', data[i], data[i + 1], data[i + 2], data[i + 3])
    if (
      (data[i] > 110 || data[i] < 130) &&
      (data[i + 1] > 230 || data[i + 1] < 250) &&
      (data[i + 2] > 90 || data[i + 2] < 171)
    ) {
      data[i] = 255 // R
      data[i + 1] = 0 // G
      data[i + 2] = 0 // B
      // data[i + 3] 保持不变 (Alpha)
    }
  }

  // 将修改后的像素数据放回画布
  ctx.putImageData(imageData, 0, 0)

  // 下载修改后的贴图
  // const modifiedLink = document.createElement('a')
  // modifiedLink.download = `modified_${child.name}.png`
  // modifiedLink.href = canvas.toDataURL('image/png')
  // modifiedLink.click()

  // 创建新的纹理
  const newTexture = new THREE.Texture(canvas)
  newTexture.needsUpdate = true
  newTexture.wrapS = THREE.RepeatWrapping
  newTexture.wrapT = THREE.RepeatWrapping
  newTexture.repeat.set(1, 1)
  child.material.map = newTexture
}

export default class Viewer {
  /** 场景 */
  scene
  /** 透视相机 */
  camera
  /** 渲染 */
  renderer
  labelRenderer
  /** 控制器 */
  controls
  /** 射线 */
  raycaster
  gltfLoader
  /** 容器 */
  container
  /** 平行光 */
  directionalLight
  /** 服务区 */
  serviceArea
  /** 效果合成器 */
  bloomComposer
  finalComposer
  clock
  loadmanager
  onProgress
  gltfScene
  trees = []
  /** 旋转  暂停   */
  status = '暂停'
  fans = []
  intersectObjects = []
  step = [0.05, 0.06, 0.045]
  bloomObjects = [] // 用于存储发光物体
  /** 计算路径 */
  calculatedPath = []

  constructor(container) {
    this.container = container
    this.clock = new THREE.Clock()
    this.useLoadingManager()
    this.initScene()
    this.initCss3Render()
    this.loadSky()
    this.listen()
    this.initComposer()
    // this.useOrbitControls()
    this.raycaster = new THREE.Raycaster()
    this.loadingBar = new LoadingBar()
    this.solarPanelPosition = null // 新增：存储光伏板位置
  }
  /**
   * @function: 初始化编辑器场景
   */
  initScene() {
    // const { width, height } = this.container.getBoundingClientRect()
    const { clientWidth: width, clientHeight: height } = this.container
    // const width = 1272
    // const height = 600

    /** 创建场景 */
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(0xaaaaaa)
    /** 创建相机 */
    const k = width / height
    this.camera = new THREE.PerspectiveCamera(45, k, 1, 1000)
    this.camera.up.y = 1
    const target = this.scene.position
    this.camera.lookAt(target)
    this.camera.position.set(-22.38, 35.6, -36.49)
    /** 创建渲染器 */
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, //开启抗锯齿
      alpha: true, // 是否可以设置背景色透明
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 设置色调映射  这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.setSize(width, height)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 使用柔和阴影
    // this.renderer.shadowMap.enabled = false
    this.container.appendChild(this.renderer.domElement)

    const obj3d = new THREE.Object3D()
    obj3d.position.set(0, 0, 0)
    /** 创建光照 */
    // const ambientLight1 = new THREE.AmbientLight(config.AMBIENT_LIGHT_COLOR, 1)
    // ambientLight1.position.set(17, 18, 0)
    // this.scene.add(ambientLight1)
    // const ambientLight2 = new THREE.AmbientLight(config.AMBIENT_LIGHT_COLOR, 1.5)
    // ambientLight2.position.set(0, -2, 48)
    // this.scene.add(ambientLight2)

    const directionalLight1 = new THREE.DirectionalLight(config.DIRECTIONAL_LIGHT_COLOR, 3)
    directionalLight1.position.set(30, 100, 50)
    directionalLight1.target = obj3d
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 4096
    directionalLight1.shadow.mapSize.height = 4096
    directionalLight1.shadow.camera.near = 0.5
    directionalLight1.shadow.camera.far = 500
    directionalLight1.shadow.camera.left = -150
    directionalLight1.shadow.camera.right = 150
    directionalLight1.shadow.camera.top = 150
    directionalLight1.shadow.camera.bottom = -150
    directionalLight1.shadow.bias = -0.0001
    this.scene.add(directionalLight1)

    // const directionalLight2 = new THREE.DirectionalLight(config.DIRECTIONAL_LIGHT_COLOR, 1)
    // directionalLight2.position.set(0, 20, -50)
    // directionalLight2.target = obj3d

    this.restoreContext()
  }
  initComposer() {
    const renderScene = new RenderPass(this.scene, this.camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85,
    )
    bloomPass.threshold = params.threshold
    bloomPass.strength = params.strength
    bloomPass.radius = params.radius

    this.bloomComposer = new EffectComposer(this.renderer)

    this.bloomComposer.renderToScreen = false
    this.bloomComposer.addPass(renderScene)
    this.bloomComposer.addPass(bloomPass)

    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;

          varying vec2 vUv;

          void main() {

            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

          }
        `,
        defines: {},
      }),
      'baseTexture',
    )
    mixPass.needsSwap = true

    const outputPass = new OutputPass()

    this.finalComposer = new EffectComposer(this.renderer)
    this.finalComposer.addPass(renderScene)
    this.finalComposer.addPass(mixPass, 'baseTexture')
    this.finalComposer.addPass(outputPass)
  }
  initCss3Render() {
    const { clientWidth: width, clientHeight: height } = this.container
    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(width, height)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0px'
    const ele = this.labelRenderer.domElement
    ele.id = 'tempId'
    this.container.appendChild(ele)
  }

  /**
   * @function: 使用控制器
   */
  useOrbitControls = () => {
    // this.cameraControls = new CameraControls(this.camera, this.renderer.domElement)
    // 创建控件对象
    this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement)
    // this.controls.maxPolarAngle = Math.PI * 0.40;
    // this.controls.maxPolarAngle = Math.PI * 0.2
    // this.controls.minPolarAngle = Math.PI * 0.2

    // this.controls.minDistance = 15.0
    // this.controls.maxDistance = 60.0
    // this.controls.enablePan = false
    // this.controls.enableRotate = false
    //监听鼠标、键盘事件
    // this.controls.addEventListener('change', () => {
    // this.render()
    // console.log('change', this.camera.position)
    // })
    // this.controls.addEventListener('start', () => {
    //   this.isOpterating = true
    // })
    // this.controls.addEventListener('end', () => {
    //   this.isOpterating = false
    // })
  }
  /**
   * @function: 更新场景
   */
  render = () => {
    // this.renderer.render(this.scene, this.camera)
    // 然后渲染辉光效果
    let background = this.scene.background
    this.scene.traverse(this.darkenNonBloomed)
    this.scene.background = 0x000000
    this.scene.environment = 0x000000
    this.bloomComposer.render()
    this.scene.background = background
    this.scene.environment = background
    this.scene.traverse(this.restoreMaterial)
    this.finalComposer.render()
    this.labelRenderer && this.labelRenderer.render(this.scene, this.camera)

    // console.log('====', this.renderer.info.render.calls)
  }

  /**
   * @function: 自适应窗口
   */
  onResize = () => {
    const { clientWidth: width, clientHeight: height } = this.container
    const k = width / height
    this.renderer.setSize(width, height)
    this.labelRenderer && this.labelRenderer.setSize(width, height)
    this.camera.aspect = k
    this.camera.updateProjectionMatrix()
    this.render()
  }
  restoreContext() {
    const canvas = this.renderer.domElement
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      setTimeout(() => {
        this.renderer.forceContextRestore()
      }, 1)
    })
  }
  onPointerMove = (event) => {
    const { left, top } = this.container.getBoundingClientRect()
    const { clientWidth: width, clientHeight: height } = this.container
    mouse.x = ((event.clientX - left) / width) * 2 - 1
    mouse.y = -((event.clientY - top) / height) * 2 + 1

    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.intersectObjects)
    if (intersects.length > 0) {
      const object = intersects[0].object
      if (this.intersectObj === object) return
      if (object.name.endsWith('管道')) {
        const app = createApp(LinePopup, {
          src: '',
          name: '',
        })
        const mountElement = document.createElement('div')
        app.mount(mountElement)

        if (this.objectCSS) {
          this.gltfScene.remove(this.objectCSS)
          this.objectCSS = null
        }
        this.objectCSS = new CSS2DObject(mountElement)
        this.objectCSS.name = '2d'
        this.objectCSS.scale.set(0.1, 0.1, 0.1)
        this.objectCSS.position.copy(intersects[0].point)
      } else {
        const app = createApp(PowerPopup, {
          src: object.userData.map.source.data.src,
          name: object.userData.name,
        })
        const mountElement = document.createElement('div')
        app.mount(mountElement)

        if (this.objectCSS) {
          this.gltfScene.remove(this.objectCSS)
          this.objectCSS = null
        }
        this.objectCSS = new CSS2DObject(mountElement)
        this.objectCSS.name = '2d'
        this.objectCSS.scale.set(0.1, 0.1, 0.1)
        this.objectCSS.position.copy(object.position)
      }

      this.gltfScene.add(this.objectCSS)

      this.intersectObj = object
    } else {
      if (!this.intersectObj) return
      this.intersectObj = null
      if (!this.objectCSS) return
      this.gltfScene.remove(this.objectCSS)
      this.objectCSS = null
    }
    this.render()
  }
  listen = () => {
    window.addEventListener('resize', this.onResize)
    this.container.addEventListener('pointermove', this.onPointerMove)
  }
  destroy = () => {
    window.removeEventListener('resize', this.onResize)
    this.container.removeEventListener('pointermove', this.onPointerMove)
  }

  darkenNonBloomed(obj) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
      materials[obj.uuid] = obj.material
      obj.material = darkMaterial
    }
  }
  restoreMaterial(obj) {
    if (materials[obj.uuid]) {
      obj.material = materials[obj.uuid]
      delete materials[obj.uuid]
    }
  }
  /** 加载高速服务区 */
  loadServiceArea() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    this.gltfLoader = new GLTFLoader(this.loadmanager)
    this.gltfLoader.setDRACOLoader(dracoLoader)
    this.gltfLoader.setPath('glb/')
    this.gltfLoader.load(
      'serviceArea.glb',
      (gltf) => {
        const gltfScene = gltf.scene
        this.scene.add(gltfScene)
        this.render()
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true

            if (child.name.startsWith('扇叶')) {
              this.fans.push(child)
            }
            if (child.name.startsWith('电塔')) {
              child.layers.enable(BLOOM_SCENE)
              child.material = new THREE.MeshBasicMaterial({
                color: 0x409de7, // 绿色
              })
              // child.visible = false
              this.bloomObjects.push(child)
            }
            if (child.name.startsWith('管道')) {
              // 获取原始贴图
              child.material.map.wrapS = THREE.RepeatWrapping
              child.material.map.wrapT = THREE.RepeatWrapping
              child.material.map.repeat.set(1, 1)
              child.material.map.needsUpdate = true

              this.bloomObjects.push(child)
              this.intersectObjects.push(child)
              child.layers.enable(BLOOM_SCENE)
              if (['管道'].includes(child.name)) {
                child.name = '光伏管道'
                // updateMaterialMap(child)

                this.solar_pipeline1 = child.material.map
              } else if (['管道005'].includes(child.name)) {
                child.name = '光伏管道'
                this.solar_pipeline2 = child.material.map
              } else if (['管道002'].includes(child.name)) {
                child.name = '风力管道'
                this.wind_pipeline = child.material.map
              } else if (['管道004'].includes(child.name)) {
                child.name = '电网管道'
                this.grid_pipeline = child.material.map
              } else {
                child.name = '建筑管道'
                this.building_pipeline = child.material.map
              }
            }

            if (['充电桩a', '充电桩b'].includes(child.name)) {
              const spriteMaterial = new THREE.SpriteMaterial({
                color: 0xffffff,
                map: new THREE.TextureLoader().load('img/charging_pile.png'), // 加载充电桩贴图
                transparent: true,
              })
              const sprite = new THREE.Sprite(spriteMaterial)
              sprite.scale.set(1.8, 1.8, 1.8) // 设置精灵大小
              sprite.position.copy(child.position) // 复制充电桩模型的位置
              gltfScene.add(sprite) // 将精灵添加到场景中
              child.visible = false
              // sprite.visible = false
              sprite.userData = {
                map: spriteMaterial.map,
                name: child.name === '充电桩a' ? 'A区充电桩' : 'B区充电桩',
              }

              this.intersectObjects.push(sprite)
            }
            if (child.name === '风力发电机') {
              const spriteMaterial = new THREE.SpriteMaterial({
                color: 0xffffff,
                map: new THREE.TextureLoader().load('img/wind_turbine.png'), // Load wind turbine texture
                transparent: true,
              })
              const sprite = new THREE.Sprite(spriteMaterial)
              sprite.scale.set(1.8, 1.8, 1.8) // 设置精灵大小
              sprite.position.copy(child.position) // 复制充电桩模型的位置
              gltfScene.add(sprite) // 将精灵添加到场景中
              child.visible = false
              // sprite.visible = false
              sprite.userData = {
                map: spriteMaterial.map,
                name: child.name,
              }
              this.intersectObjects.push(sprite)
            }
            if (child.name === '光伏板') {
              this.solarPanelPosition = child.position
              const spriteMaterial = new THREE.SpriteMaterial({
                color: 0xffffff,
                map: new THREE.TextureLoader().load('img/solar_panel.png'), // Load wind turbine texture
                transparent: true,
              })
              const sprite = new THREE.Sprite(spriteMaterial)
              sprite.scale.set(1.8, 1.8, 1.8) // 设置精灵大小
              sprite.position.copy(child.position) // 复制充电桩模型的位置
              gltfScene.add(sprite) // 将精灵添加到场景中
              child.visible = false
              // sprite.visible = false
              sprite.userData = {
                map: spriteMaterial.map,
                name: child.name,
              }
              this.intersectObjects.push(sprite)
            }
            if (child.name === '充电桩光伏板001') {
              child.material.transparent = true
              this.solarPanelA = child
            }
            if (child.name === '充电桩光伏板') {
              child.material.transparent = true
              this.solarPanelB = child
            }
          }

          if (child.name.startsWith('树')) {
            this.trees.push(child)
          }
        })
        this.gltfLoader.load(
          'tree.glb',
          (gltf) => {
            const tree = gltf.scene.children[0]
            const treeGeometry = tree.geometry
            const treeMaterial = tree.material
            treeMaterial.alphaTest = 0.8
            const instancedTrees = new THREE.InstancedMesh(
              treeGeometry,
              treeMaterial,
              this.trees.length,
            )
            instancedTrees.castShadow = true

            for (let i = this.trees.length - 1; i >= 0; i--) {
              const tree = this.trees[i]
              // 设置实例矩阵
              instancedTrees.setMatrixAt(i, tree.matrixWorld)
              // 从场景中移除原模型
              gltfScene.remove(tree)
            }
            gltfScene.add(instancedTrees)
            this.gltfScene = gltfScene
            this.status = '旋转'
          },
          (xhr) => {
            this.onProgress('tree.glb', xhr)
          },
        )
      },
      (xhr) => {
        this.onProgress('serviceArea.glb', xhr)
      },
    )
  }
  useLoadingManager() {
    const assets = new Map()
    this.loadmanager = new THREE.LoadingManager()
    this.loadmanager.onStart = () => {
      this.loadingBar.visible = true
    }

    this.loadmanager.onLoad = () => {
      // this.emit('load_complete')
      this.loadingBar.visible = false
    }
    this.loadmanager.onError = (url) => {
      // console.log('资源加载出错：', url)
    }

    this.onProgress = (assetName, xhr) => {
      const asset = assets.get(assetName)
      if (!asset) {
        assets.set(assetName, { loaded: xhr.loaded, total: xhr.total })
      } else {
        asset.loaded = xhr.loaded
        asset.total = xhr.total
      }
      this.loadingBar.update(assets)
    }
  }
  /** 加载天空 */
  loadSky() {
    new THREE.CubeTextureLoader()
      .setPath('skybox/天空/')
      .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], (cubeTexture) => {
        this.scene.background = cubeTexture
        this.scene.environment = cubeTexture
        this.render()
      })
  }
  update() {
    if (!this.gltfScene) return

    this.fans.forEach((fan, i) => {
      fan.rotation.y += this.step[i]
    })
    if (this.solar_pipeline1) this.solar_pipeline1.offset.x += 0.01
    if (this.solar_pipeline2) this.solar_pipeline2.offset.x += 0.01
    if (this.wind_pipeline) this.wind_pipeline.offset.x -= 0.01
    if (this.grid_pipeline) this.grid_pipeline.offset.x -= 0.01
    if (this.building_pipeline) this.building_pipeline.offset.x -= 0.01

    // this.startRotation()
    if (this.status === '旋转') {
      this.scene.rotation.y += 0.01
    } else if (this.calculatedPath.length > 0) {
      this.updateCameraPosition()
    } else {
      $Bus.emit('fly', false)
    }

    this.render()
  }
  setTargetDirection(pt) {
    const player = this.camera
    const quaternion = player.quaternion.clone()
    player.lookAt(pt)
    this.quaternion = player.quaternion.clone()
    player.quaternion.copy(quaternion)
  }
  updateCameraPosition() {
    const target = this.calculatedPath[0]
    const player = this.camera
    const vel = target.clone().sub(player.position)
    const preDistanceSq = player.position.distanceTo(target)

    if (preDistanceSq > 0.8) {
      // 计算剩余路径总长度
      let remainingLength = player.position.distanceTo(target)
      for (let i = 1; i < this.calculatedPath.length - 1; i++) {
        remainingLength += this.calculatedPath[i].distanceTo(this.calculatedPath[i + 1])
      }

      // 计算路径完成百分比
      const totalPathLength = 100 // 总路径长度参考值
      const progressPercent = remainingLength / totalPathLength

      // 根据完成百分比计算lookAt点
      const currentLookAt = this.startLookAt.lerp(this.endLookAt, 1 - progressPercent)

      // 相机朝向当前lookAt点
      player.lookAt(currentLookAt)

      // 移动相机
      vel.normalize()
      const speedFactor = 0.1 + (remainingLength / totalPathLength) * 0.9
      const speed = Math.max(1.5 * speedFactor, 0.5)
      player.position.add(vel.multiplyScalar(speed))
    } else {
      this.calculatedPath.shift()
      if (this.calculatedPath.length > 0) {
        this.setTargetDirection(this.calculatedPath[0])
      } else {
        player.position.copy(target)
      }
    }
  }
  fly = (flyPath, type) => {
    this.calculatedPath = flyPath.path.getPoints(10)
    this.startLookAt = flyPath.startLookAt
    this.endLookAt = flyPath.endLookAt
    if (type.endsWith('返回')) {
      this.solarPanelA.material.opacity = 1
      this.solarPanelB.material.opacity = 1
      this.bloomObjects.forEach((obj) => {
        obj.visible = true
      })
      this.intersectObjects.forEach((obj) => {
        obj.visible = true
      })
    } else {
      this.solarPanelA.material.opacity = 0.4
      this.solarPanelB.material.opacity = 0.4
      this.bloomObjects.forEach((obj) => {
        obj.visible = false
      })
      this.intersectObjects.forEach((obj) => {
        obj.visible = false
      })
    }
  }

  startRotation() {
    this.status = '旋转'
  }
  stopRotation() {
    this.status = '暂停'
    this.scene.rotation.y = 0
  }
}
