import './style.css'
const summerSound = require('./assets/sounds/summer.mp3')
const rainSound = require('./assets/sounds/rain.mp3')
const winterSound = require('./assets/sounds/winter.mp3')

// Container
const body = document.querySelector('body')

const container = document.createElement('div')
container.classList.add('container')
body!.appendChild(container)

// Header
const h1 = document.createElement('h1')
h1.innerText = 'Weather Sounds'
container.appendChild(h1)

// Wrapper
const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
container.appendChild(wrapper)

// Cards
const WEATHER: string[] = ['summer', 'rainy', 'winter']
const SOUNDS: string[] = [summerSound, rainSound, winterSound]

for (let i = 0; i < WEATHER.length; i++) {
	const weatherWrapper = document.createElement('div')

	const weatherCard = document.createElement('div')
	weatherCard.classList.add('weather-card')
	weatherCard.classList.add(`${WEATHER[i]}-img`)
	weatherWrapper.appendChild(weatherCard)

	const playButton = document.createElement('button')
	playButton.classList.add('play-button')
	playButton.classList.add(`${WEATHER[i]}-button`)

	weatherCard.appendChild(playButton)

	const volumeSlider = document.createElement('input')
	volumeSlider.classList.add('volume-slider')
	volumeSlider.type = 'range'
	volumeSlider.min = '0'
	volumeSlider.max = '1'
	volumeSlider.step = '0.01'
	volumeSlider.value = '0.5'

	weatherWrapper.appendChild(volumeSlider)

	const audioElement = document.createElement('audio')
	const sourceElement = document.createElement('source')
	sourceElement.src = SOUNDS[i]
	sourceElement.type = 'audio/mpeg'

	audioElement.appendChild(sourceElement)
	weatherWrapper.appendChild(audioElement)

	wrapper.appendChild(weatherWrapper)
}

// Play audio
const playButtons = document.querySelectorAll<HTMLButtonElement>('.play-button')
const volumeSliders = document.querySelectorAll<HTMLInputElement>('.volume-slider')
const audioElements = document.querySelectorAll<HTMLAudioElement>('audio')

playButtons.forEach((button, index) => {
	const audio = audioElements[index]

	button.addEventListener('click', () => {
		if (audio.paused) {
			audioElements.forEach((otherAudio, otherIndex) => {
				if (otherIndex !== index) {
					otherAudio.pause()
					playButtons[otherIndex].classList.remove('paused')
				}
			})

			audio.play()
			container.style.background = `url('./assets/${WEATHER[index]}-bg.jpg') center / cover no-repeat`
			button.classList.add('paused')
		} else {
			audio.pause()
			button.classList.remove('paused')
		}
	})

	audio.addEventListener('ended', () => {
		button.classList.remove('paused')
	})
})

// Volume control
volumeSliders.forEach((slider, index) => {
	const audio = audioElements[index]

	slider.addEventListener('input', e => {
		const target = e.target as HTMLInputElement

		audio.volume = Number(target.value)
	})
})
