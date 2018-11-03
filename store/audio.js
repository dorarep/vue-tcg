import dieWav from '~/assets/sounds/die.wav';
import setWav from '~/assets/sounds/set.wav';
import mogWav from '~/assets/sounds/mog.wav';

export const state = () => {
  return {
    'bgm': null
  }
}

let sounds = {
  'die': dieWav,
  'set': setWav,
  'mog': mogWav
}

let audioMap = {}

export const mutations = {
  playSound (state, name) {
    if (!audioMap[name]) {
      audioMap[name] = new Audio(sounds[name])
    }
    audioMap[name].play()
  },
  playBgm (state, name) {
    if (state.bgm === name) {
      return
    }
    if (!audioMap[name]) {
      audioMap[name] = new Audio(sounds[name])
      audioMap[name].loop = true
    }
    audioMap[name].currentTime = 0
    audioMap[name].play()

    state.bgm = name
  },
  stopBgm (state) {
    if (!state.bgm) {
      return
    }
    audioMap[state.bgm].pause()
    state.bgm = null
  }
}
